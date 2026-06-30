import { createClient } from "@/lib/supabase/server";
import type { Car, CarWithImages } from "@/lib/types/database";

// ---- Types for filter params ----

export interface CarFilters {
  make?: string;
  model?: string;
  body_type?: string;
  color?: string;
  fuel_type?: string;
  transmission?: string;
  year_from?: number;
  year_to?: number;
  price_from?: number;
  price_to?: number;
  mileage_from?: number;
  mileage_to?: number;
  engine_cc_from?: number;
  engine_cc_to?: number;
  hp_from?: number;
  hp_to?: number;
  sort?:
    | "last_modified"
    | "price_asc"
    | "price_desc"
    | "registration"
    | "year_desc"
    | "year_asc"
    | "make_model"
    | "mileage_desc"
    | "mileage_asc"
    | "hp_desc"
    | "hp_asc";
}

export interface CarWithPrimaryImage extends Car {
  primary_image_url: string | null;
}

// ---- Queries ----

/**
 * Fetch featured / recent available cars with their primary image.
 */
export async function getFeaturedCars(
  limit: number = 6
): Promise<CarWithPrimaryImage[]> {
  const supabase = createClient();

  const { data: cars, error } = await supabase
    .from("cars")
    .select("*, car_images!inner(url)")
    .eq("status", "available")
    .eq("car_images.is_primary", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !cars) {
    // Fallback: try without inner join (cars without primary image)
    const { data: fallback } = await supabase
      .from("cars")
      .select("*, car_images(url, is_primary)")
      .eq("status", "available")
      .order("created_at", { ascending: false })
      .limit(limit);

    return (fallback || []).map((car) => ({
      ...car,
      primary_image_url: getPrimaryUrl(car.car_images),
      car_images: undefined,
    })) as CarWithPrimaryImage[];
  }

  return cars.map((car) => ({
    ...car,
    primary_image_url: car.car_images?.[0]?.url ?? null,
    car_images: undefined,
  })) as CarWithPrimaryImage[];
}

/**
 * Fetch available cars with optional filters, with primary image.
 */
export async function getFilteredCars(
  filters: CarFilters = {}
): Promise<CarWithPrimaryImage[]> {
  const supabase = createClient();

  let query = supabase
    .from("cars")
    .select("*, car_images(url, is_primary)")
    .eq("status", "available");

  // Apply filters
  if (filters.make) query = query.eq("make", filters.make);
  if (filters.model) query = query.ilike("model", `%${filters.model}%`);
  if (filters.body_type) query = query.eq("body_type", filters.body_type);
  if (filters.color) query = query.ilike("color", `%${filters.color}%`);
  if (filters.fuel_type) query = query.eq("fuel_type", filters.fuel_type);
  if (filters.transmission) query = query.eq("transmission", filters.transmission);
  if (filters.year_from) query = query.gte("year", filters.year_from);
  if (filters.year_to) query = query.lte("year", filters.year_to);
  if (filters.price_from) query = query.gte("price_eur", filters.price_from);
  if (filters.price_to) query = query.lte("price_eur", filters.price_to);
  if (filters.mileage_from) query = query.gte("mileage_km", filters.mileage_from);
  if (filters.mileage_to) query = query.lte("mileage_km", filters.mileage_to);
  if (filters.engine_cc_from) query = query.gte("engine_cc", filters.engine_cc_from);
  if (filters.engine_cc_to) query = query.lte("engine_cc", filters.engine_cc_to);
  if (filters.hp_from) query = query.gte("horsepower", filters.hp_from);
  if (filters.hp_to) query = query.lte("horsepower", filters.hp_to);

  // Apply sorting
  switch (filters.sort) {
    case "price_asc":
      query = query.order("price_eur", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price_eur", { ascending: false });
      break;
    case "registration":
      query = query.order("created_at", { ascending: false });
      break;
    case "year_desc":
      query = query.order("year", { ascending: false });
      break;
    case "year_asc":
      query = query.order("year", { ascending: true });
      break;
    case "make_model":
      query = query.order("make", { ascending: true }).order("model", { ascending: true });
      break;
    case "mileage_desc":
      query = query.order("mileage_km", { ascending: false });
      break;
    case "mileage_asc":
      query = query.order("mileage_km", { ascending: true });
      break;
    case "hp_desc":
      query = query.order("horsepower", { ascending: false });
      break;
    case "hp_asc":
      query = query.order("horsepower", { ascending: true });
      break;
    case "last_modified":
    default:
      // using created_at as fallback for last_modified since we don't have updated_at
      query = query.order("created_at", { ascending: false });
      break;
  }

  const { data, error } = await query;

  if (error || !data) return [];

  return data.map((car) => ({
    ...car,
    primary_image_url: getPrimaryUrl(car.car_images),
    car_images: undefined,
  })) as CarWithPrimaryImage[];
}

/**
 * Fetch a single car by slug with all images.
 */
export async function getCarBySlug(
  slug: string
): Promise<CarWithImages | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("cars")
    .select("*, car_images(*)")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  // Sort images by sort_order
  const images = (data.car_images || []).sort(
    (a: { sort_order: number }, b: { sort_order: number }) =>
      a.sort_order - b.sort_order
  );

  return { ...data, car_images: images } as CarWithImages;
}

/**
 * Get distinct makes from available cars (for filter dropdown).
 */
export async function getAvailableMakes(): Promise<string[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("cars")
    .select("make")
    .eq("status", "available")
    .order("make");

  if (error || !data) return [];

  // Deduplicate
  return Array.from(new Set(data.map((row) => row.make)));
}

// ---- Helpers ----

function getPrimaryUrl(
  images: Array<{ url: string; is_primary?: boolean }> | null
): string | null {
  if (!images || images.length === 0) return null;
  const primary = images.find((img) => img.is_primary);
  return primary?.url ?? images[0]?.url ?? null;
}

/**
 * Format a number with dot separators (European style).
 * e.g., 125000 → "125.000"
 */
export function formatNumber(n: number): string {
  return n.toLocaleString("el-GR");
}

/**
 * Format price in EUR.
 * e.g., 15900 → "15.900 €"
 */
export function formatPrice(price: number): string {
  return `${formatNumber(price)} €`;
}

/**
 * Format mileage.
 * e.g., 125000 → "125.000 km"
 */
export function formatMileage(km: number): string {
  return `${formatNumber(km)} km`;
}
