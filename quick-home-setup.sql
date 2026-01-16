-- Quick Home Page Setup for WYSIWYG CMS
-- Run this in Supabase SQL Editor

-- First, make sure the home page exists
INSERT INTO pages (slug, title, status, locale)
VALUES ('home', 'Eco Garden', 'published', 'is')
ON CONFLICT (slug) DO UPDATE 
SET title = 'Eco Garden', status = 'published';

-- Get the page ID
DO $$
DECLARE
  v_page_id UUID;
BEGIN
  SELECT id INTO v_page_id FROM pages WHERE slug = 'home';

  -- Delete old sections if any
  DELETE FROM sections WHERE page_id = v_page_id;

  -- Insert Hero Section
  INSERT INTO sections (page_id, type, content, position)
  VALUES (
    v_page_id,
    'hero',
    '{
      "heading": "Eco Garden – Vistvænar lausnir",
      "subheading": "Hágæða garðvörur sem virka – fyrir heimili, bændur og græna drauma",
      "ctaText": "Skoða vörur",
      "ctaLink": "/products",
      "backgroundImage": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&h=1080&fit=crop"
    }',
    1
  );

  -- Insert Text Section
  INSERT INTO sections (page_id, type, content, position)
  VALUES (
    v_page_id,
    'text',
    '{
      "heading": "Um Eco Garden",
      "content": "<p class=\"text-lg leading-relaxed\">Eco Garden sérhæfir sig í umhverfisvænum garðvörum fyrir neytendamarkað og stórnotendur. Við bjóðum fjölbreytt úrval áburðar, fræja, varnarefna og moltugerðarvöru sem leysir raunveruleg vandamál í garðyrkju og ræktun.</p><p class=\"text-lg leading-relaxed mt-4\">Allar vörur eru valdar með gæði og virðingu fyrir náttúrunni í för.</p>"
    }',
    2
  );

  -- Insert Features Section
  INSERT INTO sections (page_id, type, content, position)
  VALUES (
    v_page_id,
    'features',
    '{
      "heading": "Af hverju Eco Garden?",
      "features": [
        {
          "title": "Umhverfisvænar vörur",
          "description": "Vörur sem virða náttúruna og stuðla að sjálfbærni",
          "icon": "🌱"
        },
        {
          "title": "Fyrir heimili og atvinnu",
          "description": "Fræ, áburðir og lausnir fyrir garða, golfvelli og akrana",
          "icon": "🏡"
        },
        {
          "title": "Reynsla og þekking",
          "description": "Um 30 ára samanlögð reynsla í þjónustu og sölu",
          "icon": "⭐"
        }
      ]
    }',
    3
  );

  -- Insert CTA Section
  INSERT INTO sections (page_id, type, content, position)
  VALUES (
    v_page_id,
    'cta',
    '{
      "heading": "Tilbúinn að byrja?",
      "description": "Komdu garðinum þínum á næsta level með vistvænum lausnum",
      "buttonText": "Skoða vörur",
      "buttonLink": "/products"
    }',
    4
  );

END $$;

-- Verify sections were created
SELECT 
  p.title as page_title,
  s.type as section_type,
  s.position,
  s.content->>'heading' as heading
FROM pages p
JOIN sections s ON s.page_id = p.id
WHERE p.slug = 'home'
ORDER BY s.position;
