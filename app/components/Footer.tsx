"use client";

import { useState } from "react";
import Image from "next/image";
import { useT } from "../i18n/LanguageContext";
import styles from "./styles/Footer.module.css";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function Footer() {
  const { t, l } = useT();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) { setError(t.validation.emailRequired); return; }
    if (!isValidEmail(trimmed)) { setError(t.validation.emailInvalid); return; }
    setError("");
    setConfirmed(true);
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Image src="/spave-logo.svg" alt="Spave" width={40} height={24} />
            <p className={styles.tagline}>{t.footer.tagline}</p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <span className={styles.linkGroupLabel}>{t.footer.quickLinks}</span>
              <a href={l("/browse")} className={styles.link}>{t.footer.tryPrototype}</a>
              <a href={l("/contact")} className={styles.link}>{t.footer.contact}</a>
            </div>
            <div className={styles.linkGroup}>
              <span className={styles.linkGroupLabel}>{t.footer.legal}</span>
              <a href={l("/privacy")} className={styles.link}>{t.footer.privacyPolicy}</a>
              <button
                className={styles.linkBtn}
                onClick={() => window.dispatchEvent(new CustomEvent("spave:reset-cookie-consent"))}
              >
                {t.footer.cookiePreferences}
              </button>
            </div>
          </div>

          <div className={styles.waitlistBlock}>
            <p className={styles.waitlistLabel}>{t.footer.stayInLoop}</p>
            {confirmed ? (
              <p role="status" className={styles.confirmed}>{t.footer.confirmed}</p>
            ) : (
              <form className={styles.waitlistForm} onSubmit={handleSubmit} noValidate>
                <input
                  type="email"
                  placeholder={t.footer.placeholder}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                  className={`${styles.input} ${error ? styles.inputError : ""}`}
                  aria-describedby="footer-error"
                  aria-invalid={!!error}
                />
                <button type="submit" className={styles.waitlistBtn}>{t.footer.notify}</button>
              </form>
            )}
            {error && <p id="footer-error" className={styles.error}>{error}</p>}
            <p className={styles.consent}>{t.footer.consent}</p>
          </div>
        </div>

        <p className={styles.priceDisclaimer}>{t.footer.priceDisclaimerFooter}</p>

        <div className={styles.bottom}>
          <span className={styles.copy}>{t.footer.copyright}</span>
          <span className={styles.city}>{t.footer.city}</span>
        </div>
      </div>
    </footer>
  );
}
