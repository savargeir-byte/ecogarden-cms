-- Sample Products for Eco Garden
-- Based on real product categories from eco-garden.is
-- Execute this after products-setup.sql

-- Delete sample products if they exist
DELETE FROM products WHERE slug IN (
  'grasamín-fljotandi-aburður',
  'ecofective-mosaeydir',
  'biolan-moltugerðarbox',
  'dlf-grasfræ-golfvellir',
  'vivagreen-varnarefni'
);

-- 1. Grasamín - Fljótandi áburður
INSERT INTO products (slug, title, category, description, blocks, status, locale, seo)
VALUES (
  'grasamín-fljotandi-aburður',
  'Grasamín - Fljótandi áburður',
  'Áburður',
  'Hágæða fljótandi áburður fyrir gras og plöntur',
  '[
    {
      "type": "hero",
      "data": {
        "title": "Grasamín - Fljótandi áburður",
        "subtitle": "Fljótvirkt áburðarefni fyrir frískt og sterkt gras",
        "image": "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=1200&q=80"
      }
    },
    {
      "type": "text",
      "data": "<div class=\"max-w-4xl mx-auto px-6 py-12\"><p class=\"text-lg text-gray-700 leading-relaxed\">Grasamín er fljótandi áburður sem hentar sérstaklega vel fyrir grasfleti, golfvelli og græn svæði. Varan inniheldur jafnvægi af NPK næringarefnum sem næra grasið og styrkja rótarkerfi.</p></div>"
    },
    {
      "type": "featureList",
      "data": [
        {
          "title": "Fljótvirkt",
          "description": "Sjáanlegar niðurstöður innan 7-10 daga"
        },
        {
          "title": "Auðvelt í notkun",
          "description": "Þynnt með vatni og útborið með úðara eða vatnskönnu"
        },
        {
          "title": "Umhverfisvænt",
          "description": "Lífræn næringarefni sem skaða ekki jarðveg"
        }
      ]
    },
    {
      "type": "specsTable",
      "data": [
        { "label": "NPK hlutfall", "value": "10-5-5" },
        { "label": "Pakkastærð", "value": "1L, 5L, 10L" },
        { "label": "Notkun", "value": "20-30 ml á 10L vatni" },
        { "label": "Tíðni", "value": "Á 2-3 vikna fresti" }
      ]
    },
    {
      "type": "cta",
      "data": {
        "text": "Hafðu samband fyrir verðupplýsingar",
        "link": "/contact"
      }
    }
  ]'::jsonb,
  'published',
  'is',
  '{
    "title": "Grasamín - Fljótandi áburður | Eco Garden",
    "description": "Fljótvirkt fljótandi áburðarefni fyrir gras og græn svæði. Auðvelt í notkun og umhverfisvænt.",
    "image": "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=1200&q=80"
  }'::jsonb
);

-- 2. EcoFective Mosaeyðir
INSERT INTO products (slug, title, category, description, blocks, status, locale, seo)
VALUES (
  'ecofective-mosaeydir',
  'EcoFective Mosaeyðir',
  'Varnarefni',
  'Umhverfisvænn mosaeyðir fyrir pallinn og gangstéttir',
  '[
    {
      "type": "hero",
      "data": {
        "title": "EcoFective Mosaeyðir",
        "subtitle": "Öruggt og skilvirkt gegn mosa á pöllum og steyptum flötum",
        "image": "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1200&q=80"
      }
    },
    {
      "type": "splitImageText",
      "data": {
        "title": "Umhverfisvæn vernd",
        "text": "EcoFective mosaeyðir er unninn úr náttúrulegum innihaldsefnum og skaðar ekki umhverfið. Hentar fyrir heimilisgörðum og atvinnusvæði.",
        "image": "https://images.unsplash.com/photo-1611518041007-5750e6ebf5a6?w=1200&q=80"
      }
    },
    {
      "type": "featureList",
      "data": [
        {
          "title": "100% náttúrulegt",
          "description": "Engin efnasambönd eða eitur"
        },
        {
          "title": "Notendavænt",
          "description": "Tilbúið til notkunar, engin blanda þörf"
        },
        {
          "title": "Öruggt fyrir börnin",
          "description": "Skaðlaust fyrir menn, dýr og plöntur"
        }
      ]
    },
    {
      "type": "specsTable",
      "data": [
        { "label": "Virkni", "value": "Náttúrulegar sýrur" },
        { "label": "Pakkastærð", "value": "750ml, 5L" },
        { "label": "Notkun", "value": "Sprauta beint á mosa" },
        { "label": "Verkun", "value": "Sýnileg eftir 24-48 klst" }
      ]
    },
    {
      "type": "cta",
      "data": {
        "text": "Skoða fleiri EcoFective vörur",
        "link": "/products"
      }
    }
  ]'::jsonb,
  'published',
  'is',
  '{
    "title": "EcoFective Mosaeyðir - Umhverfisvæn lausn | Eco Garden",
    "description": "Náttúrulegur mosaeyðir fyrir palla og gangstéttir. Öruggt fyrir börn og gæludýr.",
    "image": "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1200&q=80"
  }'::jsonb
);

