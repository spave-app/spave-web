"use client";

import { useT } from "../i18n/LanguageContext";
import { useInView } from "../hooks/useInView";
import styles from "./styles/SocialProof.module.css";

export default function SocialProof() {
  const { t } = useT();
  const { ref, inView } = useInView(0.15, "0px 0px -180px 0px");

  return (
    <section className={styles.section}>
      <div className={styles.inner} ref={ref}>
        <h2 className={`${styles.heading} ${inView ? styles.visible : ""}`}>
          {t.socialProof.heading}
        </h2>

        <div className={styles.grid}>
          {t.socialProof.testimonials.map((testimonial, i) => (
            <div
              key={testimonial.author}
              className={`${styles.card} ${inView ? styles.cardVisible : ""}`}
              style={{ transitionDelay: inView ? `${100 + i * 150}ms` : "0ms" }}
            >
              <p className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</p>
              <div className={styles.attribution}>
                <span className={styles.author}>{testimonial.author}</span>
                <span className={styles.location}>{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
