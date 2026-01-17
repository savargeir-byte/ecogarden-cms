-- Fix duplicate "Hjá Eco Garden" text - make it punchy and unique

DO $$
DECLARE
  home_page_id uuid;
  about_text_sections uuid[];
  section_record RECORD;
BEGIN
  -- Get home page
  SELECT id INTO home_page_id FROM pages WHERE slug = 'home' LIMIT 1;

  IF home_page_id IS NULL THEN
    RAISE NOTICE 'Home page not found, skipping...';
    RETURN;
  END IF;

  -- Find all text sections with "Hjá Eco Garden" content
  FOR section_record IN 
    SELECT id, content 
    FROM sections 
    WHERE page_id = home_page_id 
    AND type = 'text'
    AND content::text LIKE '%Hjá Eco Garden%'
  LOOP
    -- Delete duplicate text sections (keep content in other sections)
    DELETE FROM sections WHERE id = section_record.id;
    RAISE NOTICE 'Deleted duplicate text section: %', section_record.id;
  END LOOP;

END $$;
