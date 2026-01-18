-- Add English Translations to Database
-- This script adds English content using the sections table architecture

-- Note: This CMS uses pages + sections architecture, not blocks
-- Translations are handled in the UI layer (lib/i18n.ts)
-- This script creates example English content in sections

-- Check if English home page exists, if not create it
DO $$
DECLARE
  home_page_id uuid;
BEGIN
  -- Get or create home page
  SELECT id INTO home_page_id FROM pages WHERE slug = 'home';
  
  IF home_page_id IS NULL THEN
    INSERT INTO pages (slug, title, status)
    VALUES ('home', 'Eco Garden - Home', 'published')
    RETURNING id INTO home_page_id;
    
    RAISE NOTICE 'Home page created';
  ELSE
    RAISE NOTICE 'Home page already exists';
  END IF;
  
  -- Check if English hero section exists
  IF NOT EXISTS (
    SELECT 1 FROM sections 
    WHERE page_id = home_page_id 
    AND type = 'hero' 
    AND content->>'locale' = 'en'
  ) THEN
    -- Add English hero section
    INSERT INTO sections (page_id, type, content, position)
    VALUES (
      home_page_id,
      'hero',
      jsonb_build_object(
        'locale', 'en',
        'heading', 'Garden Solutions Built for Icelandic Conditions',
        'text', 'Designed for Icelandic weather. Selected by professionals.',
        'image', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
        'imageAlt', 'Beautiful Icelandic Garden',
        'ctaText', 'View Products',
        'ctaLink', '/products'
      ),
      0
    );
    RAISE NOTICE 'English hero section added';
  END IF;
END $$;


-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ English translation setup complete!';
  RAISE NOTICE '';
  RAISE NOTICE 'IMPORTANT: This CMS uses UI-layer translations (lib/i18n.ts)';
  RAISE NOTICE 'Content is language-agnostic in the database.';
  RAISE NOTICE 'Switch languages using the navbar language switcher.';
  RAISE NOTICE '';
  RAISE NOTICE 'All UI text is already translated in lib/i18n.ts:';
  RAISE NOTICE '- Navigation, buttons, forms';
  RAISE NOTICE '- Hero sections, features, CTAs';
  RAISE NOTICE '- Stats, team, contact info';
END $$;

-- View current pages
SELECT 
  p.slug,
  p.title,
  p.status,
  COUNT(s.id) as section_count
FROM pages p
LEFT JOIN sections s ON s.page_id = p.id
GROUP BY p.id, p.slug, p.title, p.status
ORDER BY p.slug;
