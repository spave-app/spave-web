"use client";

import { useT } from "../i18n/LanguageContext";
import styles from "./styles/FinalCTA.module.css";

export default function FinalCTA() {
  const { t } = useT();
  return (
    <section className={styles.section} id="waitlist">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{t.finalCta.eyebrow}</p>
        <h2 className={styles.heading}>{t.finalCta.heading}</h2>
        <p className={styles.sub}>{t.finalCta.sub}</p>
        <div className={styles.form}>
          <input
            type="email"
            placeholder={t.finalCta.placeholder}
            className={styles.input}
          />
          <button className={styles.btn}>{t.finalCta.notify}</button>
        </div>
        <p className={styles.note}>{t.finalCta.note}</p>
      </div>
    </section>
  );
}
