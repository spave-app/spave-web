"use client";

import Image from "next/image";
import { useT } from "../../i18n/LanguageContext";
import type { Court } from "../../types";
import { isValidImageUrl, formatSize, formatSurface, formatPrice } from "@/app/utils/courtUtils";
import styles from "./CourtCard.module.css";

export default function CourtCard({ court, onClick, distance }: { court: Court; onClick: () => void; distance?: string | null }) {
  const { t } = useT();
  const c = t.courtCard;
  const isIndoor = court.type === "INDOOR";
  const imageUrl = court.imageUrl ?? "/placeholder.jpg";
  const validImage = isValidImageUrl(court.imageUrl);

  return (
    <div
      className={styles.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
      aria-label={court.name}
    >
      <div className={`${styles.imageWrap} ${!validImage ? (isIndoor ? styles.indoor : styles.outdoor) : ""}`}>
        <Image
          src={imageUrl}
          alt={court.name}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
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
          {formatSize(court.size, { full: c.full })} · {formatSurface(court.surface, { synthetic: c.synthetic, grass: c.grass, hardwood: c.hardwood })}
          {distance && <span className={styles.distance}> · {distance}</span>}
        </p>

        <p className={styles.price}>
          {formatPrice(court.priceMin, court.priceMax, { fromPrice: c.fromPrice, upToPrice: c.upToPrice, contactVenue: c.contactVenue })}
          {(court.priceMin !== null || court.priceMax !== null) && (
            <span className={styles.priceUnit}> {c.perHour}</span>
          )}
        </p>
      </div>
    </div>
  );
}
