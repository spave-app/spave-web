"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import { useT } from "../i18n/LanguageContext";
import { useCountUp } from "../hooks/useCountUp";
import styles from "./styles/Hero.module.css";

// TODO: replace with DB value when live count endpoint is ready
// Usage: <Hero playerCount={dbCount} />
export default function Hero({ playerCount }: { playerCount?: number } = {}) {
  const { t, l, lang } = useT();
  const [fetchedCount, setFetchedCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/waitlist/size`);
        if (!res.ok) return;
        const text = (await res.text()).trim();
        const n = parseInt(text, 10);
        if (!cancelled && !isNaN(n)) setFetchedCount(n);
      } catch (err) {
        console.error("[waitlist/size] failed", err);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const { targetCount, socialProofSuffix } = useMemo(() => {
    const text = t.hero.socialProof;
    const match = text.match(/^(\d+)(.*)/);
    return {
      targetCount: playerCount ?? fetchedCount,
      socialProofSuffix: match ? match[2] : text,
    };
  }, [t.hero.socialProof, playerCount, fetchedCount]);

  const descriptionParts = useMemo(
    () => t.hero.description.split("Spave"),
    [t.hero.description]
  );

  const count = useCountUp(targetCount ?? 0);

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.bannerWrap}>
          <Image
            src={lang === "fr" ? "/banner-image-fr.svg" : "/banner-image.svg"}
            alt={lang === "fr"
              ? "Trouvez votre terrain – Réservez des terrains de soccer à Montréal"
              : "Find Your Court – Browse and book soccer courts in Montreal"}
            fill
            className={styles.banner}
            priority
          />
        </div>

        <p className={styles.description}>
          {descriptionParts.map((part, i, arr) =>
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
          {targetCount != null ? <><span className={styles.count}>{count}</span>{socialProofSuffix}</> : <>&nbsp;</>}
        </p>
      </div>
    </section>
  );
}
