"use client";

import type { Filters, CourtSize, CourtType, CourtSurface, SortBy } from "../../types";
import styles from "./FilterPanel.module.css";

const SIZES: { value: CourtSize; label: string }[] = [
  { value: "THREE_V_THREE", label: "3v3" },
  { value: "FIVE_V_FIVE", label: "5v5" },
  { value: "SEVEN_V_SEVEN", label: "7v7" },
  { value: "NINE_V_NINE", label: "9v9" },
  { value: "FULL", label: "Full" },
];

const TYPES: { value: CourtType; label: string }[] = [
  { value: "INDOOR", label: "Indoor" },
  { value: "OUTDOOR", label: "Outdoor" },
];

const SURFACES: { value: CourtSurface; label: string }[] = [
  { value: "SYNTHETIC", label: "Synthetic" },
  { value: "GRASS", label: "Grass" },
  { value: "HARDWOOD", label: "Hardwood" },
];

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
];

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
}

export default function FilterPanel({
  open,
  filters,
  onFiltersChange,
  onClose,
  onReset,
  resultCount,
}: FilterPanelProps) {
  const update = (partial: Partial<Filters>) =>
    onFiltersChange({ ...filters, ...partial });

  return (
    <div className={`${styles.panel} ${open ? styles.panelOpen : ""}`}>
      {/* Mobile only header */}
      <div className={styles.mobileHeader}>
        <span className={styles.mobileTitle}>Filter</span>
        <button className={styles.resetBtn} onClick={onReset}>Reset filters</button>
      </div>

      <div className={styles.body}>
        <div className={styles.group}>
          <span className={styles.label}>Size</span>
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
          <span className={styles.label}>Type</span>
          <div className={styles.pills}>
            {TYPES.map((t) => (
              <button
                key={t.value}
                className={`${styles.pill} ${filters.types.includes(t.value) ? styles.pillActive : ""}`}
                onClick={() => update({ types: toggle(filters.types, t.value) })}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.group}>
          <span className={styles.label}>Surface</span>
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
          <span className={styles.label}>Price range</span>
          <div className={styles.priceRow}>
            <div className={styles.priceField}>
              <span className={styles.currency}>$</span>
              <input
                type="number"
                placeholder="Min"
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
                placeholder="Max"
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
          <span className={styles.label}>Sort</span>
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

        {/* Desktop only — hidden on mobile */}
        <button className={`${styles.resetBtn} ${styles.desktopReset}`} onClick={onReset}>Reset</button>
      </div>

      {/* Mobile only footer */}
      <div className={styles.mobileFooter}>
        <button className={styles.showBtn} onClick={onClose}>
          Show {resultCount} result{resultCount !== 1 ? "s" : ""}
        </button>
      </div>
    </div>
  );
}
