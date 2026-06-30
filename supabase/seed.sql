-- Seed data for Noble Nobel Cars

INSERT INTO cars (id, title, make, model, year, mileage_km, fuel_type, transmission, engine_cc, color, price_eur, status, slug, description, horsepower, body_type)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'BMW 320i M Sport', 'BMW', '320i', 2020, 45000, 'petrol', 'automatic', 1998, 'Alpine White', 32500, 'available', 'bmw-320i-2020', 'Pristine condition BMW 320i M Sport. Full service history at authorized dealer. Features include M Sport package, adaptive LED headlights, and Harman Kardon surround sound system.', 184, 'sedan'),
  ('22222222-2222-2222-2222-222222222222', 'Audi A4 35 TDI S line', 'Audi', 'A4', 2021, 38000, 'diesel', 'automatic', 1968, 'Daytona Gray', 34900, 'available', 'audi-a4-2021', 'Excellent Audi A4 S line. One owner, non-smoker. Virtual cockpit, matrix LED headlights, and sports suspension. Very economical yet powerful.', 163, 'sedan'),
  ('33333333-3333-3333-3333-333333333333', 'Mercedes-Benz C 300 e', 'Mercedes-Benz', 'C-Class', 2022, 22000, 'hybrid', 'automatic', 1999, 'Obsidian Black', 45000, 'available', 'mercedes-c300e-2022', 'Like new C 300 e Plug-in Hybrid. Amazing fuel economy with 100km electric range. Premium Plus package, panoramic roof, Burmester audio.', 313, 'sedan'),
  ('44444444-4444-4444-4444-444444444444', 'Toyota Yaris 1.5 Hybrid', 'Toyota', 'Yaris', 2019, 65000, 'hybrid', 'automatic', 1490, 'Tokyo Red', 16500, 'available', 'toyota-yaris-2019', 'Reliable and extremely efficient Toyota Yaris Hybrid. Perfect city car. Features rearview camera, lane assist, and Apple CarPlay.', 100, 'hatchback'),
  ('55555555-5555-5555-5555-555555555555', 'Tesla Model 3 Long Range', 'Tesla', 'Model 3', 2023, 15000, 'electric', 'automatic', null, 'Pearl White Multi-Coat', 48900, 'reserved', 'tesla-model-3-2023', 'Stunning Tesla Model 3 Long Range. Includes Enhanced Autopilot, premium white interior, and 19" Nova wheels. Battery health 100%.', 498, 'sedan');

INSERT INTO car_images (car_id, url, sort_order, is_primary)
VALUES
  ('11111111-1111-1111-1111-111111111111', '/mock-cars/bmw.svg', 1, true),
  ('11111111-1111-1111-1111-111111111111', '/mock-cars/bmw-2.svg', 2, false),
  ('22222222-2222-2222-2222-222222222222', '/mock-cars/audi.svg', 1, true),
  ('33333333-3333-3333-3333-333333333333', '/mock-cars/mercedes.svg', 1, true),
  ('44444444-4444-4444-4444-444444444444', '/mock-cars/toyota.svg', 1, true),
  ('55555555-5555-5555-5555-555555555555', '/mock-cars/tesla.svg', 1, true);
