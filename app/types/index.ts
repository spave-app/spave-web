export type CourtSize = "THREE_V_THREE" | "FIVE_V_FIVE" | "SEVEN_V_SEVEN" | "NINE_V_NINE" | "FULL";
export type CourtType = "INDOOR" | "OUTDOOR";
export type CourtSurface = "SYNTHETIC" | "GRASS" | "HARDWOOD";
export type SortBy = "price_asc" | "price_desc" | "distance_asc" | "distance_desc" | "";

export interface Court {
  id: string;
  venueId: string;
  venue: Pick<Venue, "id" | "name" | "phone" | "phoneExtension" | "website" | "email" | "address">;
  name: string;
  description: string | null;
  size: CourtSize;
  type: CourtType;
  surface: CourtSurface;
  bookingLink: string;
  availabilityHint: string[];
  notes: string | null;
  active: boolean;
  numberAvailable: number;
  imageUrl: string | null;
  priceMin: number | null;
  priceMax: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  venueId: string;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  postalCode: string;
  neighborhood: string | null;
  lat: number;
  lng: number;
  isPrimary: boolean;
  province: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

export interface Venue {
  id: string;
  name: string;
  phone: string;
  website: string;
  description: string | null;
  source: string | null;
  isActive: boolean;
  email: string | null;
  phoneExtension: string | null;
  address: Address;
  createdAt: string;
  updatedAt: string;
}

export interface CourtLocation {
  courtId: string;
  venueId: string;
  venueName: string;
  lat: number;
  lng: number;
}

export interface Filters {
  search: string;
  sizes: CourtSize[];
  types: CourtType[];
  surfaces: CourtSurface[];
  priceMin: string;
  priceMax: string;
  sortBy: SortBy;
}
