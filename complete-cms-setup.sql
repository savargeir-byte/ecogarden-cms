-- Complete CMS Schema Setup
-- Run this FIRST before analytics setup

-- Pages table
CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Sections table (single source of truth)
CREATE TABLE IF NOT EXISTS sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid REFERENCES pages(id) ON DELETE CASCADE,
  type text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  position int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products table
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
  section_id uuid REFERENCES sections(id) ON DELETE CASCADE,
  content jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_versions ENABLE ROW LEVEL SECURITY;

-- Pages policies
CREATE POLICY "Allow public pages select" ON pages
  FOR SELECT TO anon USING (status = 'published');

CREATE POLICY "Allow authenticated pages all" ON pages
  FOR ALL TO authenticated USING (true);

-- Sections policies
CREATE POLICY "Allow public sections select" ON sections
  FOR SELECT TO anon USING (
    EXISTS (
      SELECT 1 FROM pages 
      WHERE pages.id = sections.page_id 
      AND pages.status = 'published'
    )
  );

CREATE POLICY "Allow authenticated sections all" ON sections
  FOR ALL TO authenticated USING (true);

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

-- Insert default home page
INSERT INTO pages (slug, title, status)
VALUES ('home', 'Home', 'published')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample hero section
INSERT INTO sections (page_id, type, content, position)
SELECT 
  (SELECT id FROM pages WHERE slug = 'home'),
  'hero',
  '{"heading": "Welcome to EcoGarden", "subheading": "Sustainable gardening solutions", "ctaText": "Get Started", "ctaLink": "/products"}',
  0
WHERE NOT EXISTS (
  SELECT 1 FROM sections 
  WHERE page_id = (SELECT id FROM pages WHERE slug = 'home')
);
