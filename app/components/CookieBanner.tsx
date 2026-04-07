"use client";

import { useState, useEffect, useRef } from "react";
import { Analytics } from "@vercel/analytics/next";
import { useT } from "@/app/i18n/LanguageContext";
import styles from "./styles/CookieBanner.module.css";

type Consent = "all" | "essential" | "refused";
const STORAGE_KEY = "spave_cookie_consent";
const CSS_VAR = "--cookie-banner-height";

export default function CookieBanner() {
  const { t, l } = useT();
  const [consent, setConsent] = useState<Consent | null>(null);
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Keep --cookie-banner-height in sync with the actual rendered banner height
  useEffect(() => {
    if (!visible || !bannerRef.current) return;
    const el = bannerRef.current;
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty(CSS_VAR, `${el.offsetHeight}px`);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent | null;
    if (stored) {
      setConsent(stored);
    } else {
      setVisible(true);
    }

    function handleReset() {
      localStorage.removeItem(STORAGE_KEY);
      setConsent(null);
      setVisible(true);
    }

    window.addEventListener("spave:reset-cookie-consent", handleReset);
    return () => {
      window.removeEventListener("spave:reset-cookie-consent", handleReset);
      document.documentElement.style.removeProperty(CSS_VAR);
    };
  }, []);

  function choose(value: Consent) {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    setVisible(false);
    document.documentElement.style.removeProperty(CSS_VAR);
  }

  return (
    <>
      {consent === "all" && <Analytics />}
      {visible && (
        <div ref={bannerRef} className={styles.banner} role="dialog" aria-label="Cookie preferences">
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
