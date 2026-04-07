"use client";

import { useMemo } from "react";
import { useT } from "../i18n/LanguageContext";
import styles from "./styles/FinalCTA.module.css";

export default function FinalCTA() {
  const { t } = useT();
  const { noteCount, noteSuffix } = useMemo(() => {
    const match = t.finalCta.note.match(/^(\d+)([\s\S]*)/);
    return { noteCount: match?.[1] ?? "", noteSuffix: match?.[2] ?? t.finalCta.note };
  }, [t.finalCta.note]);

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
        <p className={styles.consent}>{t.finalCta.consent}</p>
        <p className={styles.note}>
          <span className={styles.noteCount}>{noteCount}</span>
          {noteSuffix}
        </p>
      </div>
    </section>
  );
}
