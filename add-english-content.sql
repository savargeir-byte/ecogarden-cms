-- Add English language support to existing content

-- Update pages table to add language column if not exists
ALTER TABLE pages ADD COLUMN IF NOT EXISTS language VARCHAR(2) DEFAULT 'is';

-- Set existing pages to Icelandic
UPDATE pages SET language = 'is' WHERE language IS NULL;

-- Create English home page (only if it doesn't exist)
INSERT INTO pages (slug, title, status, language, created_at)
SELECT 'home-en', 'Home', 'published', 'en', NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM pages WHERE slug = 'home-en'
);

-- Get the English home page ID
DO $$
DECLARE
  en_home_id uuid;
  is_home_id uuid;
BEGIN
  SELECT id INTO en_home_id FROM pages WHERE slug = 'home-en' LIMIT 1;
  SELECT id INTO is_home_id FROM pages WHERE slug = 'home' AND language = 'is' LIMIT 1;

  -- Hero Section
  INSERT INTO sections (page_id, type, position, content, created_at)
  VALUES (
    en_home_id,
    'hero',
    1,
    jsonb_build_object(
      'heading', 'Sustainable Garden Solutions',
      'subheading', 'Design, cultivation, and quality products for Icelandic conditions',
      'image', 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1920&q=80',
      'cta', jsonb_build_object(
        'text', 'Get a Quote',
        'link', '/contact'
      )
    ),
    NOW()
  );

  -- Image Grid / Categories
  INSERT INTO sections (page_id, type, position, content, created_at)
  VALUES (
    en_home_id,
    'imageGrid',
    2,
    jsonb_build_object(
      'heading', 'Our Services',
      'items', jsonb_build_array(
        jsonb_build_object(
          'title', 'Garden Design',
          'subtitle', 'Complete solutions from concept to reality',
          'image', 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80',
          'link', '/products?category=design',
          'subcategories', jsonb_build_array('Site Survey', 'Garden Design', 'Plant Selection', 'Blueprints')
        ),
        jsonb_build_object(
          'title', 'Cultivation',
          'subtitle', 'Everything for professional growing',
          'image', 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80',
          'link', '/products?category=cultivation',
          'subcategories', jsonb_build_array('Seeds', 'Rockwool', 'Soil', 'Fertilizer', 'Pots')
        ),
        jsonb_build_object(
          'title', 'Garden Products',
          'subtitle', 'Tools and equipment that last',
          'image', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
          'link', '/products?category=products',
          'subcategories', jsonb_build_array('Garden Tools', 'Machinery', 'Hoses', 'Furniture', 'Decor')
        )
      )
    ),
    NOW()
  );

  -- Features Section
  INSERT INTO sections (page_id, type, position, content, created_at)
  VALUES (
    en_home_id,
    'features',
    3,
    jsonb_build_object(
      'heading', 'Why Choose Eco Garden',
      'items', jsonb_build_array(
        jsonb_build_object(
          'icon', '🌱',
          'title', 'Sustainable Solutions',
          'description', 'All our solutions are designed with sustainability in mind'
        ),
        jsonb_build_object(
          'icon', '⚡',
          'title', 'Fast Delivery',
          'description', 'We deliver quickly throughout Iceland'
        ),
        jsonb_build_object(
          'icon', '💚',
          'title', 'Expert Advice',
          'description', 'Over 20 years of experience in Icelandic horticulture'
        )
      )
    ),
    NOW()
  );

  -- CTA Section
  INSERT INTO sections (page_id, type, position, content, created_at)
  VALUES (
    en_home_id,
    'cta',
    4,
    jsonb_build_object(
      'heading', 'Ready to Start?',
      'description', 'Get free consultation from professionals',
      'buttonText', 'Get a Quote',
      'buttonLink', '/contact'
    ),
    NOW()
  );

END $$;
