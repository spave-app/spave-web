"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useT } from "../i18n/LanguageContext";
import styles from "./styles/ScrollHint.module.css";

export default function ScrollHint() {
  const { t } = useT();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("timeline");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHidden(true); },
      { threshold: 0.4 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.wrap} ${hidden ? styles.hidden : ""}`}>
      <span className={styles.label}>{t.finalCta.scrollHint}</span>
      <div className={styles.arrows}>
        <ChevronDown size={20} strokeWidth={2.5} />
        <ChevronDown size={20} strokeWidth={2.5} />
      </div>
    </div>
  );
}
