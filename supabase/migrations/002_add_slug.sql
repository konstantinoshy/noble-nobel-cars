-- Migration: 002_add_slug
-- Description: Add slug column to cars table for SEO-friendly URLs

alter table cars add column slug text unique;
create index idx_cars_slug on cars(slug);
