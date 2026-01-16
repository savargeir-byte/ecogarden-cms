-- Add category and subcategory columns to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS subcategory TEXT,
ADD COLUMN IF NOT EXISTS price NUMERIC,
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Update existing products or insert sample data
-- You can customize these later

-- Garðyrkjubændur products
INSERT INTO products (title, description, price, category, subcategory, image, slug) VALUES
('Tómatar Fræ', 'Hágæða tómatar fræ fyrir gróðurhús', 2500, 'Garðyrkjubændur', 'Fræ', 'https://placehold.co/800x600/16a34a/ffffff?text=Tomatar+Frae', 'tomatar-frae'),
('Steinull Plötur', 'Steinull fyrir gróðurhús', 8900, 'Garðyrkjubændur', 'Steinull', 'https://placehold.co/800x600/16a34a/ffffff?text=Steinull', 'steinull-plotur'),
('Gróðurmold', 'Lífræn gróðurmold', 3500, 'Garðyrkjubændur', 'Mold', 'https://placehold.co/800x600/16a34a/ffffff?text=Grodurmold', 'grodurmold'),
('Plöntuvarnarefni', 'Lífræn plöntuvernd', 4500, 'Garðyrkjubændur', 'Varnarefni', 'https://placehold.co/800x600/16a34a/ffffff?text=Varn', 'plantuvarn'),
('Gróðurhúsdúkar', 'Plastdúkar fyrir gróðurhús', 12000, 'Garðyrkjubændur', 'Dúkar', 'https://placehold.co/800x600/16a34a/ffffff?text=Dukar', 'grodurhusduk'),
('Sáningarvél', 'Sjálfvirk sáningarvél', 45000, 'Garðyrkjubændur', 'Vélar og tæki', 'https://placehold.co/800x600/16a34a/ffffff?text=Vel', 'saningavel')

ON CONFLICT (slug) DO UPDATE SET
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory;

-- Landbúnaður products
INSERT INTO products (title, description, price, category, subcategory, image, slug) VALUES
('Áburður 50kg', 'NPK áburður fyrir alla uppskeru', 8500, 'Landbúnaður', 'Áburður', 'https://placehold.co/800x600/059669/ffffff?text=Aburður', 'abudur-50kg'),
('Kúaboli', 'Hágæða kúaboli', 3500, 'Landbúnaður', 'Fóður', 'https://placehold.co/800x600/059669/ffffff?text=Fóður', 'kuaboli'),
('Grasfræ', 'Varanleg grasfræ', 6500, 'Landbúnaður', 'Fræ', 'https://placehold.co/800x600/059669/ffffff?text=Grasfræ', 'grasfrae-land'),
('Hálkumottur', 'Gúmmímottur fyrir kýr', 15000, 'Landbúnaður', 'Mottur', 'https://placehold.co/800x600/059669/ffffff?text=Mottur', 'halkumottur'),
('Féhús Innréttingar', 'Stál innréttingar', 125000, 'Landbúnaður', 'Innréttingar', 'https://placehold.co/800x600/059669/ffffff?text=Innréttingar', 'fehus-innrett'),
('Fjárhús', 'Fullbúið fjárhús', 850000, 'Landbúnaður', 'Hús', 'https://placehold.co/800x600/059669/ffffff?text=Hús', 'fjarhus'),
('Traktor Fylgihlutir', 'Fylgihlutir fyrir traktora', 35000, 'Landbúnaður', 'Vélar og tæki', 'https://placehold.co/800x600/059669/ffffff?text=Vélar', 'traktor-fylgi')

ON CONFLICT (slug) DO UPDATE SET
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory;

-- Almennar garðyrkjuvörur
INSERT INTO products (title, description, price, category, subcategory, image, slug) VALUES
('Skordýraeitur', 'Alhliða skordýraeyðir', 3500, 'Almennar garðyrkjuvörur', 'Varnarefni', 'https://placehold.co/800x600/14532d/ffffff?text=Varn', 'skordyraeitur'),
('Grasfræ Sport', 'Íþróttavelligrasfræ', 8500, 'Almennar garðyrkjuvörur', 'Grasfræ', 'https://placehold.co/800x600/14532d/ffffff?text=Grasfræ', 'grasfrae-sport'),
('Garðáburður', 'Almennur garðáburður', 2500, 'Almennar garðyrkjuvörur', 'Áburður', 'https://placehold.co/800x600/14532d/ffffff?text=Áburður', 'gardabudur'),
('Blómanæring', 'Sérstök næring fyrir blóm', 1500, 'Almennar garðyrkjuvörur', 'Næring', 'https://placehold.co/800x600/14532d/ffffff?text=Næring', 'blomanaering'),
('Garðáhöld', 'Ýmis garðáhöld', 5500, 'Almennar garðyrkjuvörur', 'O.fl', 'https://placehold.co/800x600/14532d/ffffff?text=Ahöld', 'gardahöld')

ON CONFLICT (slug) DO UPDATE SET
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory;
