"use client";

import Image from "next/image";
import { X, Phone, Mail, Globe, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { useT } from "../../i18n/LanguageContext";
import type { Court } from "../../types";
import { isValidImageUrl, isSafeExternalUrl, formatSize, formatSurface, formatPrice } from "@/app/utils/courtUtils";
import styles from "./CourtModal.module.css";

export default function CourtModal({ court, onClose }: { court: Court; onClose: () => void }) {
  const { t } = useT();
  const c = t.courtCard;
  const m = t.modal;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const imageUrl = court.imageUrl ?? "/placeholder.jpg";
  const validImage = isValidImageUrl(court.imageUrl);
  const isIndoor = court.type === "INDOOR";
  const hasPrice = court.priceMin !== null || court.priceMax !== null;

  const surfaceLabels = { synthetic: c.synthetic, grass: c.grass, hardwood: c.hardwood };
  const sizeLabels = { full: c.full };
  const priceLabels = { fromPrice: c.fromPrice, upToPrice: c.upToPrice, contactVenue: c.contactVenue };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal} role="dialog" aria-modal="true">

        {/* Image */}
        <div className={`${styles.imageWrap} ${!validImage ? (isIndoor ? styles.indoor : styles.outdoor) : ""}`}>
          <Image
            src={imageUrl}
            alt={court.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 560px"
          />
          <div className={styles.imageOverlay} />
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
          <span className={`${styles.typeBadge} ${isIndoor ? styles.typeBadgeIndoor : styles.typeBadgeOutdoor}`}>
            {isIndoor ? c.indoor : c.outdoor}
          </span>
        </div>

        {/* Scrollable body */}
        <div className={styles.body}>

          <div className={styles.header}>
            <h2 className={styles.courtName}>{court.name}</h2>
            <p className={styles.venueName}>{court.venue.name}</p>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.priceValue}>{formatPrice(court.priceMin, court.priceMax, priceLabels)}</span>
            {hasPrice && <span className={styles.priceUnit}>{c.perHour}</span>}
          </div>

          <div className={styles.divider} />

          <div className={styles.section}>
            <p className={styles.sectionLabel}>{m.details}</p>
            <div className={styles.pills}>
              <span className={styles.pill}>{formatSize(court.size, sizeLabels)}</span>
              <span className={styles.pill}>{formatSurface(court.surface, surfaceLabels)}</span>
              <span className={styles.pill}>{isIndoor ? c.indoor : c.outdoor}</span>
              <span className={`${styles.pill} ${styles.pillAvailable}`}>
                {c.available(court.numberAvailable)}
              </span>
            </div>
          </div>

          {court.availabilityHint.length > 0 && (
            <div className={styles.section}>
              <p className={styles.sectionLabel}>{m.availability}</p>
              <div className={styles.pills}>
                {court.availabilityHint.map((hint, i) => (
                  <span key={i} className={styles.pill}>{hint}</span>
                ))}
              </div>
            </div>
          )}

          {court.notes && (
            <div className={styles.section}>
              <p className={styles.sectionLabel}>{m.notes}</p>
              <p className={styles.notes}>{court.notes}</p>
            </div>
          )}

          <div className={styles.divider} />

          <div className={styles.section}>
            <p className={styles.sectionLabel}>{court.venue.name}</p>
            <div className={styles.venueLinks}>
              {court.venue.phone && (
                <a href={`tel:${court.venue.phone}`} className={styles.venueLink}>
                  <Phone size={14} />
                  {court.venue.phone}
                </a>
              )}
              {court.venue.email && (
                <a href={`mailto:${court.venue.email}`} className={styles.venueLink}>
                  <Mail size={14} />
                  {court.venue.email}
                </a>
              )}
              {isSafeExternalUrl(court.venue.website) && (
                <a href={court.venue.website} target="_blank" rel="noopener noreferrer" className={styles.venueLink}>
                  <Globe size={14} />
                  {m.website}
                  <ExternalLink size={11} className={styles.externalIcon} />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Sticky CTA */}
        {isSafeExternalUrl(court.bookingLink) && (
          <div className={styles.footer}>
            <a
              href={court.bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bookBtn}
            >
              {m.bookAt(court.venue.name)}
            </a>
          </div>
        )}

      </div>
    </>
  );
}
