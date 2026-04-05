"use client";

import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import { useT } from "../i18n/LanguageContext";
import { useCountUp } from "../hooks/useCountUp";
import styles from "./styles/Hero.module.css";

// TODO: replace with DB value when live count endpoint is ready
// Usage: <Hero playerCount={dbCount} />
export default function Hero({ playerCount }: { playerCount?: number } = {}) {
  const { t, l, lang } = useT();

  const socialProofText = t.hero.socialProof;
  const match = socialProofText.match(/^(\d+)(.*)/);
  const targetCount = playerCount ?? (match ? parseInt(match[1]) : null);
  const socialProofSuffix = match ? match[2] : socialProofText;
  const count = useCountUp(targetCount ?? 0);

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

        <p className={styles.socialProof}>
          {targetCount !== null ? <><span className={styles.count}>{count}</span>{socialProofSuffix}</> : socialProofText}
        </p>
      </div>
    </section>
  );
}
