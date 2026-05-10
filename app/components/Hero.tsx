"use client";

import { useMemo } from "react";
import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import { useT } from "../i18n/LanguageContext";
import styles from "./styles/Hero.module.css";

export default function Hero() {
  const { t, l, lang } = useT();

  const descriptionParts = useMemo(() => t.hero.description.split("Spave"), [t.hero.description]);

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.bannerWrap}>
          <Image
            src={lang === "fr" ? "/banner-image-fr.svg" : "/banner-image.svg"}
            alt={
              lang === "fr"
                ? "Trouvez votre terrain – Réservez des terrains de soccer à Montréal"
                : "Find Your Court – Browse and book soccer courts in Montreal"
            }
            fill
            className={styles.banner}
            priority
          />
        </div>

        <p className={styles.description}>
          {descriptionParts.map((part, i, arr) =>
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <span className={styles.brand}>Spave</span>
              </span>
            ) : (
              part
            )
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
      </div>
    </section>
  );
}
