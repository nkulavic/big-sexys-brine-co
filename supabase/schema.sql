-- Big Sexy's Brine Co. — Supabase Schema
-- Run this in the Supabase SQL Editor to set up your database

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  size TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  ingredients TEXT[] NOT NULL DEFAULT '{}',
  heat INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL CHECK (category IN ('Signature', 'Non-Spicy', 'Spicy', 'Garlic', 'Sweet Heat', 'Traditional', 'Specialty')),
  image_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  location TEXT NOT NULL,
  address TEXT,
  type TEXT NOT NULL CHECK (type IN ('market', 'festival', 'pop-up', 'class')),
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  product TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Class info table (single row)
CREATE TABLE IF NOT EXISTS class_info (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  duration TEXT NOT NULL,
  description TEXT NOT NULL,
  what_you_learn TEXT[] NOT NULL DEFAULT '{}',
  what_you_get TEXT[] NOT NULL DEFAULT '{}',
  max_students INTEGER NOT NULL DEFAULT 12
);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  alt TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Updated_at trigger for products
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Public read access (for the website)
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read class_info" ON class_info FOR SELECT USING (true);
CREATE POLICY "Public read gallery_images" ON gallery_images FOR SELECT USING (true);

-- Authenticated users get full CRUD
CREATE POLICY "Admin insert products" ON products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update products" ON products FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete products" ON products FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert events" ON events FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update events" ON events FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete events" ON events FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin insert testimonials" ON testimonials FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update testimonials" ON testimonials FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete testimonials" ON testimonials FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin update class_info" ON class_info FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin insert class_info" ON class_info FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Admin insert gallery_images" ON gallery_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin update gallery_images" ON gallery_images FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete gallery_images" ON gallery_images FOR DELETE TO authenticated USING (true);

-- Storage bucket for images
-- Run this separately in the Supabase dashboard or via the API:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);
