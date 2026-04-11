"use client";

import { useState } from "react";
import { ArrowRight, ChevronsRight } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useT } from "@/app/i18n/LanguageContext";
import styles from "@/app/contact/contact.module.css";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Fields>;

export default function Contact() {
  const { t, l } = useT();
  const c = t.contact;
  const v = t.validation;

  const [fields, setFields] = useState<Fields>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function set(key: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (submitError) setSubmitError("");
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!fields.name.trim()) e.name = v.nameRequired;
    if (!fields.email.trim()) e.email = v.emailRequired;
    else if (!isValidEmail(fields.email)) e.email = v.emailInvalid;
    if (!fields.subject.trim()) e.subject = v.subjectRequired;
    if (!fields.message.trim()) e.message = v.messageRequired;
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          subject: fields.subject.trim(),
          message: fields.message.trim(),
        }),
      });
      if (res.status === 201) {
        setConfirmed(true);
      } else {
        setSubmitError(v.contactError);
      }
    } catch (err) {
      console.error("[contact] submit failed", err);
      setSubmitError(v.contactError);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>

            {/* ── Left: identity ── */}
            <div className={styles.identity}>
              <span className={styles.tagline}>
                <span className={styles.taglineDot} />
                {c.tagline}
              </span>

              <h1 className={styles.title}>{c.title}</h1>

              <p className={styles.hook}>{c.hook}</p>

              <div className={styles.contactBlock}>
                <span className={styles.contactLabel}>{c.emailLabel}</span>
                <a href="mailto:contact@spaveapp.com" className={styles.emailLink}>
                  contact@spaveapp.com
                </a>
                <span className={styles.responseTime}>
                  {c.responseTime}
                </span>
              </div>

              <a href={l("/#faq")} className={styles.faqLink}>
                {c.faqLink}
                <ArrowRight size={15} className={styles.faqLinkArrow} />
              </a>
            </div>

            {/* ── Right: form ── */}
            <div className={styles.formWrap}>
              <p className={styles.formTitle}>{c.formTitle}</p>
              {confirmed ? (
                <p role="status" className={styles.confirmed}>{v.contactConfirmed}</p>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <div className={styles.row}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label} htmlFor="name">{c.name}</label>
                      <input
                        id="name"
                        type="text"
                        placeholder={c.namePlaceholder}
                        value={fields.name}
                        onChange={(e) => set("name", e.target.value)}
                        className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                        aria-describedby="contact-name-error"
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <p id="contact-name-error" className={styles.fieldError}>{errors.name}</p>}
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label} htmlFor="email">{c.email}</label>
                      <input
                        id="email"
                        type="email"
                        placeholder={c.emailPlaceholder}
                        value={fields.email}
                        onChange={(e) => set("email", e.target.value)}
                        className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                        aria-describedby="contact-email-error"
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <p id="contact-email-error" className={styles.fieldError}>{errors.email}</p>}
                    </div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="subject">{c.subject}</label>
                    <input
                      id="subject"
                      type="text"
                      placeholder={c.subjectPlaceholder}
                      value={fields.subject}
                      onChange={(e) => set("subject", e.target.value)}
                      className={`${styles.input} ${errors.subject ? styles.inputError : ""}`}
                      aria-describedby="contact-subject-error"
                      aria-invalid={!!errors.subject}
                    />
                    {errors.subject && <p id="contact-subject-error" className={styles.fieldError}>{errors.subject}</p>}
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="message">{c.message}</label>
                    <textarea
                      id="message"
                      placeholder={c.messagePlaceholder}
                      value={fields.message}
                      onChange={(e) => set("message", e.target.value)}
                      className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                      aria-describedby="contact-message-error"
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && <p id="contact-message-error" className={styles.fieldError}>{errors.message}</p>}
                  </div>
                  {submitError && (
                    <p role="alert" className={styles.submitError}>{submitError}</p>
                  )}
                  <button type="submit" className={styles.submit} disabled={submitting}>
                    {submitting ? v.contactSending : c.submit}
                    <ChevronsRight size={16} />
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
