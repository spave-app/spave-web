import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import styles from "./styles/Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.bannerWrap}>
          <Image
            src="/banner-image.svg"
            alt="Find Your Court - Spave"
            fill
            className={styles.banner}
            priority
          />
        </div>

        <p className={styles.description}>
          Introducing <span className={styles.brand}>Spave</span> - discover and book soccer courts across Montreal, by the hour.
        </p>
        <p className={styles.incentive}>Coming soon, be the first to book.</p>

        <div className={styles.actions}>
          <a href="#waitlist" className={styles.btnPrimary}>
            Join the Waitlist
          </a>
          <a href="/browse" className={styles.btnSecondary}>
            Try Prototype <ChevronsRight size={16} />
          </a>
        </div>

        <p className={styles.socialProof}>95 players are waiting</p>
      </div>
    </section>
  );
}
