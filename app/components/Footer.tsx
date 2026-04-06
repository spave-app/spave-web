"use client";

import Image from "next/image";
import { useT } from "../i18n/LanguageContext";
import styles from "./styles/Footer.module.css";

export default function Footer() {
  const { t, l } = useT();
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
            <div className={styles.waitlistForm}>
              <input
                type="email"
                placeholder={t.footer.placeholder}
                className={styles.input}
              />
              <button className={styles.waitlistBtn}>{t.footer.notify}</button>
            </div>
            <p className={styles.consent}>{t.footer.consent}</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>{t.footer.copyright}</span>
          <span className={styles.city}>{t.footer.city}</span>
        </div>
      </div>
    </footer>
  );
}
