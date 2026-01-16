-- Keyrðu: update-home-3-images.sql

-- Update product categories with correct subcategories
-- Categories: Garðyrkjubændur, Landbúnaður, Almennar garðyrkjuvörur

-- Clear existing products
TRUNCATE TABLE products RESTART IDENTITY CASCADE;

-- Garðyrkjubændur products (6 subcategories)
INSERT INTO products (title, description, image, category, subcategory, slug, published) VALUES
-- Fræ
('Tómatar fræ', 'Hágæða tómatar fræ fyrir gróðurhús', 'https://placehold.co/400x300/16a34a/ffffff?text=Tomatar+Frae', 'Garðyrkjubændur', 'Fræ', 'tomatar-frae', true),
('Gúrku fræ', 'Íslensk gúrku fræ', 'https://placehold.co/400x300/16a34a/ffffff?text=Gurku+Frae', 'Garðyrkjubændur', 'Fræ', 'gurku-frae', true),

-- Steinull
('Grodan steinull', 'Grodan steinull kubbar', 'https://placehold.co/400x300/16a34a/ffffff?text=Grodan+Steinull', 'Garðyrkjubændur', 'Steinull', 'grodan-steinull', true),
('Rockwool plötur', 'Steinull plötur fyrir gróðurhús', 'https://placehold.co/400x300/16a34a/ffffff?text=Rockwool', 'Garðyrkjubændur', 'Steinull', 'rockwool-plotur', true),

-- Mold
('Jarðvegsmix', 'Hágæða jarðvegur fyrir gróðurhús', 'https://placehold.co/400x300/16a34a/ffffff?text=Jardvegsmix', 'Garðyrkjubændur', 'Mold', 'jardvegsmix', true),
('Kókos mold', 'Lífræn kókos mold', 'https://placehold.co/400x300/16a34a/ffffff?text=Kokos+Mold', 'Garðyrkjubændur', 'Mold', 'kokos-mold', true),

-- Varnarefni
('Insect killer', 'Lífrænt skordýraeitur', 'https://placehold.co/400x300/16a34a/ffffff?text=Insect+Killer', 'Garðyrkjubændur', 'Varnarefni', 'insect-killer', true),
('Fungicide', 'Sveppaeyðir fyrir plöntur', 'https://placehold.co/400x300/16a34a/ffffff?text=Fungicide', 'Garðyrkjubændur', 'Varnarefni', 'fungicide', true),

-- Dúkar
('Plastdúkur', 'UV varinn plastdúkur', 'https://placehold.co/400x300/16a34a/ffffff?text=Plastdukur', 'Garðyrkjubændur', 'Dúkar', 'plastdukur', true),
('Malchfilm', 'Svartur malchfilm', 'https://placehold.co/400x300/16a34a/ffffff?text=Malchfilm', 'Garðyrkjubændur', 'Dúkar', 'malchfilm', true),

-- Vélar og tæki
('Vatnskerfi', 'Sjálfvirkt vatnskerfi', 'https://placehold.co/400x300/16a34a/ffffff?text=Vatnskerfi', 'Garðyrkjubændur', 'Vélar og tæki', 'vatnskerfi', true),
('Loftræstibúnaður', 'Sjálfvirkur loftræstibúnaður', 'https://placehold.co/400x300/16a34a/ffffff?text=Loftraesting', 'Garðyrkjubændur', 'Vélar og tæki', 'loftraestibunabur', true);

-- Landbúnaður products (7 subcategories)
INSERT INTO products (title, description, image, category, subcategory, slug, published) VALUES
-- Áburður
('NPK áburður', 'Fullkominn NPK áburður fyrir túnið', 'https://placehold.co/400x300/0d9488/ffffff?text=NPK+Aburður', 'Landbúnaður', 'Áburður', 'npk-aburður', true),
('Lífrænn áburður', 'Náttúrulegur lífrænn áburður', 'https://placehold.co/400x300/0d9488/ffffff?text=Lifraenn+Aburður', 'Landbúnaður', 'Áburður', 'lifraenn-aburður', true),

-- Fóður
('Heyfóður', 'Hágæða hey fyrir nautgripi', 'https://placehold.co/400x300/0d9488/ffffff?text=Heyfoður', 'Landbúnaður', 'Fóður', 'heyfodur', true),
('Kúafóður', 'Blandað kúafóður', 'https://placehold.co/400x300/0d9488/ffffff?text=Kuafodur', 'Landbúnaður', 'Fóður', 'kuafodur', true),

-- Fræ
('Grasfræ túnfræ', 'Íslenskt túnfræ', 'https://placehold.co/400x300/0d9488/ffffff?text=Grasfræ', 'Landbúnaður', 'Fræ', 'grasfrae-tunfrae', true),
('Heyannir fræ', 'Fræ fyrir heyannir', 'https://placehold.co/400x300/0d9488/ffffff?text=Heyannir', 'Landbúnaður', 'Fræ', 'heyannir-frae', true),

