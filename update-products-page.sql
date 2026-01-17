-- Update products page hero image and add test products with images

DO $$
DECLARE
  v_product_id uuid;
BEGIN
  
  -- Insert sample products with images for each subcategory
  
  -- Garðyrkjubændur > Fræ
  INSERT INTO products (title, description, price, image, slug, category, subcategory, status)
  VALUES 
    ('Tómatar Fræ', 'Hágæða tómatar fræ fyrir gróðurhús', 890, 
     'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&q=80', 
     'tomatar-frae', 'Garðyrkjubændur', 'Fræ', 'published'),
    ('Agúrka Fræ', 'Ferskar agúrkur fyrir ræktun', 790,
     'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=600&q=80',
     'agurka-frae', 'Garðyrkjubændur', 'Fræ', 'published'),
    ('Paprika Fræ', 'Litríkar paprikur fyrir gróðurhús', 990,
     'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&q=80',
     'paprika-frae', 'Garðyrkjubændur', 'Fræ', 'published')
  ON CONFLICT (slug) DO UPDATE SET
    image = EXCLUDED.image,
    price = EXCLUDED.price;

  -- Garðyrkjubændur > Steinull
  INSERT INTO products (title, description, price, image, slug, category, subcategory, status)
  VALUES 
    ('Steinull Kubbar', 'Steinull fyrir fræsetningu', 4500,
     'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&q=80',
     'steinull-kubbar', 'Garðyrkjubændur', 'Steinull', 'published'),
    ('Steinull Plötur', 'Stórar steinull plötur fyrir ræktun', 8900,
     'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&q=80',
     'steinull-plotur', 'Garðyrkjubændur', 'Steinull', 'published')
  ON CONFLICT (slug) DO UPDATE SET
    image = EXCLUDED.image;

  -- Garðyrkjubændur > Mold
  INSERT INTO products (title, description, price, image, slug, category, subcategory, status)
  VALUES 
    ('Potting Mold', 'Hágæða potting mold fyrir inniplöntur', 2900,
     'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&q=80',
     'potting-mold', 'Garðyrkjubændur', 'Mold', 'published'),
    ('Gróður Mold', 'Mold fyrir gróðurhús', 3500,
     'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
     'grodur-mold', 'Garðyrkjubændur', 'Mold', 'published')
  ON CONFLICT (slug) DO UPDATE SET
    image = EXCLUDED.image;

  -- Garðyrkjubændur > Varnarefni
  INSERT INTO products (title, description, price, image, slug, category, subcategory, status)
  VALUES 
    ('Lífræn Varnarefni', 'Umhverfisvæn varnarefni gegn skordýrum', 3900,
     'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80',
     'lifroen-varnarefni', 'Garðyrkjubændur', 'Varnarefni', 'published'),
    ('Sveppavörn', 'Náttúruleg sveppavörn', 4200,
     'https://images.unsplash.com/photo-1574482620811-1aa16ffe3c82?w=600&q=80',
     'sveppavorn', 'Garðyrkjubændur', 'Varnarefni', 'published')
  ON CONFLICT (slug) DO UPDATE SET
    image = EXCLUDED.image;

  -- Landbúnaður > Áburður
  INSERT INTO products (title, description, price, image, slug, category, subcategory, status)
  VALUES 
    ('NPK Áburður 20kg', 'Fullkominn áburður fyrir akra', 7900,
     'https://images.unsplash.com/photo-1625246286509-bc46934c3a9f?w=600&q=80',
     'npk-aburour-20kg', 'Landbúnaður', 'Áburður', 'published'),
    ('Lífrænn Áburður', 'Náttúrulegur áburður fyrir lífræna ræktun', 9500,
     'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80',
     'lifraenn-aburour', 'Landbúnaður', 'Áburður', 'published')
  ON CONFLICT (slug) DO UPDATE SET
    image = EXCLUDED.image;

  -- Landbúnaður > Fræ
  INSERT INTO products (title, description, price, image, slug, category, subcategory, status)
  VALUES 
    ('Korn Fræ', 'Hágæða kornfræ fyrir akra', 15000,
     'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80',
     'korn-frae', 'Landbúnaður', 'Fræ', 'published'),
    ('Heygresi', 'Fræ fyrir heyslátt', 12000,
     'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
     'heygresi', 'Landbúnaður', 'Fræ', 'published')
  ON CONFLICT (slug) DO UPDATE SET
    image = EXCLUDED.image;

  -- Almennar garðyrkjuvörur > Grasfræ
  INSERT INTO products (title, description, price, image, slug, category, subcategory, status)
  VALUES 
    ('Grasgarður Fræ', 'Þétt og grænt grasgarðafræ', 3900,
     'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=600&q=80',
     'grasgardur-frae', 'Almennar garðyrkjuvörur', 'Grasfræ', 'published'),
    ('Sport Grasfræ', 'Harðgert fræ fyrir íþróttavelli', 4500,
     'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=80',
     'sport-grasfrae', 'Almennar garðyrkjuvörur', 'Grasfræ', 'published')
  ON CONFLICT (slug) DO UPDATE SET
    image = EXCLUDED.image;

  -- Almennar garðyrkjuvörur > Áburður
  INSERT INTO products (title, description, price, image, slug, category, subcategory, status)
  VALUES 
    ('Gras Áburður', 'Áburður fyrir grænan grasflöt', 2900,
     'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=600&q=80',
     'gras-aburour', 'Almennar garðyrkjuvörur', 'Áburður', 'published'),
    ('Blóma Áburður', 'Sérhæfður áburður fyrir blóm', 1900,
     'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80',
     'bloma-aburour', 'Almennar garðyrkjuvörur', 'Áburður', 'published')
  ON CONFLICT (slug) DO UPDATE SET
    image = EXCLUDED.image;

  -- Almennar garðyrkjuvörur > Varnarefni
  INSERT INTO products (title, description, price, image, slug, category, subcategory, status)
  VALUES 
    ('Umhverfisvæn Skordýravörn', 'Öruggt fyrir börn og gæludýr', 2400,
     'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=600&q=80',
     'umhverfisvoen-skordyravorn', 'Almennar garðyrkjuvörur', 'Varnarefni', 'published')
  ON CONFLICT (slug) DO UPDATE SET
    image = EXCLUDED.image;

  RAISE NOTICE 'Successfully added/updated products with images!';
  
END $$;
