"use client";

import { useT } from "../i18n/LanguageContext";
import { useInView } from "../hooks/useInView";
import styles from "./styles/Timeline.module.css";

const STATUSES = ["done", "active", "upcoming", "upcoming"] as const;

export default function Timeline() {
  const { t } = useT();
  const { milestones, heading, live, inProgress, comingSoon } = t.timeline;
  const { ref: sectionRef, inView } = useInView<HTMLDivElement>(0.15, "0px 0px -120px 0px");

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={`${styles.heading} ${inView ? styles.visible : ""}`}>{heading}</h2>

        <div ref={sectionRef} className={styles.timeline}>
          <div className={styles.track}>
            <div className={`${styles.trackFill} ${inView ? styles.trackFillActive : ""}`} />
          </div>

          {milestones.map((m, i) => {
            const status = STATUSES[i];
            return (
              <div
                key={m.label}
                className={`${styles.item} ${i % 2 === 0 ? styles.left : styles.right} ${inView ? styles.visible : ""}`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className={`${styles.dot} ${styles[status]}`} />
                <div className={`${styles.card} ${styles[`card_${status}`]}`}>
                  {status === "done" && <span className={styles.badge}>{live}</span>}
                  {status === "active" && <span className={`${styles.badge} ${styles.badgeActive}`}>{inProgress}</span>}
                  {status === "upcoming" && <span className={`${styles.badge} ${styles.badgeUpcoming}`}>{comingSoon}</span>}
                  <h3 className={styles.milestoneTitle}>{m.label}</h3>
                  <p className={styles.milestoneDesc}>{m.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
