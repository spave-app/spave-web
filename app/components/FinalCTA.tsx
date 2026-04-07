"use client";

import { useState, useMemo } from "react";
import { useT } from "../i18n/LanguageContext";
import styles from "./styles/FinalCTA.module.css";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function FinalCTA() {
  const { t } = useT();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [counting, setCounting] = useState(false);

  const { noteCount, noteSuffix } = useMemo(() => {
    const match = t.finalCta.note.match(/^(\d+)([\s\S]*)/);
    return { noteCount: match?.[1] ?? "", noteSuffix: match?.[2] ?? t.finalCta.note };
  }, [t.finalCta.note]);

  const [displayCount, setDisplayCount] = useState<string>(noteCount);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) { setError(t.validation.emailRequired); return; }
    if (!isValidEmail(trimmed)) { setError(t.validation.emailInvalid); return; }
    setError("");
    setConfirmed(true);

    // Animate counter +1
    setCounting(true);
    setTimeout(() => {
      const parsed = parseInt(noteCount, 10);
      setDisplayCount(isNaN(parsed) ? noteCount : String(parsed + 1));
    }, 150);
    setTimeout(() => setCounting(false), 700);
  }

  return (
    <section className={styles.section} id="waitlist">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{t.finalCta.eyebrow}</p>
        <h2 className={styles.heading}>{t.finalCta.heading}</h2>
        <p className={styles.sub}>{t.finalCta.sub}</p>
        {confirmed ? (
          <p className={styles.confirmed}>{t.finalCta.confirmed}</p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              placeholder={t.finalCta.placeholder}
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
              className={`${styles.input} ${error ? styles.inputError : ""}`}
            />
            <button type="submit" className={styles.btn}>{t.finalCta.notify}</button>
          </form>
        )}
        {error && <p className={styles.error}>{error}</p>}
        {!confirmed && <p className={styles.consent}>{t.finalCta.consent}</p>}
        <p className={styles.note}>
          <span className={`${styles.noteCount} ${counting ? styles.noteCountTick : ""}`}>
            {displayCount}
          </span>
          {noteSuffix}
        </p>
      </div>
    </section>
  );
}
