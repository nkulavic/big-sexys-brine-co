-- Create product_images table for multi-image gallery
CREATE TABLE IF NOT EXISTS product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for fast lookups
CREATE INDEX idx_product_images_product_id ON product_images(product_id);

-- Enable RLS
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access" ON product_images FOR SELECT USING (true);

-- Allow authenticated users full access
CREATE POLICY "Authenticated users can manage product images" ON product_images
  FOR ALL USING (auth.role() = 'authenticated');
