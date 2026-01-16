-- Update image grid to have 3 items instead of 2

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

  -- Find the imageGrid section
  SELECT id INTO imagegrid_section_id 
  FROM sections 
  WHERE page_id = home_page_id AND type = 'imageGrid' 
  LIMIT 1;

  IF imagegrid_section_id IS NULL THEN
    RAISE EXCEPTION 'ImageGrid section not found!';
  END IF;

  -- Update the imageGrid content to have 3 items
  UPDATE sections
  SET content = jsonb_build_object(
    'heading', 'Okkar Lausnir',
    'items', jsonb_build_array(
      jsonb_build_object(
        'title', 'Garðhönnun',
        'subtitle', 'Fagleg garðhönnun',
        'image', 'https://placehold.co/800x400/16a34a/ffffff?text=Gardhonn',
        'link', '/products?category=Garðyrkjubændur'
      ),
      jsonb_build_object(
        'title', 'Ræktunarlausnir',
        'subtitle', 'Vistvænar ræktunarlausnir',
        'image', 'https://placehold.co/800x400/059669/ffffff?text=Raekunarlausnir',
        'link', '/products?category=Landbúnaður'
      ),
      jsonb_build_object(
        'title', 'Garðvörur',
        'subtitle', 'Almennar garðyrkjuvörur',
        'image', 'https://placehold.co/800x400/10b981/ffffff?text=Gardvorur',
        'link', '/products?category=Almennar garðyrkjuvörur'
      )
    )
  )
  WHERE id = imagegrid_section_id;

  RAISE NOTICE 'ImageGrid updated to 3 items successfully';
END $$;
