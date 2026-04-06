"use client";

import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import { useT } from "@/app/i18n/LanguageContext";
import styles from "./styles/CookieBanner.module.css";

type Consent = "all" | "essential" | "refused";
const STORAGE_KEY = "spave_cookie_consent";

export default function CookieBanner() {
  const { t, l } = useT();
  const [consent, setConsent] = useState<Consent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent | null;
    if (stored) {
      setConsent(stored);
    } else {
      setVisible(true);
      document.documentElement.style.setProperty("--cookie-banner-height", "65px");
    }

    function handleReset() {
      localStorage.removeItem(STORAGE_KEY);
      setConsent(null);
      setVisible(true);
      document.documentElement.style.setProperty("--cookie-banner-height", "65px");
    }

    window.addEventListener("spave:reset-cookie-consent", handleReset);
    return () => {
      window.removeEventListener("spave:reset-cookie-consent", handleReset);
      document.documentElement.style.removeProperty("--cookie-banner-height");
    };
  }, []);

  function choose(value: Consent) {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    setVisible(false);
    document.documentElement.style.removeProperty("--cookie-banner-height");
  }

  return (
    <>
      {consent === "all" && <Analytics />}
      {visible && (
        <div className={styles.banner} role="dialog" aria-label="Cookie preferences">
          <div className={styles.inner}>
            <p className={styles.text}>
              {t.cookieBanner.text}{" "}
              <a href={l("/privacy")} className={styles.policyLink}>{t.cookieBanner.privacyLink}</a>.
            </p>
            <div className={styles.actions}>
              <button className={styles.refuse} onClick={() => choose("refused")}>
                {t.cookieBanner.refuse}
              </button>
              <button className={styles.essential} onClick={() => choose("essential")}>
                {t.cookieBanner.essential}
              </button>
              <button className={styles.accept} onClick={() => choose("all")}>
                {t.cookieBanner.accept}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
