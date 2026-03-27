import styles from "./styles/FinalCTA.module.css";

export default function FinalCTA() {
  return (
    <section className={styles.section} id="waitlist">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Ready?</p>
        <h2 className={styles.heading}>We&apos;ll let you know first</h2>
        <p className={styles.sub}>We&apos;ll reach out the moment Spave goes live. No spam.</p>
        <div className={styles.form}>
          <input
            type="email"
            placeholder="your@email.com"
            className={styles.input}
          />
          <button className={styles.btn}>Notify me</button>
        </div>
        <p className={styles.note}>95 players are waiting.</p>
      </div>
    </section>
  );
}
