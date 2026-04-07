"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./not-found.module.css";

const content = {
  en: {
    heading: "Out of bounds.",
    sub: ["This page doesn't exist.", "Let's get you back on the field."],
    cta: "Back to Home",
    href: "/en",
  },
  fr: {
    heading: "Hors du terrain.",
    sub: ["Cette page n'existe pas.", "Retournons sur le bon terrain."],
    cta: "Retour à l'accueil",
    href: "/fr",
  },
};

export default function NotFound() {
  const [lang, setLang] = useState<"en" | "fr">("en");

  useEffect(() => {
    if (window.location.pathname.startsWith("/fr")) setLang("fr");
  }, []);

  const c = content[lang];

  return (
    <div className={styles.page}>
      <svg className={styles.field} viewBox="0 0 600 400" fill="none" aria-hidden="true">
        <line x1="300" y1="0" x2="300" y2="400" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="300" cy="200" r="80" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="300" cy="200" r="4" fill="currentColor" />
        <rect x="2" y="2" width="596" height="396" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="130" width="80" height="140" stroke="currentColor" strokeWidth="1.5" />
        <rect x="518" y="130" width="80" height="140" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <div className={styles.backdrop} aria-hidden="true">404</div>

      <div className={styles.content}>
        <h1 className={styles.heading}>{c.heading}</h1>
        <p className={styles.sub}>
          {c.sub[0]}<span className={styles.subBreak}> {c.sub[1]}</span>
        </p>
        <Link href={c.href} className={styles.cta}>{c.cta}</Link>
      </div>
    </div>
  );
}
