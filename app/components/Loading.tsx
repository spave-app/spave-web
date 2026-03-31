"use client";

import { useT } from "../i18n/LanguageContext";
import styles from "./styles/Loading.module.css";

export default function Loading() {
  const { t } = useT();
  return (
    <div className={styles.wrap}>
      <div className={styles.ring} aria-hidden="true" />
      <p className={styles.hint}>{t.loading.hint}</p>
    </div>
  );
}
