-- Add introduction text section above the image grid
-- Similar to Teemore's "for Ultimate Comfort & Safety" section

DO $$
DECLARE
  home_page_id uuid;
  hero_position int;
BEGIN
  -- Get home page
  SELECT id INTO home_page_id FROM pages WHERE slug = 'home' LIMIT 1;

  IF home_page_id IS NULL THEN
    RAISE EXCEPTION 'Home page not found!';
  END IF;

  -- Find the hero section position (usually 1)
  SELECT position INTO hero_position FROM sections 
  WHERE page_id = home_page_id AND type = 'hero' 
  ORDER BY position ASC LIMIT 1;

  -- If hero doesn't exist, default to position 1
  IF hero_position IS NULL THEN
    hero_position := 1;
  END IF;

  -- Update all sections after hero to make room
  UPDATE sections 
  SET position = position + 1 
  WHERE page_id = home_page_id 
  AND position > hero_position;

  -- Insert the new text section right after hero
  INSERT INTO sections (page_id, type, content, position)
  VALUES (
    home_page_id,
    'text',
    jsonb_build_object(
      'heading', 'fyrir Besta Árangur og Öryggi',
      'body', '<p class="text-center text-gray-600 max-w-4xl mx-auto leading-relaxed">Hjá Eco Garden erum við stolt af því að hanna og bjóða upp á framúrskarandi vörur. Með 50+ ára reynslu í iðnaði og vöruþekkingu munum við hjálpa þér að ákveða bestu lausnina fyrir garðinn þinn. Söluteymið okkar garðyrkur sjálft og þeir skilja virkilega þarfir viðskiptavina okkar. Í gegnum net söluaðila og aðalbirgðahúsa náum við yfir allt landið og bjóðum upp á heimsklassa garðlausnir.</p>'
    ),
    hero_position + 1
  );

  RAISE NOTICE 'Text section added successfully at position %', hero_position + 1;
END $$;
