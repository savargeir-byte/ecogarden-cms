-- Update home page ImageGrid with correct categories and English translations
-- Categories: Garðyrkjubændur, Landbúnaður, Almennar garðyrkjuvörur

DO $$
DECLARE
  home_page_id uuid;
  imagegrid_section_id uuid;
BEGIN
  -- Get home page
  SELECT id INTO home_page_id FROM pages WHERE slug = 'home' LIMIT 1;

  IF home_page_id IS NULL THEN
    RAISE EXCEPTION 'Home page not found!';
  END IF;

  -- Find existing imageGrid section
  SELECT id INTO imagegrid_section_id 
  FROM sections 
  WHERE page_id = home_page_id AND type = 'imageGrid' 
  LIMIT 1;

  IF imagegrid_section_id IS NULL THEN
    RAISE EXCEPTION 'ImageGrid section not found! Please run create-home-page.sql first.';
  END IF;

  -- Update the imageGrid section with correct categories and English translations
  UPDATE sections
  SET content = jsonb_build_object(
    'heading', 'Okkar Þjónusta',
    'heading_en', 'Our Services',
    'items', jsonb_build_array(
      -- 1. Garðyrkjubændur (Horticulture Farmers)
      jsonb_build_object(
        'title', 'Garðyrkjubændur',
        'title_en', 'Horticulture Farmers',
        'subtitle', 'Sérsniðnar lausnir fyrir fagfólk í garðyrkju',
        'subtitle_en', 'Customized solutions for horticulture professionals',
        'image', 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
        'link', '/products?category=gardyrkjubaendur',
        'subcategories', jsonb_build_array(
          'Gróðurhús',
          'Varmastýring',
          'Ræktunarkassar',
          'Vökvunarkerfi',
          'LED ljósabúnaður',
          'Hitastigar og mælar'
        ),
        'subcategories_en', jsonb_build_array(
          'Greenhouses',
          'Climate Control',
          'Growing Systems',
          'Irrigation Systems',
          'LED Grow Lights',
          'Sensors & Meters'
        )
      ),
      -- 2. Landbúnaður (Agriculture)
      jsonb_build_object(
        'title', 'Landbúnaður',
        'title_en', 'Agriculture',
        'subtitle', 'Traustir verkfæri og búnaður fyrir bændur',
        'subtitle_en', 'Reliable tools and equipment for farmers',
        'image', 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
        'link', '/products?category=landbunadur',
        'subcategories', jsonb_build_array(
          'Garðyrkjuvélar',
          'Slátturvélar',
          'Sáningabúnaður',
          'Heyvinnsla',
          'Girðingaefni',
          'Hlaðabúnaður'
        ),
        'subcategories_en', jsonb_build_array(
          'Garden Machinery',
          'Lawn Mowers',
          'Seeding Equipment',
          'Hay Processing',
          'Fencing Materials',
          'Barn Equipment'
        )
      ),
      -- 3. Almennar garðyrkjuvörur (General Garden Products)
      jsonb_build_object(
        'title', 'Almennar Garðyrkjuvörur',
        'title_en', 'General Garden Products',
        'subtitle', 'Vandaðar garðvörur fyrir heimili og sumarbústaði',
        'subtitle_en', 'Quality garden products for homes and cottages',
        'image', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
        'link', '/products?category=almennar-gardyrkjuvorur',
        'subcategories', jsonb_build_array(
          'Garðverkfæri',
          'Garðhúsgögn',
          'Pottaplöntur',
          'Jarðvegur og áburður',
          'Girðingar og skreyting',
          'Vatnsslöngur'
        ),
        'subcategories_en', jsonb_build_array(
          'Garden Tools',
          'Garden Furniture',
          'Potted Plants',
          'Soil & Fertilizer',
          'Fences & Decorations',
          'Hoses'
        )
      )
    )
  )
  WHERE id = imagegrid_section_id;

  RAISE NOTICE '✅ ImageGrid section updated with correct categories and English translations!';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Categories updated:';
  RAISE NOTICE '   1. Garðyrkjubændur / Horticulture Farmers';
  RAISE NOTICE '   2. Landbúnaður / Agriculture';
  RAISE NOTICE '   3. Almennar Garðyrkjuvörur / General Garden Products';
  RAISE NOTICE '';
  RAISE NOTICE '✨ Each category has subcategories in both Icelandic and English';

END $$;