-- 3. Biolan Moltugerðarbox
INSERT INTO products (slug, title, category, description, blocks, status, locale, seo)
VALUES (
  'biolan-moltugerðarbox',
  'Biolan Moltugerðarbox',
  'Moltugerðarvörur',
  'Auðveld heimamoltugerð fyrir eldhúsúrgang',
  '[
    {
      "type": "hero",
      "data": {
        "title": "Biolan Moltugerðarbox",
        "subtitle": "Búðu til þitt eigið mold úr eldhúsúrgangi",
        "image": "https://images.unsplash.com/photo-1592428122575-23b8f0851c22?w=1200&q=80"
      }
    },
    {
      "type": "text",
      "data": "<div class=\"max-w-4xl mx-auto px-6 py-12\"><p class=\"text-lg text-gray-700 leading-relaxed\">Biolan moltugerðarbox er hannað til að gera heimamoltugerð einfalda og skilvirka. Boxið gerir þér kleift að breyta eldhúsúrgangi í hágæða mold fyrir garðinn.</p></div>"
    },
    {
      "type": "featureList",
      "data": [
        {
          "title": "Auðvelt í notkun",
          "description": "Settu inn lífrænan úrgang og blandaðu reglulega"
        },
        {
          "title": "Loftræst hönnun",
          "description": "Eðlileg loftræsting flýtir fyrir moltunarferlinu"
        },
        {
          "title": "Endingargott",
          "description": "Úr endingargóðu plasti, hentar fyrir íslenskt veðurfar"
        }
      ]
    },
    {
      "type": "imageGallery",
      "data": [
        { 
          "url": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
          "alt": "Mold og lífrænt efni"
        },
        { 
          "url": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
          "alt": "Moltugerð"
        }
      ]
    },
    {
      "type": "specsTable",
      "data": [
        { "label": "Rúmmál", "value": "200L eða 400L" },
        { "label": "Efni", "value": "Endurnýtanlegt plast" },
        { "label": "Móttökutími", "value": "4-6 mánuðir" },
        { "label": "Litur", "value": "Grænn eða svartur" }
      ]
    },
    {
      "type": "cta",
      "data": {
        "text": "Panta Biolan moltugerðarbox",
        "link": "/contact"
      }
    }
  ]'::jsonb,
  'published',
  'is',
  '{
    "title": "Biolan Moltugerðarbox - Heimamoltugerð | Eco Garden",
    "description": "Auðvelt og skilvirkt moltugerðarbox fyrir eldhúsúrgang. Búðu til þitt eigið mold fyrir garðinn.",
    "image": "https://images.unsplash.com/photo-1592428122575-23b8f0851c22?w=1200&q=80"
  }'::jsonb
);