-- Mottur
('Stálmottur', 'Stálmottur fyrir fjárhús', 'https://placehold.co/400x300/0d9488/ffffff?text=Stalmottur', 'Landbúnaður', 'Mottur', 'stalmottur', true),
('Gúmmímottur', 'Mjúkar gúmmímottur', 'https://placehold.co/400x300/0d9488/ffffff?text=Gummimottur', 'Landbúnaður', 'Mottur', 'gummimottur', true),

-- Innréttingar
('Kýrabás', 'Nútímalegar kýrabásar', 'https://placehold.co/400x300/0d9488/ffffff?text=Kyrabas', 'Landbúnaður', 'Innréttingar', 'kyrabas', true),
('Fóðurgrindr', 'Sterkar fóðurgrindr', 'https://placehold.co/400x300/0d9488/ffffff?text=Foðurgrindr', 'Landbúnaður', 'Innréttingar', 'fodurgrindr', true),

-- Hús
('Fjárhús', 'Fullkomið fjárhús', 'https://placehold.co/400x300/0d9488/ffffff?text=Fjarhus', 'Landbúnaður', 'Hús', 'fjarhus', true),
('Hestaboxar', 'Hágæða hestaboxar', 'https://placehold.co/400x300/0d9488/ffffff?text=Hestaboxar', 'Landbúnaður', 'Hús', 'hestaboxar', true),

-- Vélar og tæki
('Túntraktors', 'Kraftmikill túntraktors', 'https://placehold.co/400x300/0d9488/ffffff?text=Tuntraktors', 'Landbúnaður', 'Vélar og tæki', 'tuntraktors', true),
('Sláttuvél', 'Fagleg sláttuvél', 'https://placehold.co/400x300/0d9488/ffffff?text=Slattuvél', 'Landbúnaður', 'Vélar og tæki', 'slattuvel', true);

-- Almennar garðyrkjuvörur products (5 subcategories)
INSERT INTO products (title, description, image, category, subcategory, slug, published) VALUES
-- Varnarefni
('Garðvarnarefni', 'Varnarefni fyrir almennan garð', 'https://placehold.co/400x300/10b981/ffffff?text=Varnarefni', 'Almennar garðyrkjuvörur', 'Varnarefni', 'gardvarnarefni', true),
('Plöntuvernd', 'Náttúruleg plöntuvernd', 'https://placehold.co/400x300/10b981/ffffff?text=Plontuvernd', 'Almennar garðyrkjuvörur', 'Varnarefni', 'plontuvernd', true),

-- Grasfræ
('Grasfræ für garða', 'Fallegt grasfræ fyrir garða', 'https://placehold.co/400x300/10b981/ffffff?text=Grasfræ', 'Almennar garðyrkjuvörur', 'Grasfræ', 'grasfrae-garda', true),
('Sport grasfræ', 'Sterkt grasfræ fyrir íþróttavelli', 'https://placehold.co/400x300/10b981/ffffff?text=Sport+Grasfræ', 'Almennar garðyrkjuvörur', 'Grasfræ', 'sport-grasfrae', true),

-- Áburður
('Garðáburður', 'Alhliða garðáburður', 'https://placehold.co/400x300/10b981/ffffff?text=Gardaburður', 'Almennar garðyrkjuvörur', 'Áburður', 'gardaburður', true),
('Blómáburður', 'Sérhæfður áburður fyrir blóm', 'https://placehold.co/400x300/10b981/ffffff?text=Blomaburður', 'Almennar garðyrkjuvörur', 'Áburður', 'blomaburður', true),

-- Næring
('Plöntunæring', 'Fljótvirk plöntunæring', 'https://placehold.co/400x300/10b981/ffffff?text=Plantunaering', 'Almennar garðyrkjuvörur', 'Næring', 'plontunaering', true),
('Blómavökvi', 'Vökvað næring fyrir blóm', 'https://placehold.co/400x300/10b981/ffffff?text=Blomavokvi', 'Almennar garðyrkjuvörur', 'Næring', 'blomavokvi', true),

-- Annað
('Garðverkfæri', 'Ýmis garðverkfæri', 'https://placehold.co/400x300/10b981/ffffff?text=Verkfæri', 'Almennar garðyrkjuvörur', 'Annað', 'gardverkfaeri', true),
('Garðpottar', 'Fallegar garðpottar', 'https://placehold.co/400x300/10b981/ffffff?text=Pottar', 'Almennar garðyrkjuvörur', 'Annað', 'gardpottar', true);

-- Verify counts
SELECT 
  category, 
  subcategory, 
  COUNT(*) as product_count 
FROM products 
GROUP BY category, subcategory 
ORDER BY category, subcategory;
