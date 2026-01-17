-- Update home page with 3 main category tiles with subcategories

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

  -- Find existing imageGrid section or note if missing
  SELECT id INTO imagegrid_section_id 
  FROM sections 
  WHERE page_id = home_page_id AND type = 'imageGrid' 
  LIMIT 1;

  -- If imageGrid section doesn't exist, create it
  IF imagegrid_section_id IS NULL THEN
    INSERT INTO sections (page_id, type, content, "order")
    VALUES (
      home_page_id,
      'imageGrid',
      jsonb_build_object(
        'heading', 'Okkar Þjónusta',
        'items', jsonb_build_array(
          jsonb_build_object(
            'title', 'Garðhönnun',
            'subtitle', 'Sérsniðin hönnun fyrir þinn draumagarð',
            'image', 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&q=80',
            'link', '/products?category=Garðhönnun',
            'subcategories', jsonb_build_array(
              'Lóðamælingar',
              'Garðhönnun',
              'Gróðurval',
              'Uppdrættir'
            )
          ),
          jsonb_build_object(
            'title', 'Ræktun',
            'subtitle', 'Allt fyrir grænan og fallegann garð',
            'image', 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80',
            'link', '/products?category=Ræktun',
            'subcategories', jsonb_build_array(
              'Fræ',
              'Steinull',
              'Jarðvegur',
              'Áburður',
              'Pottar'
            )
          ),
          jsonb_build_object(
            'title', 'Garðvörur',
            'subtitle', 'Hágæða verkfæri og búnaður',
            'image', 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=800&q=80',
            'link', '/products?category=Garðvörur',
            'subcategories', jsonb_build_array(
              'Garðverkfæri',
              'Vélar',
              'Slöngur',
              'Húsgögn',
              'Skraut'
            )
          )
        )
      ),
      2  -- Order after hero (1)
    )
    RETURNING id INTO imagegrid_section_id;
    
    RAISE NOTICE 'Created new imageGrid section with ID: %', imagegrid_section_id;
  ELSE
    -- Update existing imageGrid section
    UPDATE sections
    SET content = jsonb_build_object(
      'heading', 'Okkar Þjónusta',
      'items', jsonb_build_array(
        jsonb_build_object(
          'title', 'Garðhönnun',
          'subtitle', 'Sérsniðin hönnun fyrir þinn draumagarð',
          'image', 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&q=80',
          'link', '/products?category=Garðhönnun',
          'subcategories', jsonb_build_array(
            'Lóðamælingar',
            'Garðhönnun',
            'Gróðurval',
            'Uppdrættir'
          )
        ),
        jsonb_build_object(
          'title', 'Ræktun',
          'subtitle', 'Allt fyrir grænan og fallegann garð',
          'image', 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80',
          'link', '/products?category=Ræktun',
          'subcategories', jsonb_build_array(
            'Fræ',
            'Steinull',
            'Jarðvegur',
            'Áburður',
            'Pottar'
          )
        ),
        jsonb_build_object(
          'title', 'Garðvörur',
          'subtitle', 'Hágæða verkfæri og búnaður',
          'image', 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=800&q=80',
          'link', '/products?category=Garðvörur',
          'subcategories', jsonb_build_array(
            'Garðverkfæri',
            'Vélar',
            'Slöngur',
            'Húsgögn',
            'Skraut'
          )
        )
      )
    )
          'description', 'Vörur sem endast í íslenskum aðstæðum',
          'image', 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=800&q=80',
          'link', '/products'
        )
      )
    )
    WHERE id = imagegrid_section_id;
    
    RAISE NOTICE 'Updated existing imageGrid section with ID: %', imagegrid_section_id;
  END IF;

END $$;
