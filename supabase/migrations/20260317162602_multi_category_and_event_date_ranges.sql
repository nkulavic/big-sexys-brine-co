-- Migration: Multi-category products + Event date ranges
-- 1. Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create product_categories junction table
CREATE TABLE IF NOT EXISTS product_categories (
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

-- 3. Seed categories from existing product category values
INSERT INTO categories (name, slug, sort_order)
SELECT DISTINCT category, LOWER(REPLACE(category, ' ', '-')), 0
FROM products
ON CONFLICT (name) DO NOTHING;

-- Set sort_order for seeded categories
UPDATE categories SET sort_order = 0 WHERE name = 'Signature';
UPDATE categories SET sort_order = 1 WHERE name = 'Non-Spicy';
UPDATE categories SET sort_order = 2 WHERE name = 'Spicy';
UPDATE categories SET sort_order = 3 WHERE name = 'Garlic';
UPDATE categories SET sort_order = 4 WHERE name = 'Sweet Heat';
UPDATE categories SET sort_order = 5 WHERE name = 'Traditional';
UPDATE categories SET sort_order = 6 WHERE name = 'Specialty';

-- 4. Migrate existing product->category relationships to junction table
INSERT INTO product_categories (product_id, category_id)
SELECT p.id, c.id
FROM products p
JOIN categories c ON c.name = p.category
ON CONFLICT DO NOTHING;

-- 5. Add event date range columns
ALTER TABLE events ADD COLUMN IF NOT EXISTS end_date DATE;
ALTER TABLE events ADD COLUMN IF NOT EXISTS is_recurring BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE events ADD COLUMN IF NOT EXISTS recurrence_day TEXT;
-- recurrence_day stores the day of week for recurring events, e.g. 'Saturday'

-- 6. RLS policies for new tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Admin insert categories" ON categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update categories" ON categories FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete categories" ON categories FOR DELETE TO authenticated USING (true);

CREATE POLICY "Public read product_categories" ON product_categories FOR SELECT USING (true);
CREATE POLICY "Admin insert product_categories" ON product_categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin delete product_categories" ON product_categories FOR DELETE TO authenticated USING (true);

-- 7. Indexes
CREATE INDEX IF NOT EXISTS idx_product_categories_product ON product_categories(product_id);
CREATE INDEX IF NOT EXISTS idx_product_categories_category ON product_categories(category_id);
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON categories(sort_order);
