"use client";

import { useT } from "../i18n/LanguageContext";
import styles from "./styles/SocialProof.module.css";

export default function SocialProof() {
  const { t } = useT();
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>{t.socialProof.heading}</h2>

        <div className={styles.grid}>
          {t.socialProof.testimonials.map((testimonial) => (
            <div key={testimonial.author} className={styles.card}>
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
