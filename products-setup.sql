-- ADD PRODUCTS TABLE TO EXISTING SCHEMA

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT,
  description TEXT,
  blocks JSONB DEFAULT '[]'::jsonb,
  seo JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMP,
  locale TEXT DEFAULT 'is',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- RLS for products - same as pages
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published products"
ON products
FOR SELECT
USING (status = 'published');

CREATE POLICY "Editors can manage products"
ON products
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role IN ('editor', 'admin')
  )
);

-- Product categories (optional helper table)
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sample categories
INSERT INTO product_categories (name, slug, description)
VALUES 
  ('Fræ', 'frae', 'Hágæða fræ fyrir garða'),
  ('Áburður', 'aburður', 'Vistvænn áburður'),
  ('Varnarefni', 'varnarefni', 'Umhverfisvæn varnarefni'),
  ('Moltugerð', 'moltugerd', 'Moltugerðarvörur')
ON CONFLICT (slug) DO NOTHING;

-- Sample product
INSERT INTO products (slug, title, category, description, blocks, status, locale, seo)
VALUES (
  'vistvaenn-aburður-pro',
  'Vistvænn áburður Pro',
  'Áburður',
  'Hágæða vistvænn áburður fyrir heimilisgörðum',
  '[
    {
      "type": "hero",
      "data": {
        "heading": "Vistvænn áburður Pro",
        "text": "Hágæða næring fyrir garðinn þinn með 100% náttúrulegum innihaldsefnum",
        "image": "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1200",
        "imageAlt": "Vistvænn áburður",
        "ctaText": "Kaupa núna",
        "ctaLink": "/contact"
      }
    },
    {
      "type": "text",
      "data": "<h2>Um vöruna</h2><p>Þessi vistvæni áburður er hannaður fyrir garðyrkjumenn sem vilja bestu niðurstöður án þess að skaða umhverfið. Inniheldur 100% náttúruleg næringarefni sem styrkja plöntur og jarðveg.</p>"
    },
    {
      "type": "featureList",
      "data": [
        {
          "title": "100% náttúrulegur",
          "description": "Engin tilbúin efni. Eingöngu lífræn næringarefni úr sjálfbærum aðföngum."
        },
        {
          "title": "Fljótvirkt",
          "description": "Sjáanlegar niðurstöður innan 7-10 daga. Plöntur verða grænni og sterkari."
        },
        {
          "title": "Umhverfisvænt",
          "description": "Skaðar ekki jarðveg eða grunnvatn. Öruggt fyrir börn og gæludýr."
        }
      ]
    },
    {
      "type": "specsTable",
      "data": [
        { "label": "Næringarefni NPK", "value": "10-5-5" },
        { "label": "Magn", "value": "5 kg" },
        { "label": "Notkunarsvæði", "value": "50-100 m²" },
        { "label": "Geymsla", "value": "Þurrt og svalt" }
      ]
    },
    {
      "type": "cta",
      "data": {
        "text": "Pantaðu í dag og fáðu frían sendingargjald",
        "buttonText": "Hafa samband",
        "buttonLink": "/contact"
      }
    }
  ]'::jsonb,
  'published',
  'is',
  '{
    "title": "Vistvænn áburður Pro - Eco Garden",
    "description": "Hágæða vistvænn áburður með náttúrulegum innihaldsefnum. Fljótvirkt og öruggt fyrir umhverfið.",
    "image": "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1200"
  }'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- Product version history
CREATE TABLE IF NOT EXISTS product_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  blocks JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

-- Product analytics
CREATE TABLE IF NOT EXISTS product_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  slug TEXT,
  user_agent TEXT,
  country TEXT,
  device TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_product_versions_product_id ON product_versions(product_id);
CREATE INDEX IF NOT EXISTS idx_product_versions_created_at ON product_versions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_product_views_product_id ON product_views(product_id);
CREATE INDEX IF NOT EXISTS idx_product_views_slug ON product_views(slug);
CREATE INDEX IF NOT EXISTS idx_product_views_created_at ON product_views(created_at DESC);
