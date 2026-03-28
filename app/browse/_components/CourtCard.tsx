import type { Court, CourtSize, CourtType, CourtSurface } from "../../types";
import styles from "./CourtCard.module.css";

function formatSize(size: CourtSize): string {
  const map: Record<CourtSize, string> = {
    THREE_V_THREE: "3v3",
    FIVE_V_FIVE: "5v5",
    SEVEN_V_SEVEN: "7v7",
    NINE_V_NINE: "9v9",
    FULL: "Full",
  };
  return map[size] ?? size;
}

function formatSurface(surface: CourtSurface): string {
  const map: Record<CourtSurface, string> = {
    SYNTHETIC: "Synthetic",
    GRASS: "Grass",
    HARDWOOD: "Hardwood",
  };
  return map[surface] ?? surface;
}

function formatType(type: CourtType): string {
  return type === "INDOOR" ? "Indoor" : "Outdoor";
}

function formatPrice(priceMin: number | null, priceMax: number | null): string {
  if (priceMin !== null && priceMax !== null) {
    if (priceMin === priceMax) return `$${priceMin}`;
    return `$${priceMin} - $${priceMax}`;
  }
  if (priceMin !== null) return `From $${priceMin}`;
  if (priceMax !== null) return `Up to $${priceMax}`;
  return "Contact venue for pricing";
}

export default function CourtCard({ court }: { court: Court }) {
  const isIndoor = court.type === "INDOOR";

  return (
    <div className={styles.card}>
      <div className={`${styles.imageWrap} ${isIndoor ? styles.indoor : styles.outdoor}`}>
        <div className={styles.overlay} />

        <div className={styles.imageMeta}>
          <span className={`${styles.typeBadge} ${isIndoor ? styles.typeBadgeIndoor : styles.typeBadgeOutdoor}`}>
            {formatType(court.type)}
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
            <span className={styles.venueName}>{court.venue.name}</span>
            <h3 className={styles.name}>{court.name}</h3>
          </div>
          <span className={styles.available}>
            {court.numberAvailable} available
          </span>
        </div>

        <p className={styles.meta}>
          {formatSize(court.size)} · {formatSurface(court.surface)}
        </p>

        <p className={styles.price}>
          {formatPrice(court.priceMin, court.priceMax)}
          {(court.priceMin !== null || court.priceMax !== null) && (
            <span className={styles.priceUnit}> /hr</span>
          )}
        </p>
      </div>
    </div>
  );
}
