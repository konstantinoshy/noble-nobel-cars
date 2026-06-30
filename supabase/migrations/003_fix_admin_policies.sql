-- Migration: 003_fix_admin_policies
-- Description: Drop generic authenticated policies and replace with strict role-based policies checking for 'admin' claim in app_metadata.

-- ============================================================
-- Cars
-- ============================================================
drop policy "Admin full access cars" on cars;
create policy "Admin full access cars" on cars for all using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- Car Images
-- ============================================================
drop policy "Admin full access car_images" on car_images;
create policy "Admin full access car_images" on car_images for all using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- ============================================================
-- Inquiries
-- ============================================================
drop policy "Admin full access inquiries" on inquiries;
create policy "Admin full access inquiries" on inquiries for all using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
