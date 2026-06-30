-- Migration: 004_add_horsepower_bodytype
-- Description: Adds horsepower and body_type to cars table for extended filtering

ALTER TABLE cars
ADD COLUMN horsepower int,
ADD COLUMN body_type text;
