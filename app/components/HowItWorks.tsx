"use client";

import { useT } from "../i18n/LanguageContext";
import { useInView } from "../hooks/useInView";
import styles from "./styles/HowItWorks.module.css";

const NUMBERS = ["01", "02", "03"];

export default function HowItWorks() {
  const { t } = useT();
  const { ref, inView } = useInView(0.15, "0px 0px -180px 0px");

  return (
    <section className={`${styles.section} ${inView ? styles.sectionSweep : ""}`}>
      <div className={styles.inner} ref={ref}>
        <h2 className={`${styles.heading} ${inView ? styles.visible : ""}`}>
          {t.howItWorks.heading}
        </h2>

        <div className={styles.steps}>
          {t.howItWorks.steps.map((step, i) => (
            <div
              key={step.title}
              className={`${styles.step} ${inView ? styles.stepVisible : ""}`}
              style={{ transitionDelay: inView ? `${100 + i * 130}ms` : "0ms" }}
            >
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
