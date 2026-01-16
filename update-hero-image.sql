-- Update hero section with new banner image
DO $$
DECLARE
  home_page_id uuid;
BEGIN
  -- Get home page ID
  SELECT id INTO home_page_id FROM pages WHERE slug = 'home' LIMIT 1;
  
  IF home_page_id IS NULL THEN
    RAISE EXCEPTION 'Home page not found! Run create-home-page.sql first.';
  END IF;
  
  -- Update hero section with new image
  UPDATE sections
  SET content = jsonb_set(
    content,
    '{image}',
    '"https://static.wixstatic.com/media/1a76e4_8d024d9462eb4857a207edf5d66e629e~mv2.png/v1/fill/w_2514,h_1300,al_c,q_95,usm_0.66_1.00_0.01,enc_avif,quality_auto/1a76e4_8d024d9462eb4857a207edf5d66e629e~mv2.png"'
  )
  WHERE page_id = home_page_id 
    AND type = 'hero'
    AND position = 1;
  
  RAISE NOTICE 'Hero image updated successfully!';
END $$;
