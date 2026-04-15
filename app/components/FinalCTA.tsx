"use client";

import { useState, useMemo, useEffect } from "react";
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
  const [submitting, setSubmitting] = useState(false);

  const { noteCount, noteSuffix } = useMemo(() => {
    const match = t.finalCta.note.match(/^(\d+)([\s\S]*)/);
    return { noteCount: match?.[1] ?? "", noteSuffix: match?.[2] ?? t.finalCta.note };
  }, [t.finalCta.note]);

  const [displayCount, setDisplayCount] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waitlist/size`);
        if (!res.ok) {
          if (!cancelled) setDisplayCount(noteCount);
          return;
        }
        const text = (await res.text()).trim();
        if (!cancelled) setDisplayCount(/^\d+$/.test(text) ? text : noteCount);
      } catch (err) {
        console.error("[waitlist/size] failed", err);
        if (!cancelled) setDisplayCount(noteCount);
      }
    })();
    return () => { cancelled = true; };
  }, [noteCount]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) { setError(t.validation.emailRequired); return; }
    if (!isValidEmail(trimmed)) { setError(t.validation.emailInvalid); return; }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (res.status === 201) {
        setConfirmed(true);
        setCounting(true);
        setTimeout(() => {
          setDisplayCount((prev) => {
            const parsed = parseInt(prev ?? "", 10);
            return isNaN(parsed) ? prev : String(parsed + 1);
          });
        }, 150);
        setTimeout(() => setCounting(false), 700);
      } else if (res.status === 409) {
        setError(t.validation.alreadyOnWaitlist);
      } else {
        setError(t.validation.genericError);
      }
    } catch (err) {
      setError(t.validation.networkError);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={styles.section} id="waitlist">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{t.finalCta.eyebrow}</p>
        <h2 className={styles.heading}>{t.finalCta.heading}</h2>
        <p className={styles.sub}>{t.finalCta.sub}</p>
        {confirmed ? (
          <p role="status" className={styles.confirmed}>{t.finalCta.confirmed}</p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <input
              type="email"
              placeholder={t.finalCta.placeholder}
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
              className={`${styles.input} ${error ? styles.inputError : ""}`}
              aria-describedby="finalcta-error"
              aria-invalid={!!error}
            />
            <button type="submit" className={styles.btn} disabled={submitting}>{t.finalCta.notify}</button>
          </form>
        )}
        {error && <p id="finalcta-error" className={styles.error}>{error}</p>}
        {!confirmed && <p className={styles.consent}>{t.finalCta.consent}</p>}
        {displayCount && (
          <p className={styles.note}>
            <span className={`${styles.noteCount} ${counting ? styles.noteCountTick : ""}`}>
              {displayCount}
            </span>
            {noteSuffix}
          </p>
        )}
      </div>

    </section>
  );
}
