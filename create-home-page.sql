-- Create home page if it doesn't exist, then add sections
DO $$
DECLARE
  home_page_id uuid;
BEGIN
  -- Check if home page exists
  SELECT id INTO home_page_id FROM pages WHERE slug = 'home' LIMIT 1;

  -- If home page doesn't exist, create it
  IF home_page_id IS NULL THEN
    INSERT INTO pages (slug, title, status)
    VALUES ('home', 'Heim', 'published')
    RETURNING id INTO home_page_id;
    
    RAISE NOTICE 'Created home page with id: %', home_page_id;
  ELSE
    RAISE NOTICE 'Home page already exists with id: %', home_page_id;
    -- Delete existing sections to start fresh
    DELETE FROM sections WHERE page_id = home_page_id;
    RAISE NOTICE 'Deleted existing sections';
  END IF;

  -- Add new hero section with full-width image
  INSERT INTO sections (page_id, type, content, position)
  VALUES (
    home_page_id,
    'hero',
    jsonb_build_object(
      'title', 'Vistvænar Garðlausnir fyrir Betri Framtíð',
      'subtitle', 'Hjá Eco Garden erum við stoltur af því að hanna og bjóða upp á framúrskarandi vörur. Með 50+ ára reynslu í greininni hjálpum við þér að velja bestu lausnina fyrir þinn garð.',
      'image', 'https://placehold.co/1920x700/2d6a4f/ffffff?text=Eco+Garden+Hero',
      'ctaText', 'Fá tilboð',
      'ctaLink', '/contact'
    ),
    1
  );

  -- Add image grid section (like Teemore's Beef/Dairy sections)
  INSERT INTO sections (page_id, type, content, position)
  VALUES (
    home_page_id,
    'imageGrid',
    jsonb_build_object(
      'heading', 'Okkar Lausnir',
      'items', jsonb_build_array(
        jsonb_build_object(
          'title', 'Garðhönnun',
          'subtitle', 'Fagleg garðhönnun',
          'image', 'https://placehold.co/800x400/16a34a/ffffff?text=Gardhonn',
          'link', '/products'
        ),
        jsonb_build_object(
          'title', 'Ræktunarlausnir',
          'subtitle', 'Vistvænar ræktunarlausnir',
          'image', 'https://placehold.co/800x400/059669/ffffff?text=Raekunarlausnir',
          'link', '/products'
        )
      )
    ),
    2
  );

  -- Add text section
  INSERT INTO sections (page_id, type, content, position)
  VALUES (
    home_page_id,
    'text',
    jsonb_build_object(
      'heading', 'Um Eco Garden',
      'body', '<p>Hjá Eco Garden erum við stoltur af því að hanna og bjóða upp á framúrskarandi vörur. Með 50+ ára reynslu í iðnaði og vöruþekkingu munum við hjálpa þér að ákveða bestu lausnina fyrir garðinn þinn. Söluteymið okkar garðyrkur sjálft og þeir skilja virkilega þarfir viðskiptavina okkar.</p>'
    ),
    3
  );

  -- Add features section
  INSERT INTO sections (page_id, type, content, position)
  VALUES (
    home_page_id,
    'features',
    jsonb_build_object(
      'heading', 'Af hverju að velja okkur?',
      'features', jsonb_build_array(
        jsonb_build_object(
          'icon', '🌱',
          'title', 'Vistvænar lausnir',
          'description', 'Allar okkar vörur eru hannaðar með umhverfið í huga'
        ),
        jsonb_build_object(
          'icon', '⭐',
          'title', 'Hágæða vörur',
          'description', 'Við notum aðeins bestu hráefnin og efni'
        ),
        jsonb_build_object(
          'icon', '🤝',
          'title', 'Fagleg þjónusta',
          'description', '50+ ára reynsla í greininni'
        )
      )
    ),
    4
  );

  -- Add CTA section
  INSERT INTO sections (page_id, type, content, position)
  VALUES (
    home_page_id,
    'cta',
    jsonb_build_object(
      'heading', 'Tilbúinn að byrja?',
      'description', 'Hafðu samband við okkur í dag og fáðu ókeypis tilboð',
      'buttonText', 'Hafa samband',
      'buttonLink', '/contact'
    ),
    5
  );

  RAISE NOTICE 'Teemore-style home page sections created successfully!';
END $$;
