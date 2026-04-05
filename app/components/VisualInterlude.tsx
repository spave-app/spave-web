"use client";

import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import { useT } from "../i18n/LanguageContext";
import styles from "./styles/VisualInterlude.module.css";

export default function VisualInterlude() {
  const { t, l } = useT();
  return (
    <section className={styles.section}>
      <Image
        src="/top_view_field.jpg"
        alt="Aerial view of a soccer court"
        fill
        className={styles.image}
        sizes="100vw"
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h2 className={styles.heading}>{t.visualInterlude.heading}</h2>
        <a href={l("/browse")} className={styles.cta}>
          {t.visualInterlude.cta} <ChevronsRight size={18} />
        </a>
      </div>
    </section>
  );
}
