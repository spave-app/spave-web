"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { useT } from "../../i18n/LanguageContext";
import styles from "./CtaBanner.module.css";

const CONFIRM_DISPLAY_MS = 2500;

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function CtaBanner() {
  const { t } = useT();
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) { setError(t.validation.emailRequired); return; }
    if (!isValidEmail(trimmed)) { setError(t.validation.emailInvalid); return; }
    setError("");
    setSubmitting(true);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/waitlist`;
    console.log("[waitlist] submitting", { url, email: trimmed, apiUrl: process.env.NEXT_PUBLIC_API_URL });
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const bodyText = await res.text().catch(() => "");
      console.log("[waitlist] response", { status: res.status, ok: res.ok, body: bodyText });
      if (res.status === 201) {
        setConfirmed(true);
        setTimeout(() => {
          setConfirmed(false);
          setExpanded(false);
          setEmail("");
        }, CONFIRM_DISPLAY_MS);
      } else if (res.status === 409) {
        setError("You're already on the waitlist.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("[waitlist] network/error", err);
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (dismissed) return null;

  return (
    <div className={styles.banner}>
      {confirmed ? (
        <span role="status" className={styles.confirmed}>{t.browse.ctaConfirmed}</span>
      ) : (
        <>
          <div className={styles.left}>
            <span className={styles.headline}>{t.browse.ctaHeadline}</span>
            <span className={styles.sub}>
              {t.browse.ctaSub.split(". ").map((s, i, arr) =>
                i === arr.length - 1
                  ? <strong key={i}>{s}</strong>
                  : <span key={i}>{s}. </span>
              )}
            </span>
          </div>
          <div className={styles.right}>
            {expanded ? (
              <div className={styles.expandedBlock}>
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <input
                    type="email"
                    autoFocus
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                    className={`${styles.input} ${error ? styles.inputError : ""}`}
                    aria-describedby="ctabanner-error"
                    aria-invalid={!!error}
                  />
                  <button type="submit" className={styles.submitBtn} aria-label="Submit email" disabled={submitting}>
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </form>
                {error && <p id="ctabanner-error" className={styles.error}>{error}</p>}
                <p className={styles.consent}>
                  {t.browse.ctaConsent[0]}<br />{t.browse.ctaConsent[1]}
                </p>
              </div>
            ) : (
              <button className={styles.notifyBtn} onClick={() => setExpanded(true)}>
                {t.browse.ctaBtn}
              </button>
            )}
          </div>
        </>
      )}
      <button className={styles.dismiss} onClick={() => setDismissed(true)} aria-label="Dismiss banner">
        <X size={13} />
      </button>
    </div>
  );
}
