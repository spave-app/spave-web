import Image from "next/image";
import styles from "./styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Image src="/spave-logo.svg" alt="Spave" width={40} height={24} />
            <p className={styles.tagline}>Book soccer courts by the hour in Montreal.</p>
          </div>

          <div className={styles.links}>
            <div className={styles.linkGroup}>
              <span className={styles.linkGroupLabel}>Product</span>
              <a href="#browse" className={styles.link}>Try prototype</a>
            </div>
            <div className={styles.linkGroup}>
              <span className={styles.linkGroupLabel}>Company</span>
              <a href="#contact" className={styles.link}>Contact</a>
              <a href="#faq" className={styles.link}>FAQ</a>
            </div>
          </div>

          <div className={styles.waitlistBlock}>
            <p className={styles.waitlistLabel}>Stay in the loop</p>
            <div className={styles.waitlistForm}>
              <input
                type="email"
                placeholder="your@email.com"
                className={styles.input}
              />
              <button className={styles.waitlistBtn}>Notify me</button>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>© 2026 Spave. All rights reserved.</span>
          <span className={styles.city}>Made in Montreal.</span>
        </div>
      </div>
    </footer>
  );
}
