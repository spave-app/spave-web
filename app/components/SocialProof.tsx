import styles from "./styles/SocialProof.module.css";

const testimonials = [
  {
    quote: "Finally found a 5v5 court in NDG with actual grass. Booked in under two minutes. Would've taken me three phone calls before.",
    author: "Karim T.",
    location: "Notre-Dame-de-Grâce",
  },
  {
    quote: "Tried calling three venues on a Friday afternoon. With Spave I just found an open court, got the address, and went.",
    author: "Sophie L.",
    location: "Laval",
  },
];

export default function SocialProof() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>What players are saying</h2>

        <div className={styles.grid}>
          {testimonials.map((t) => (
            <div key={t.author} className={styles.card}>
              <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
              <div className={styles.attribution}>
                <span className={styles.author}>{t.author}</span>
                <span className={styles.location}>{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
