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

  function set(key: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setConfirmed(true);
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
                <p className={styles.confirmed}>{v.contactConfirmed}</p>
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
                      />
                      {errors.name && <p className={styles.fieldError}>{errors.name}</p>}
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
                      />
                      {errors.email && <p className={styles.fieldError}>{errors.email}</p>}
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
                    />
                    {errors.subject && <p className={styles.fieldError}>{errors.subject}</p>}
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="message">{c.message}</label>
                    <textarea
                      id="message"
                      placeholder={c.messagePlaceholder}
                      value={fields.message}
                      onChange={(e) => set("message", e.target.value)}
                      className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
                    />
                    {errors.message && <p className={styles.fieldError}>{errors.message}</p>}
                  </div>
                  <button type="submit" className={styles.submit}>
                    {c.submit}
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
