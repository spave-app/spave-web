"use client";

import type { Filters, CourtSize, CourtType, CourtSurface, SortBy } from "../../types";
import { useT } from "../../i18n/LanguageContext";
import styles from "./FilterPanel.module.css";

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

interface FilterPanelProps {
  open: boolean;
  filters: Filters;
  onFiltersChange: (f: Filters) => void;
  onClose: () => void;
  onReset: () => void;
  resultCount: number;
  hasLocation: boolean;
}

export default function FilterPanel({
  open,
  filters,
  onFiltersChange,
  onClose,
  onReset,
  resultCount,
  hasLocation,
}: FilterPanelProps) {
  const { t } = useT();
  const f = t.filter;

  const SIZES: { value: CourtSize; label: string }[] = [
    { value: "THREE_V_THREE", label: "3v3" },
    { value: "FIVE_V_FIVE", label: "5v5" },
    { value: "SEVEN_V_SEVEN", label: "7v7" },
    { value: "NINE_V_NINE", label: "9v9" },
    { value: "FULL", label: f.full },
  ];

  const TYPES: { value: CourtType; label: string }[] = [
    { value: "INDOOR", label: f.indoor },
    { value: "OUTDOOR", label: f.outdoor },
  ];

  const SURFACES: { value: CourtSurface; label: string }[] = [
    { value: "SYNTHETIC", label: f.synthetic },
    { value: "GRASS", label: f.grass },
    { value: "HARDWOOD", label: f.hardwood },
  ];

  const SORT_OPTIONS: { value: SortBy; label: string }[] = [
    { value: "price_asc", label: f.priceLowHigh },
    { value: "price_desc", label: f.priceHighLow },
    ...(hasLocation ? [
      { value: "distance_asc" as SortBy, label: f.distanceNearFar },
      { value: "distance_desc" as SortBy, label: f.distanceFarNear },
    ] : []),
  ];

  const update = (partial: Partial<Filters>) =>
    onFiltersChange({ ...filters, ...partial });

  return (
    <div className={`${styles.panel} ${open ? styles.panelOpen : ""}`}>
      <div className={styles.mobileHeader}>
        <span className={styles.mobileTitle}>{f.title}</span>
        <button className={styles.resetBtn} onClick={onReset}>{f.reset}</button>
      </div>

      <div className={styles.body}>
        <div className={styles.group}>
          <span className={styles.label}>{f.size}</span>
          <div className={styles.pills}>
            {SIZES.map((s) => (
              <button
                key={s.value}
                className={`${styles.pill} ${filters.sizes.includes(s.value) ? styles.pillActive : ""}`}
                onClick={() => update({ sizes: toggle(filters.sizes, s.value) })}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.group}>
          <span className={styles.label}>{f.type}</span>
          <div className={styles.pills}>
            {TYPES.map((type) => (
              <button
                key={type.value}
                className={`${styles.pill} ${filters.types.includes(type.value) ? styles.pillActive : ""}`}
                onClick={() => update({ types: toggle(filters.types, type.value) })}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.group}>
          <span className={styles.label}>{f.surface}</span>
          <div className={styles.pills}>
            {SURFACES.map((s) => (
              <button
                key={s.value}
                className={`${styles.pill} ${filters.surfaces.includes(s.value) ? styles.pillActive : ""}`}
                onClick={() => update({ surfaces: toggle(filters.surfaces, s.value) })}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.group}>
          <span className={styles.label}>{f.priceRange}</span>
          <div className={styles.priceRow}>
            <div className={styles.priceField}>
              <span className={styles.currency}>$</span>
              <input
                type="number"
                placeholder={f.min}
                className={styles.priceInput}
                value={filters.priceMin}
                onChange={(e) => update({ priceMin: e.target.value })}
                min={0}
              />
            </div>
            <span className={styles.priceSep}>–</span>
            <div className={styles.priceField}>
              <span className={styles.currency}>$</span>
              <input
                type="number"
                placeholder={f.max}
                className={styles.priceInput}
                value={filters.priceMax}
                onChange={(e) => update({ priceMax: e.target.value })}
                min={0}
              />
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.group}>
          <span className={styles.label}>{f.sort}</span>
          <div className={styles.pills}>
            {SORT_OPTIONS.map((s) => (
              <button
                key={s.value}
                className={`${styles.pill} ${filters.sortBy === s.value ? styles.pillActive : ""}`}
                onClick={() => update({ sortBy: filters.sortBy === s.value ? "" : s.value })}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <button className={`${styles.resetBtn} ${styles.desktopReset}`} onClick={onReset}>{f.resetShort}</button>
      </div>

      <div className={styles.mobileFooter}>
        <button className={styles.showBtn} onClick={onClose}>
          {f.showResults(resultCount)}
        </button>
      </div>
    </div>
  );
}
