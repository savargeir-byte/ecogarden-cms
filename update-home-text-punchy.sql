-- Update home page with punchier, more visual text content

DO $$
DECLARE
  home_page_id uuid;
  hero_section_id uuid;
  features_section_id uuid;
  cta_section_id uuid;
BEGIN
  -- Get home page
  SELECT id INTO home_page_id FROM pages WHERE slug = 'home' LIMIT 1;

  IF home_page_id IS NULL THEN
    RAISE EXCEPTION 'Home page not found!';
  END IF;

  -- Update Hero section with punchier text
  SELECT id INTO hero_section_id 
  FROM sections 
  WHERE page_id = home_page_id AND type = 'hero' 
  LIMIT 1;

  IF hero_section_id IS NOT NULL THEN
    UPDATE sections
    SET content = jsonb_build_object(
      'heading', 'Garðlausnir sem endast í íslenskum aðstæðum',
      'text', 'Hannað fyrir íslenskt veður. Valið af fagfólki.',
      'image', 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1920&q=80',
      'ctaText', 'Skoða vörur',
      'ctaLink', '/products'
    )
    WHERE id = hero_section_id;
    
    RAISE NOTICE 'Updated hero section with ID: %', hero_section_id;
  END IF;

  -- Update Features section with stronger, punchier titles
  SELECT id INTO features_section_id 
  FROM sections 
  WHERE page_id = home_page_id AND type = 'features' 
  LIMIT 1;

  IF features_section_id IS NOT NULL THEN
    UPDATE sections
    SET content = jsonb_build_object(
      'heading', 'Þjónusta okkar',
      'features', jsonb_build_array(
        jsonb_build_object(
          'icon', '🎨',
          'title', 'Hönnun sem virkar',
          'text', 'Sérsniðin garðhönnun fyrir íslenskar aðstæður'
        ),
        jsonb_build_object(
          'icon', '🌱',
          'title', 'Lausnir sem endast',
          'text', 'Frá jarðvegi til uppskeru - allt á einum stað'
        ),
        jsonb_build_object(
          'icon', '🛠️',
          'title', 'Valið af fagfólki',
          'text', 'Verkfæri og búnaður sem þolir íslenskt veður'
        )
      )
    )
    WHERE id = features_section_id;
    
    RAISE NOTICE 'Updated features section with ID: %', features_section_id;
  END IF;

  -- Update CTA section with more compelling action text
  SELECT id INTO cta_section_id 
  FROM sections 
  WHERE page_id = home_page_id AND type = 'cta' 
  LIMIT 1;

  IF cta_section_id IS NOT NULL THEN
    UPDATE sections
    SET content = jsonb_build_object(
      'heading', 'Tilbúinn að byrja?',
      'description', 'Fáðu ókeypis ráðgjöf frá fagfólki',
      'buttonText', 'Fá tillögu að lausn',
      'buttonLink', '/contact'
    )
    WHERE id = cta_section_id;
    
    RAISE NOTICE 'Updated CTA section with ID: %', cta_section_id;
  END IF;

END $$;
