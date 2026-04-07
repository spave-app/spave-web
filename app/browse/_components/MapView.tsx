"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Map, { Marker, Popup, NavigationControl, useMap } from "react-map-gl/maplibre";
import { ChevronsRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useT } from "../../i18n/LanguageContext";
import type { Court, CourtLocation } from "../../types";
import { isValidImageUrl } from "@/app/utils/courtUtils";
import styles from "./MapView.module.css";
import "maplibre-gl/dist/maplibre-gl.css";

const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY;
const MOBILE_BREAKPOINT = 1024;
const SWIPE_THRESHOLD_PX = 40;
const MONTREAL_CENTER = { lng: -73.5673, lat: 45.5017 };
const DEFAULT_ZOOM = 11;

interface VenuePin {
  venueId: string;
  venueName: string;
  lat: number;
  lng: number;
  courts: Court[];
}

interface MapViewProps {
  open: boolean;
  onClose: () => void;
  courtLocations: CourtLocation[];
  filteredCourts: Court[];
  onCourtSelect: (court: Court) => void;
  onPinClick?: (venueId: string) => void;
}


function formatSize(size: string): string {
  const map: Record<string, string> = {
    THREE_V_THREE: "3v3", FIVE_V_FIVE: "5v5",
    SEVEN_V_SEVEN: "7v7", NINE_V_NINE: "9v9", FULL: "Full",
  };
  return map[size] ?? size;
}

function formatPrice(court: Court): { text: string; hasPrice: boolean } {
  if (court.priceMin !== null && court.priceMax !== null) {
    if (court.priceMin === court.priceMax) return { text: `$${court.priceMin}/hr`, hasPrice: true };
    return { text: `$${court.priceMin}–$${court.priceMax}/hr`, hasPrice: true };
  }
  if (court.priceMin !== null) return { text: `From $${court.priceMin}/hr`, hasPrice: true };
  if (court.priceMax !== null) return { text: `Up to $${court.priceMax}/hr`, hasPrice: true };
  return { text: "Contact venue", hasPrice: false };
}

// ── Desktop popup (inside <Map> so useMap works) ───────────────────────────
interface DesktopPopupProps {
  venuePins: VenuePin[];
  selectedVenueId: string | null;
  selectedVenue: VenuePin | null;
  carouselIndex: number;
  onMarkerClick: (venueId: string) => void;
  onPopupClose: () => void;
  onCourtSelect: (court: Court) => void;
  onCarouselPrev: () => void;
  onCarouselNext: () => void;
  onDotClick: (i: number) => void;
}

