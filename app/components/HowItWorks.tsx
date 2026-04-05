"use client";

import { useT } from "../i18n/LanguageContext";
import styles from "./styles/HowItWorks.module.css";

const NUMBERS = ["01", "02", "03"];

export default function HowItWorks() {
  const { t } = useT();
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t.howItWorks.heading}</h2>

        <div className={styles.steps}>
          {t.howItWorks.steps.map((step, i) => (
            <div key={step.title} className={styles.step}>
              <div className={styles.stepTop}>
                <span className={styles.stepNumber}>{NUMBERS[i]}</span>
                <span className={styles.connector} />
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
