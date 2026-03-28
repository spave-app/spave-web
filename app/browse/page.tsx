"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, SlidersHorizontal, Map } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import ScrollToTop from "../components/ScrollToTop";
import CourtCard from "./_components/CourtCard";
import FilterPanel from "./_components/FilterPanel";
import MapView from "./_components/MapView";
import type { Court, Filters } from "../types";
import styles from "./browse.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const DEFAULT_FILTERS: Filters = {
  search: "",
  sizes: [],
  types: [],
  surfaces: [],
  priceMin: "",
  priceMax: "",
  sortBy: "",
};

export default function Browse() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCourts() {
      try {
        const res = await fetch(`${API_URL}/courts`, { signal: controller.signal });
        if (!res.ok) throw new Error(`Failed to fetch courts: ${res.status}`);
        const data: Court[] = await res.json();
        setCourts(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("Error fetching courts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCourts();
    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => {
    let result = [...courts];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q));
    }
    if (filters.sizes.length > 0) {
      result = result.filter((c) => filters.sizes.includes(c.size));
    }
    if (filters.types.length > 0) {
      result = result.filter((c) => filters.types.includes(c.type));
    }
    if (filters.surfaces.length > 0) {
      result = result.filter((c) => filters.surfaces.includes(c.surface));
    }
    if (filters.priceMin) {
      result = result.filter((c) => c.priceMin !== null && c.priceMin >= Number(filters.priceMin));
    }
    if (filters.priceMax) {
      result = result.filter((c) => c.priceMax !== null && c.priceMax <= Number(filters.priceMax));
    }

    if (filters.sortBy === "price_asc") {
      result.sort((a, b) => (a.priceMin ?? 0) - (b.priceMin ?? 0));
    } else if (filters.sortBy === "price_desc") {
      result.sort((a, b) => (b.priceMin ?? 0) - (a.priceMin ?? 0));
    }

    return result;
  }, [courts, filters]);

  const activeFilterCount = [
    filters.sizes.length > 0,
    filters.types.length > 0,
    filters.surfaces.length > 0,
    filters.priceMin !== "",
    filters.priceMax !== "",
    filters.sortBy !== "",
  ].filter(Boolean).length;

  return (
    <>
      <Header />
      <ScrollToTop />
      <div className={`${styles.page} ${mapOpen ? styles.pageWithMap : ""}`}>
        <div className={styles.topBar}>
          <div className={styles.topBarInner}>
            <div className={styles.searchWrap}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by court or venue..."
                className={styles.searchInput}
                value={filters.search}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
              />
            </div>
            <div className={styles.topBtns}>
              <button
                className={`${styles.topBtn} ${filterOpen ? styles.topBtnActive : ""}`}
                onClick={() => setFilterOpen((v) => !v)}
              >
                <SlidersHorizontal size={15} />
                Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
              </button>
              <button
                className={`${styles.topBtn} ${styles.mapBtn} ${mapOpen ? styles.topBtnActive : ""}`}
                onClick={() => setMapOpen((v) => !v)}
              >
                <Map size={15} />
                Map
              </button>
            </div>
          </div>
        </div>

        <FilterPanel
          open={filterOpen}
          filters={filters}
          onFiltersChange={setFilters}
          onClose={() => setFilterOpen(false)}
          onReset={() => setFilters(DEFAULT_FILTERS)}
          resultCount={filtered.length}
        />

        <div className={styles.content}>
          <div className={styles.listings}>
            {loading ? (
              <Loading />
            ) : (
              <>
                <p className={styles.resultCount}>
                  {filtered.length} court{filtered.length !== 1 ? "s" : ""} found
                </p>
                <div className={`${styles.grid} ${mapOpen ? styles.gridWithMap : ""}`}>
                  {filtered.map((court) => (
                    <CourtCard key={court.id} court={court} />
                  ))}
                </div>
                {filtered.length === 0 && (
                  <p className={styles.empty}>No courts match your filters.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {mapOpen && <MapView onClose={() => setMapOpen(false)} />}
      <Footer />
    </>
  );
}
