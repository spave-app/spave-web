"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { Search, SlidersHorizontal, Map } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Loading from "@/app/components/Loading";
import ScrollToTop from "@/app/components/ScrollToTop";
import CourtCard from "@/app/browse/_components/CourtCard";
import CtaBanner from "@/app/browse/_components/CtaBanner";
import FilterPanel from "@/app/browse/_components/FilterPanel";
import CourtModal from "@/app/browse/_components/CourtModal";

const MapView = dynamic(() => import("@/app/browse/_components/MapView"), { ssr: false });
import { useT } from "@/app/i18n/LanguageContext";
import type { Court, CourtLocation, Filters } from "@/app/types";
import { haversineKm, formatDistance } from "@/app/utils/haversine";
import styles from "@/app/browse/browse.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const SEARCH_DEBOUNCE_MS = 200;

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
  const [fetchError, setFetchError] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [courtLocations, setCourtLocations] = useState<CourtLocation[]>([]);
  const [userPosition, setUserPosition] = useState<{ lat: number; lng: number } | null>(null);
  const { t } = useT();

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setUserPosition(null)
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filters.search), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [filters.search]);

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
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    }

    async function fetchCourtLocations() {
      try {
        const res = await fetch(`${API_URL}/courts/locations`);
        if (!res.ok) throw new Error(`Failed to fetch locations: ${res.status}`);
        setCourtLocations(await res.json());
      } catch (err) {
        console.error("Error fetching court locations:", err);
      }
    }

    fetchCourts();
    fetchCourtLocations();
    return () => controller.abort();
  }, []);

  const venueCoords = useMemo(() => {
    const map: Record<string, { lat: number; lng: number }> = {};
    courtLocations.forEach((l) => { map[l.venueId] = { lat: l.lat, lng: l.lng }; });
    return map;
  }, [courtLocations]);

  const getDistance = useCallback((court: Court): string | null => {
    if (!userPosition) return null;
    const coords = venueCoords[court.venue.id];
    if (!coords) return null;
    return formatDistance(haversineKm(userPosition.lat, userPosition.lng, coords.lat, coords.lng));
  }, [userPosition, venueCoords]);

  const filtered = useMemo(() => {
    let result = [...courts];

    if (debouncedSearch) {
      const tokens = debouncedSearch.toLowerCase().split(/\s+/).filter(Boolean);
      result = result.filter((c) => {
        const fields = [
          c.name,
          c.venue.name,
          c.description ?? "",
          c.type.toLowerCase(),
          c.surface.toLowerCase(),
        ].map((f) => f.toLowerCase());
        return tokens.every((token) => fields.some((field) => field.includes(token)));
      });
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
    } else if (userPosition && (filters.sortBy === "distance_asc" || filters.sortBy === "distance_desc")) {
      const getDist = (c: Court) => {
        const coords = venueCoords[c.venue.id];
        return coords ? haversineKm(userPosition.lat, userPosition.lng, coords.lat, coords.lng) : Infinity;
      };
      result.sort((a, b) => filters.sortBy === "distance_asc"
        ? getDist(a) - getDist(b)
        : getDist(b) - getDist(a));
    }

    return result;
  }, [courts, filters, debouncedSearch, userPosition, venueCoords]);

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
                placeholder={t.browse.searchPlaceholder}
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
                {t.browse.filter}{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
              </button>
              <button
                className={`${styles.topBtn} ${styles.mapBtn} ${mapOpen ? styles.topBtnActive : ""}`}
                onClick={() => setMapOpen((v) => !v)}
              >
                <Map size={15} />
                {t.browse.map}
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
          hasLocation={!!userPosition}
        />

        <div className={styles.content}>
          <div className={styles.listings}>
            {loading ? (
              <Loading />
            ) : (
              <>
                {fetchError ? (
                  <p className={styles.empty}>{t.browse.fetchError}</p>
                ) : (
                  <>
                    <CtaBanner />
                    <p className={styles.resultCount}>
                      {t.browse.courtsFound(filtered.length)}
                      <span className={styles.resultDisclaimer}> · {t.browse.priceDisclaimer}</span>
                    </p>
                    <div className={`${styles.grid} ${mapOpen ? styles.gridWithMap : ""}`}>
                      {filtered.map((court, i) => (
                        <div key={court.id} id={`court-card-${court.id}`}>
                          <CourtCard
                            court={court}
                            onClick={() => setSelectedCourt(court)}
                            distance={getDistance(court)}
                            priority={i === 0}
                          />
                        </div>
                      ))}
                    </div>
                    {filtered.length === 0 && (
                      <p className={styles.empty}>{t.browse.noResults}</p>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <MapView
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        courtLocations={courtLocations}
        filteredCourts={filtered}
        onCourtSelect={(court) => { setSelectedCourt(court); }}
        onPinClick={(venueId) => {
          if (window.innerWidth <= 1024) return;
          const venueLocs = courtLocations.filter((l) => l.venueId === venueId);
          const court = filtered.find((c) => venueLocs.some((l) => l.courtId === c.id));
          if (!court) return;
          document.getElementById(`court-card-${court.id}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }}
      />
      {selectedCourt && (
        <CourtModal court={selectedCourt} onClose={() => setSelectedCourt(null)} />
      )}
      <Footer />
    </>
  );
}
