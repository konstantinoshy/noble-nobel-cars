// ============================================================
// Database types — mirrors supabase/migrations/001_initial_schema.sql
// ============================================================

export type FuelType = "petrol" | "diesel" | "hybrid" | "electric";
export type Transmission = "manual" | "automatic";
export type CarStatus = "available" | "reserved" | "sold";
export type InquiryStatus = "new" | "contacted" | "closed";

// ---- Cars ----

export interface Car {
  id: string;
  slug: string;
  title: string;
  make: string;
  model: string;
  year: number;
  mileage_km: number;
  fuel_type: FuelType | null;
  transmission: Transmission | null;
  engine_cc: number | null;
  color: string | null;
  price_eur: number;
  status: CarStatus;
  description: string | null;
  created_at: string;
  sold_at: string | null;
}

export type CarInsert = Omit<Car, "id" | "created_at" | "status" | "sold_at"> &
  Partial<Pick<Car, "id" | "created_at" | "status" | "sold_at">>;

export type CarUpdate = Partial<Omit<Car, "id">>;

// ---- Car Images ----

export interface CarImage {
  id: string;
  car_id: string;
  url: string;
  sort_order: number;
  is_primary: boolean;
}

export type CarImageInsert = Omit<CarImage, "id" | "sort_order" | "is_primary"> &
  Partial<Pick<CarImage, "id" | "sort_order" | "is_primary">>;

export type CarImageUpdate = Partial<Omit<CarImage, "id">>;

// ---- Inquiries ----

export interface Inquiry {
  id: string;
  car_id: string | null;
  name: string;
  phone: string | null;
  email: string | null;
  message: string | null;
  consent_given: boolean;
  status: InquiryStatus;
  created_at: string;
}

export type InquiryInsert = Omit<Inquiry, "id" | "created_at" | "status"> &
  Partial<Pick<Inquiry, "id" | "created_at" | "status">>;

export type InquiryUpdate = Partial<Omit<Inquiry, "id">>;

// ---- Composite types (car + images) ----

export interface CarWithImages extends Car {
  car_images: CarImage[];
}
