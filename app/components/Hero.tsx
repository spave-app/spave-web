"use client";

import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import { useT } from "../i18n/LanguageContext";
import styles from "./styles/Hero.module.css";

export default function Hero() {
  const { t, l, lang } = useT();
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.bannerWrap}>
          <Image
            src={lang === "fr" ? "/banner-image-fr.svg" : "/banner-image.svg"}
            alt="Find Your Court - Spave"
            fill
            className={styles.banner}
            priority
          />
        </div>

        <p className={styles.description}>
          {t.hero.description.split("Spave").map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>{part}<span className={styles.brand}>Spave</span></span>
            ) : part
          )}
        </p>
        <p className={styles.incentive}>{t.hero.incentive}</p>

        <div className={styles.actions}>
          <a href={l("/#waitlist")} className={styles.btnPrimary}>
            {t.hero.joinWaitlist}
          </a>
          <a href={l("/browse")} className={styles.btnSecondary}>
            {t.hero.tryPrototype} <ChevronsRight size={16} />
          </a>
        </div>

        <p className={styles.socialProof}>{t.hero.socialProof}</p>
      </div>
    </section>
  );
}