function DesktopPopup({
  venuePins, selectedVenueId, selectedVenue, carouselIndex,
  onMarkerClick, onPopupClose, onCourtSelect,
  onCarouselPrev, onCarouselNext, onDotClick,
}: DesktopPopupProps) {
  const { current: map } = useMap();

  // Pixel-accurate anchor: check if popup would overflow any edge
  const anchor = useMemo(() => {
    if (!selectedVenue || !map) return "top" as const;
    const canvas = map.getCanvas();
    const pt = map.project([selectedVenue.lng, selectedVenue.lat]);
    const PW = 300, PH = 280, PAD = 8;
    const nearRight = pt.x + PW / 2 > canvas.width - PAD;
    const nearLeft  = pt.x - PW / 2 < PAD;
    const nearTop   = pt.y - PH     < PAD;
    if (nearTop && nearRight) return "top-right"    as const;
    if (nearTop && nearLeft)  return "top-left"     as const;
    if (nearTop)              return "top"          as const;
    if (nearRight)            return "bottom-right" as const;
    if (nearLeft)             return "bottom-left"  as const;
    return "bottom" as const;
  }, [selectedVenue, map]);

  const activeCourt = selectedVenue?.courts[carouselIndex] ?? null;
  const total       = selectedVenue?.courts.length ?? 0;
  const hasImage    = isValidImageUrl(activeCourt?.imageUrl ?? null);

  return (
    <>
      {venuePins.map((venue) => (
        <Marker
          key={venue.venueId}
          longitude={venue.lng}
          latitude={venue.lat}
          anchor="bottom"
          onClick={(e) => { e.originalEvent.stopPropagation(); onMarkerClick(venue.venueId); }}
        >
          <div className={`${styles.marker} ${selectedVenueId === venue.venueId ? styles.markerActive : ""}`}>
            {venue.courts.length > 1
              ? <span className={styles.markerLabel}>{venue.courts.length}</span>
              : <span className={styles.markerDot} />}
          </div>
        </Marker>
      ))}

      {selectedVenue && activeCourt && (
        <Popup
          longitude={selectedVenue.lng}
          latitude={selectedVenue.lat}
          anchor={anchor}
          offset={12}
          closeButton={false}
          closeOnClick={false}
          onClose={onPopupClose}
          className={styles.popupWrapper}
        >
          <div className={styles.popup}>
            <div className={`${styles.popupImageWrap} ${!hasImage ? (activeCourt.type === "INDOOR" ? styles.popupImageIndoor : styles.popupImageOutdoor) : ""}`}>
              {hasImage && (
                <Image src={activeCourt.imageUrl!} alt={activeCourt.name} fill style={{ objectFit: "cover" }} sizes="300px" />
              )}
              <button className={styles.popupClose} onClick={onPopupClose}><X size={13} /></button>
              <span className={`${styles.popupTypeBadge} ${activeCourt.type === "INDOOR" ? styles.popupTypeBadgeIndoor : styles.popupTypeBadgeOutdoor}`}>
                {activeCourt.type === "INDOOR" ? "Indoor" : "Outdoor"}
              </span>
            </div>

            <button className={styles.popupBody} onClick={() => onCourtSelect(activeCourt)}>
              <div className={styles.popupVenue}>{selectedVenue.venueName}</div>
              <div className={styles.popupCourtName}>{activeCourt.name}</div>
              <div className={styles.popupFooter}>
                <span className={styles.popupSize}>{formatSize(activeCourt.size)}</span>
                {(() => {
                  const { text, hasPrice } = formatPrice(activeCourt);
                  return (
                    <span className={styles.popupPrice}>
                      {text}{!hasPrice && <span className={styles.popupPriceHint}> ($)</span>}
                    </span>
                  );
                })()}
              </div>
            </button>

            {total > 1 && (
              <div className={styles.carousel}>
                <button className={styles.carouselBtn} onClick={onCarouselPrev} disabled={carouselIndex === 0}><ChevronLeft size={13} /></button>
                <div className={styles.dots}>
                  {selectedVenue.courts.map((_, i) => (
                    <button key={i} className={`${styles.dot} ${i === carouselIndex ? styles.dotActive : ""}`} onClick={() => onDotClick(i)} />
                  ))}
                </div>
                <button className={styles.carouselBtn} onClick={onCarouselNext} disabled={carouselIndex === total - 1}><ChevronRight size={13} /></button>
              </div>
            )}
          </div>
        </Popup>
      )}
    </>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function MapView({ open, onClose, courtLocations, filteredCourts, onCourtSelect, onPinClick }: MapViewProps) {
  const { t } = useT();
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [swipeDir, setSwipeDir] = useState<"left" | "right">("left");
  const touchStartX = useRef<number>(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const venuePins = useMemo<VenuePin[]>(() => {
    const byVenue = new globalThis.Map<string, VenuePin>();
    courtLocations.forEach((loc) => {
      const court = filteredCourts.find((c) => c.id === loc.courtId);
      if (!court) return; // skip courts filtered out
      if (!byVenue.has(loc.venueId)) {
        byVenue.set(loc.venueId, { venueId: loc.venueId, venueName: loc.venueName, lat: loc.lat, lng: loc.lng, courts: [] });
      }
      byVenue.get(loc.venueId)!.courts.push(court);
    });
    return Array.from(byVenue.values());
  }, [courtLocations, filteredCourts]);


  const selectedVenue = useMemo(
    () => venuePins.find((v) => v.venueId === selectedVenueId) ?? null,
    [venuePins, selectedVenueId]
  );

  const handleMarkerClick = useCallback((venueId: string) => {
    setSelectedVenueId((prev) => (prev === venueId ? null : venueId));
    setCarouselIndex(0);
    onPinClick?.(venueId);
  }, [onPinClick]);

  const handlePopupClose = useCallback(() => {
    setSelectedVenueId(null);
    setCarouselIndex(0);
  }, []);

  const activeCourt   = selectedVenue?.courts[carouselIndex] ?? null;
  const total         = selectedVenue?.courts.length ?? 0;
  const hasImage      = isValidImageUrl(activeCourt?.imageUrl ?? null);

  return (
    <div className={`${styles.panel} ${open ? styles.panelOpen : ""}`}>
      {open && (
        <Map
          initialViewState={{ longitude: MONTREAL_CENTER.lng, latitude: MONTREAL_CENTER.lat, zoom: DEFAULT_ZOOM }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`}
          attributionControl={false}
        >
          <NavigationControl position="bottom-right" showCompass={false} />

          {/* Desktop: markers + floating popup */}
          {!isMobile ? (
            <DesktopPopup
              venuePins={venuePins}
              selectedVenueId={selectedVenueId}
              selectedVenue={selectedVenue}
              carouselIndex={carouselIndex}
              onMarkerClick={handleMarkerClick}
              onPopupClose={handlePopupClose}
              onCourtSelect={onCourtSelect}
              onCarouselPrev={() => setCarouselIndex((i) => Math.max(0, i - 1))}
              onCarouselNext={() => setCarouselIndex((i) => Math.min(total - 1, i + 1))}
              onDotClick={setCarouselIndex}
            />
          ) : (
            /* Mobile: markers only, no popup */
            venuePins.map((venue) => (
              <Marker
                key={venue.venueId}
                longitude={venue.lng}
                latitude={venue.lat}
                anchor="bottom"
                onClick={(e) => { e.originalEvent.stopPropagation(); handleMarkerClick(venue.venueId); }}
              >
                <div className={`${styles.marker} ${selectedVenueId === venue.venueId ? styles.markerActive : ""}`}>
                  {venue.courts.length > 1
                    ? <span className={styles.markerLabel}>{venue.courts.length}</span>
                    : <span className={styles.markerDot} />}
                </div>
              </Marker>
            ))
          )}
        </Map>
      )}

      {/* Mobile bottom card — lives outside <Map> */}
      {isMobile && (
        <div
          className={`${styles.mobileCard} ${selectedVenue && activeCourt ? styles.mobileCardVisible : ""}`}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(delta) > SWIPE_THRESHOLD_PX && total > 1) {
              if (delta < 0) {
                setSwipeDir("left");
                setCarouselIndex((i) => Math.min(total - 1, i + 1));
              } else {
                setSwipeDir("right");
                setCarouselIndex((i) => Math.max(0, i - 1));
              }
            }
          }}
        >
          {selectedVenue && activeCourt && (
            <>
              {/* Keyed row — image + info, animates on swipe */}
              <div
                key={carouselIndex}
                className={`${styles.mobileCardSlide} ${swipeDir === "left" ? styles.slideFromRight : styles.slideFromLeft}`}
              >
                <div className={`${styles.mobileCardImage} ${!hasImage ? (activeCourt.type === "INDOOR" ? styles.mobileImageIndoor : styles.mobileImageOutdoor) : ""}`}>
                  {hasImage && (
                    <Image src={activeCourt.imageUrl!} alt={activeCourt.name} fill style={{ objectFit: "cover" }} sizes="96px" />
                  )}
                  <span className={`${styles.popupTypeBadge} ${activeCourt.type === "INDOOR" ? styles.popupTypeBadgeIndoor : styles.popupTypeBadgeOutdoor}`}>
                    {activeCourt.type === "INDOOR" ? "Indoor" : "Outdoor"}
                  </span>
                </div>

                <div className={styles.mobileCardContent}>
                  <button className={styles.mobileCardInfo} onClick={() => onCourtSelect(activeCourt)}>
                    <span className={styles.mobileVenue}>{selectedVenue.venueName}</span>
                    <span className={styles.mobileCourtName}>{activeCourt.name}</span>
                    <span className={styles.mobileMeta}>
                      {formatSize(activeCourt.size)}
                      {(() => {
                        const { text, hasPrice } = formatPrice(activeCourt);
                        return (
                          <span className={styles.mobilePrice}>
                            {" · "}{text}{!hasPrice && <span className={styles.popupPriceHint}> ($)</span>}
                          </span>
                        );
                      })()}
                    </span>
                  </button>
                </div>
              </div>

              {/* Dots below the row — static, not animated */}
              {total > 1 && (
                <div className={styles.mobileDotsRow}>
                  {selectedVenue.courts.map((_, i) => (
                    <button
                      key={i}
                      className={`${styles.dot} ${styles.dotMobile} ${i === carouselIndex ? styles.dotActive : ""}`}
                      onClick={() => {
                        setSwipeDir(i > carouselIndex ? "left" : "right");
                        setCarouselIndex(i);
                      }}
                    />
                  ))}
                </div>
              )}

              <button className={styles.mobileCardClose} onClick={handlePopupClose}><X size={14} /></button>
            </>
          )}
        </div>
      )}

      <button className={styles.closeBtn} onClick={onClose}>
        {t.map.close}
        <ChevronsRight size={15} className={styles.closeBtnIcon} />
      </button>
    </div>
  );
}
