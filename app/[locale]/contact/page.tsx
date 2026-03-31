"use client";

import { ArrowRight, ChevronsRight } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useT } from "@/app/i18n/LanguageContext";
import styles from "@/app/contact/contact.module.css";

export default function Contact() {
  const { t, l } = useT();
  const c = t.contact;

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
              <form className={styles.form}>
                <div className={styles.row}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="name">{c.name}</label>
                    <input id="name" type="text" placeholder={c.namePlaceholder} className={styles.input} />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="email">{c.email}</label>
                    <input id="email" type="email" placeholder={c.emailPlaceholder} className={styles.input} />
                  </div>
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="subject">{c.subject}</label>
                  <input id="subject" type="text" placeholder={c.subjectPlaceholder} className={styles.input} />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label} htmlFor="message">{c.message}</label>
                  <textarea id="message" placeholder={c.messagePlaceholder} className={styles.textarea} />
                </div>
                <button type="submit" className={styles.submit}>
                  {c.submit}
                  <ChevronsRight size={16} />
                </button>
              </form>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
