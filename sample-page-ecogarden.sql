-- INSERT SAMPLE ECO GARDEN PAGE
-- Run this after executing the main supabase-setup.sql

INSERT INTO pages (slug, title, content, status, locale, seo)
VALUES (
  'standard-garden-product',
  'Vistvænar garðvörur frá Eco Garden',
  '[
    {
      "type": "hero",
      "data": {
        "heading": "Vistvænar garðvörur frá Eco Garden",
        "text": "Hágæða lausnir fyrir heimili og rekstur",
        "image": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200",
        "imageAlt": "Eco Garden products",
        "ctaText": "Skoða vörur",
        "ctaLink": "#products"
      }
    },
    {
      "type": "text",
      "data": "<p>Eco Garden býður úrval af frábærum vistvænum garðvörum sem ætlaðar eru á neytendamarkað. Við bjóðum einnig vörur fyrir stórnotendur, þar á meðal ræktunarfólk og golf- og fótboltavelli. Vörurnar eru valdar með gæði og umhverfisábyrgð að leiðarljósi.</p>"
    },
    {
      "type": "featureList",
      "data": [
        {
          "title": "Vistvænar vörur",
          "description": "Hágæða lausnir sem eru vænlegar umhverfinu. Allar vörur okkar eru valdar með umhverfisábyrgð að leiðarljósi."
        },
        {
          "title": "Fjölbreytt úrval",
          "description": "Fræ, áburður, varnarefni, moltugerðarvörur og annað fyrir heimilisgörðum og atvinnurekstur."
        },
        {
          "title": "Reynsla & þjónusta",
          "description": "Um 30 ára reynsla og sérfræðiþekking. Starfsfólk okkar hefur víðtæka þekkingu á garðyrkju."
        }
      ]
    },
    {
      "type": "imageGallery",
      "data": [
        {
          "url": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
          "caption": "Vörur frá Eco Garden"
        },
        {
          "url": "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800",
          "caption": "Vistvænar lausnir"
        },
        {
          "url": "https://images.unsplash.com/photo-1566281796817-93bc94d7dbd2?w=800",
          "caption": "Hágæða fræ og plöntur"
        }
      ]
    },
    {
      "type": "specsTable",
      "data": [
        {
          "label": "Næringarefnaskipan NPK",
          "value": "N 26.0%, P 0%, K 0%"
        },
        {
          "label": "Ávinningur",
          "value": "Grænt og sterkt gras innan 24 klst."
        },
        {
          "label": "Notkunarsvæði",
          "value": "Heimilisgörðum og atvinnurekstur"
        },
        {
          "label": "Umbúðir",
          "value": "Umhverfisvænar umbúðir"
        }
      ]
    },
    {
      "type": "cta",
      "data": {
        "text": "Hafðu samband eða pantaðu vörur",
        "buttonText": "Hafa samband",
        "buttonLink": "/contact"
      }
    },
    {
      "type": "text",
      "data": "<h2>Um Eco Garden</h2><p>Eco Garden hefur um árabil boðið upp á hagkvæmar og umhverfisvænar lausnir í garðyrkju og ræktun. Með yfir 30 ára reynslu leggur fyrirtækið áherslu á gæði, þjónustu og samfélagslega ábyrgð.</p><p>Okkar birgjar eru valdir af kostgæfni og vörur sem standast ströngustu gæða- og umhverfiskröfur koma til greina.</p>"
    }
  ]'::jsonb,
  'published',
  'is',
  '{
    "title": "Vistvænar garðvörur frá Eco Garden",
    "description": "Hágæða garðvörur og ræktunarlausnir frá Eco Garden. Yfir 30 ára reynsla í umhverfisvænum lausnum fyrir heimili og atvinnurekstur.",
    "image": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200"
  }'::jsonb
)
ON CONFLICT (slug) DO UPDATE
SET 
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  status = EXCLUDED.status,
  locale = EXCLUDED.locale,
  seo = EXCLUDED.seo,
  published_at = NOW(),
  updated_at = NOW();
