-- Create products table if not exists
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  price DECIMAL(10,2),
  images TEXT[],
  gallery TEXT[],
  features TEXT[],
  specifications JSONB,
  seo JSONB,
  blocks JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add new columns to existing products table (if table already exists)
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
ADD COLUMN IF NOT EXISTS price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS images TEXT[],
ADD COLUMN IF NOT EXISTS gallery TEXT[],
ADD COLUMN IF NOT EXISTS features TEXT[],
ADD COLUMN IF NOT EXISTS specifications JSONB;

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view published products" ON products;
DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;

-- Allow public read access to published products
CREATE POLICY "Public can view published products"
  ON products FOR SELECT
  USING (status = 'published');

-- Allow authenticated users to manage products
CREATE POLICY "Authenticated users can manage products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated');

-- Sample product insert
INSERT INTO products (
  slug, 
  title, 
  description, 
  status,
  price,
  images,
  features,
  specifications
)
VALUES (
  'eco-garden-aburdar',
  'Eco Garden Áburður',
  'Umhverfisvænn áburður fyrir græna garða. Fullkomin blanda fyrir gras, tré og runna.',
  'published',
  4990.00,
  ARRAY[
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800'
  ],
  ARRAY[
    'Umhverfisvænn og lífrænn',
    'Hentar öllum tegundum garðs',
    'Auðvelt í notkun',
    'Langvarandi áhrif',
    'Inniheldur örbacteríur sem hjálpa plöntum'
  ],
  '{
    "Þyngd": "10 kg",
    "Magn": "Nægir fyrir 200m²",
    "NPK hlutföll": "10-5-5",
    "Uppruni": "Ísland",
    "Lífrænni vottaður": "Já",
    "Geymsluþol": "2 ár"
  }'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  features = EXCLUDED.features,
  specifications = EXCLUDED.specifications;

-- Another sample product
INSERT INTO products (
  slug, 
  title, 
  description, 
  status,
  price,
  images,
  features,
  specifications
)
VALUES (
  'gras-frae-premium',
  'Premium Grasfræ',
  'Hágæða grasfræ fyrir íslenskt veðurfar. Þolir vel íslenska vetrarstíð og vex hratt.',
  'published',
  7990.00,
  ARRAY[
    'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800',
    'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'
  ],
  ARRAY[
    'Sérstaklega valið fyrir íslenskt veðurfar',
    'Þolir frost og rok',
    'Vex hratt og þétt',
    'Hentar fyrir heimilisgörðum',
    'Sáning á vorin eða haustin'
  ],
  '{
    "Þyngd": "5 kg",
    "Magn": "Nægir fyrir 150m²",
    "Tegundir": "Rýgresi, Vallarsveifgras",
    "Spírun": "7-14 dagar",
    "Uppruni": "Holland",
    "Lífrænn": "Nei"
  }'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  images = EXCLUDED.images,
  features = EXCLUDED.features,
  specifications = EXCLUDED.specifications;
