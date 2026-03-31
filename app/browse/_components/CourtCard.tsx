"use client";

import Image from "next/image";
import { useT } from "../../i18n/LanguageContext";
import type { Court, CourtSize, CourtType, CourtSurface } from "../../types";
import styles from "./CourtCard.module.css";

function isValidImageUrl(url: string | null): url is string {
  if (!url) return false;
  try {
    const { protocol } = new URL(url);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

function formatSize(size: CourtSize, full: string): string {
  const map: Record<CourtSize, string> = {
    THREE_V_THREE: "3v3",
    FIVE_V_FIVE: "5v5",
    SEVEN_V_SEVEN: "7v7",
    NINE_V_NINE: "9v9",
    FULL: full,
  };
  return map[size] ?? size;
}

function formatSurface(surface: CourtSurface, labels: { synthetic: string; grass: string; hardwood: string }): string {
  const map: Record<CourtSurface, string> = {
    SYNTHETIC: labels.synthetic,
    GRASS: labels.grass,
    HARDWOOD: labels.hardwood,
  };
  return map[surface] ?? surface;
}

export default function CourtCard({ court }: { court: Court }) {
  const { t } = useT();
  const c = t.courtCard;
  const isIndoor = court.type === "INDOOR";
  const validImage = isValidImageUrl(court.imageUrl);

  function formatPrice(priceMin: number | null, priceMax: number | null): string {
    if (priceMin !== null && priceMax !== null) {
      if (priceMin === priceMax) return `$${priceMin}`;
      return `$${priceMin} - $${priceMax}`;
    }
    if (priceMin !== null) return c.fromPrice(priceMin);
    if (priceMax !== null) return c.upToPrice(priceMax);
    return c.contactVenue;
  }

  return (
    <div className={styles.card}>
      <div className={`${styles.imageWrap} ${!validImage ? (isIndoor ? styles.indoor : styles.outdoor) : ""}`}>
        {validImage && (
          <Image
            src={court.imageUrl}
            alt={court.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
          />
        )}
        <div className={styles.overlay} />

        <div className={styles.imageMeta}>
          <span className={`${styles.typeBadge} ${isIndoor ? styles.typeBadgeIndoor : styles.typeBadgeOutdoor}`}>
            {isIndoor ? c.indoor : c.outdoor}
          </span>
        </div>

        {court.availabilityHint.length > 0 && (
          <div className={styles.hints}>
            {court.availabilityHint.slice(0, 3).map((hint, i) => (
              <span key={i} className={styles.hint}>{hint}</span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.nameRow}>
          <div className={styles.nameBlock}>
            <h3 className={styles.name}>{court.name}</h3>
            <span className={styles.venueName}>{court.venue.name}</span>
          </div>
          <span className={styles.available}>
            {c.available(court.numberAvailable)}
          </span>
        </div>

        <p className={styles.meta}>
          {formatSize(court.size, c.full)} · {formatSurface(court.surface, { synthetic: c.synthetic, grass: c.grass, hardwood: c.hardwood })}
        </p>

        <p className={styles.price}>
          {formatPrice(court.priceMin, court.priceMax)}
          {(court.priceMin !== null || court.priceMax !== null) && (
            <span className={styles.priceUnit}> {c.perHour}</span>
          )}
        </p>
      </div>
    </div>
  );
}
