-- Migration: Add sort_order columns to products, events, and testimonials
-- This enables drag-and-drop reordering in the admin interface

-- Add sort_order column to products
ALTER TABLE products ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0;

-- Add sort_order column to events
ALTER TABLE events ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0;

-- Add sort_order column to testimonials
ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0;

-- Initialize sort_order based on existing id order for products
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY id) - 1 AS rn FROM products
)
UPDATE products SET sort_order = numbered.rn FROM numbered WHERE products.id = numbered.id;

-- Initialize sort_order based on existing id order for events
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY id) - 1 AS rn FROM events
)
UPDATE events SET sort_order = numbered.rn FROM numbered WHERE events.id = numbered.id;

-- Initialize sort_order based on existing id order for testimonials
WITH numbered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY id) - 1 AS rn FROM testimonials
)
UPDATE testimonials SET sort_order = numbered.rn FROM numbered WHERE testimonials.id = numbered.id;

-- Create indexes for efficient ordering queries
CREATE INDEX IF NOT EXISTS idx_products_sort_order ON products (sort_order);
CREATE INDEX IF NOT EXISTS idx_events_sort_order ON events (sort_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_sort_order ON testimonials (sort_order);