-- 4. DLF Grasfræ fyrir Golfvelli
INSERT INTO products (slug, title, category, description, blocks, status, locale, seo)
VALUES (
  'dlf-grasfræ-golfvellir',
  'DLF Grasfræ - Golfvellir',
  'Fræ',
  'Hágæða grasfræ fyrir atvinnusvæði og íþróttavelli',
  '[
    {
      "type": "hero",
      "data": {
        "title": "DLF Grasfræ fyrir Golfvelli",
        "subtitle": "Fagleg grasblöndur fyrir íþróttavelli og atvinnusvæði",
        "image": "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80"
      }
    },
    {
      "type": "splitImageText",
      "data": {
        "title": "Sérhæfðar grasblöndur",
        "text": "DLF er leiðandi framleiðandi grasfræs í Evrópu. Vörurnar eru hannaðar fyrir íslenskar aðstæður og standast mikla umferð og slæmað veðurfar.",
        "image": "https://images.unsplash.com/photo-1563299796-17596ed6b017?w=1200&q=80"
      }
    },
    {
      "type": "featureList",
      "data": [
        {
          "title": "Fyrir atvinnusvæði",
          "description": "Golfvellir, fótboltavellir og íþróttamannvirki"
        },
        {
          "title": "Harðgerð tegundir",
          "description": "Þolir mikla umferð og íslenskt veðurfar"
        },
        {
          "title": "Sérrækt fyrir Norðurlönd",
          "description": "Valin fyrir norrænar aðstæður"
        }
      ]
    },
    {
      "type": "specsTable",
      "data": [
        { "label": "Tegundir", "value": "Rýgresi, Vallarsveifgras, Engirrýgresi" },
        { "label": "Pakkningar", "value": "15 kg, 25 kg" },
        { "label": "Sáning", "value": "3-4 kg á 100 m²" },
        { "label": "Tími til grónunar", "value": "10-14 dagar" }
      ]
    },
    {
      "type": "cta",
      "data": {
        "text": "Fá tilboð í magnpöntun",
        "link": "/contact"
      }
    }
  ]'::jsonb,
  'published',
  'is',
  '{
    "title": "DLF Grasfræ fyrir Golfvelli og Íþróttavelli | Eco Garden",
    "description": "Hágæða grasfræ fyrir atvinnusvæði. Þolir mikla umferð og íslenskt veðurfar.",
    "image": "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80"
  }'::jsonb
);

-- 5. VivaGreen Varnarefni
INSERT INTO products (slug, title, category, description, blocks, status, locale, seo)
VALUES (
  'vivagreen-varnarefni',
  'VivaGreen Varnarefni',
  'Varnarefni',
  'Lífræn varnarefni gegn skordýrum og sjúkdómum',
  '[
    {
      "type": "hero",
      "data": {
        "title": "VivaGreen Varnarefni",
        "subtitle": "Náttúrulegar lausnir gegn plöntuskordýrum",
        "image": "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80"
      }
    },
    {
      "type": "text",
      "data": "<div class=\"max-w-4xl mx-auto px-6 py-12\"><p class=\"text-lg text-gray-700 leading-relaxed\">VivaGreen sérhæfir sig í lífrænum varnarefnum sem vernda plöntur án þess að skaða umhverfið. Vörurnar eru hannaðar fyrir bæði heimilisgörðum og atvinnuræktendur.</p></div>"
    },
    {
      "type": "featureList",
      "data": [
        {
          "title": "Lífrænt og öruggt",
          "description": "Engin eitur eða skaðleg efni"
        },
        {
          "title": "Vítt notkunarsvið",
          "description": "Gegn bladlús, mjöldrofa og öðrum plágum"
        },
        {
          "title": "Öruggt fyrir gæludýr",
          "description": "Skaðlaust fyrir menn, dýr og náttúruna"
        }
      ]
    },
    {
      "type": "specsTable",
      "data": [
        { "label": "Virkni", "value": "Náttúrulegar olíur og plöntuútdrættir" },
        { "label": "Pakkningar", "value": "500ml, 1L, 5L" },
        { "label": "Notkun", "value": "Útúða á plöntur á 7-10 daga fresti" },
        { "label": "Verkun", "value": "Fyrirbyggjandi og meindýraeyðandi" }
      ]
    },
    {
      "type": "cta",
      "data": {
        "text": "Skoða fleiri VivaGreen vörur",
        "link": "/products"
      }
    }
  ]'::jsonb,
  'published',
  'is',
  '{
    "title": "VivaGreen Lífræn Varnarefni | Eco Garden",
    "description": "Náttúruleg varnarefni gegn plöntuskordýrum og sjúkdómum. Öruggt og umhverfisvænt.",
    "image": "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80"
  }'::jsonb
);
