"use client";

import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { useT } from "../../i18n/LanguageContext";
import styles from "./CtaBanner.module.css";

export default function CtaBanner() {
  const { t } = useT();
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  function dismiss() {
    setDismissed(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      setExpanded(false);
      setEmail("");
    }, 2500);
  }

  if (dismissed) return null;

  return (
    <div className={styles.banner}>
      {confirmed ? (
        <span className={styles.confirmed}>{t.browse.ctaConfirmed}</span>
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
              <form className={styles.form} onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  autoFocus
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                />
                <button type="submit" className={styles.submitBtn}>
                  <ArrowRight size={14} />
                </button>
              </form>
            ) : (
              <button className={styles.notifyBtn} onClick={() => setExpanded(true)}>
                {t.browse.ctaBtn}
              </button>
            )}
          </div>
        </>
      )}
      <button className={styles.dismiss} onClick={dismiss} aria-label="Dismiss banner">
        <X size={13} />
      </button>
    </div>
  );
}
