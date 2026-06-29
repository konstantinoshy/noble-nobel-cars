-- Migration: 001_initial_schema
-- Description: Cars, car_images, inquiries tables with RLS policies

-- ============================================================
-- Tables
-- ============================================================

create table cars (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  make text not null,
  model text not null,
  year int not null,
  mileage_km int not null,
  fuel_type text check (fuel_type in ('petrol','diesel','hybrid','electric')),
  transmission text check (transmission in ('manual','automatic')),
  engine_cc int,
  color text,
  price_eur numeric not null,
  status text default 'available' check (status in ('available','reserved','sold')),
  description text,
  created_at timestamptz default now(),
  sold_at timestamptz
);

create table car_images (
  id uuid primary key default gen_random_uuid(),
  car_id uuid references cars(id) on delete cascade,
  url text not null,
  sort_order int default 0,
  is_primary boolean default false
);

create table inquiries (
  id uuid primary key default gen_random_uuid(),
  car_id uuid references cars(id) on delete set null,
  name text not null,
  phone text,
  email text,
  message text,
  consent_given boolean not null default false,
  status text default 'new' check (status in ('new','contacted','closed')),
  created_at timestamptz default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table cars enable row level security;
alter table car_images enable row level security;
alter table inquiries enable row level security;

-- Public read access
create policy "Public can read cars" on cars for select using (true);
create policy "Public can read car_images" on car_images for select using (true);

-- Public can submit inquiries (only with consent)
create policy "Public can insert inquiries" on inquiries for insert with check (consent_given = true);

-- Admin (authenticated) full access — tighten with a role check if you add multiple admins later
create policy "Admin full access cars" on cars for all using (auth.role() = 'authenticated');
create policy "Admin full access car_images" on car_images for all using (auth.role() = 'authenticated');
create policy "Admin full access inquiries" on inquiries for all using (auth.role() = 'authenticated');
