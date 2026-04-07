import type { CourtSize, CourtSurface } from "@/app/types";

export function isValidImageUrl(url: string | null): url is string {
  if (!url) return false;
  try {
    const { protocol } = new URL(url);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

export function formatSize(size: CourtSize, labels: { full: string }): string {
  const map: Record<CourtSize, string> = {
    THREE_V_THREE: "3v3",
    FIVE_V_FIVE: "5v5",
    SEVEN_V_SEVEN: "7v7",
    NINE_V_NINE: "9v9",
    FULL: labels.full,
  };
  return map[size] ?? size;
}

export function formatSurface(surface: CourtSurface, labels: { synthetic: string; grass: string; hardwood: string }): string {
  const map: Record<CourtSurface, string> = {
    SYNTHETIC: labels.synthetic,
    GRASS: labels.grass,
    HARDWOOD: labels.hardwood,
  };
  return map[surface] ?? surface;
}

export function formatPrice(
  priceMin: number | null,
  priceMax: number | null,
  labels: {
    fromPrice: (n: number) => string;
    upToPrice: (n: number) => string;
    contactVenue: string;
  }
): string {
  if (priceMin !== null && priceMax !== null) {
    if (priceMin === priceMax) return `$${priceMin}`;
    return `$${priceMin} – $${priceMax}`;
  }
  if (priceMin !== null) return labels.fromPrice(priceMin);
  if (priceMax !== null) return labels.upToPrice(priceMax);
  return labels.contactVenue;
}
