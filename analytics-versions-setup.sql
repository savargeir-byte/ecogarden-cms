-- Products table (if not exists)
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  subtitle text,
  image text,
  slug text UNIQUE,
  category text,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id),
  page_slug text,
  event text,
  created_at timestamptz DEFAULT now()
);

-- Section versions table (for rollback)
CREATE TABLE IF NOT EXISTS section_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid REFERENCES sections(id),
  content jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_versions ENABLE ROW LEVEL SECURITY;

-- Products policies
CREATE POLICY "Allow public products select" ON products
  FOR SELECT TO anon USING (published = true);

CREATE POLICY "Allow authenticated products all" ON products
  FOR ALL TO authenticated USING (true);

-- Analytics policies
CREATE POLICY "Allow public analytics insert" ON analytics
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated analytics select" ON analytics
  FOR SELECT TO authenticated USING (true);

-- Versions policies
CREATE POLICY "Allow authenticated versions" ON section_versions
  FOR ALL TO authenticated USING (true);
