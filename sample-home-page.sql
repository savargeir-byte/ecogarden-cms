-- Sample Home Page for EcoGarden
-- This creates the main homepage with real Eco Garden content
-- Execute this in Supabase SQL Editor after running supabase-setup.sql

INSERT INTO pages (slug, title, status, locale, blocks, seo)
VALUES (
  'home',
  'Eco Garden - Vistvænar lausnir',
  'published',
  'is',
  '[
    {
      "type": "hero",
      "data": {
        "title": "Eco Garden – Vistvænar lausnir fyrir garð og ræktun",
        "subtitle": "Hágæða garðvörur sem virka – fyrir heimili, bændur og græna drauma",
        "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
      }
    },
    {
      "type": "text",
      "data": "<div class=\"max-w-4xl mx-auto px-6 py-16 text-center\"><p class=\"text-xl text-gray-700 leading-relaxed\">Eco Garden sérhæfir sig í umhverfisvænum garðvörum fyrir neytendamarkað og stórnotendur. Við bjóðum fjölbreytt úrval áburðar, fræja, varnarefna og moltugerðarvöru sem leysir raunveruleg vandamál í garðyrkju og ræktun. Allar vörur eru valdar með gæði og virðingu fyrir náttúrunni í för.</p></div>"
    },
    {
      "type": "featureList",
      "data": [
        {
          "title": "Umhverfisvænar vörur",
          "description": "Vörur sem virða náttúruna og stuðla að sjálfbærni."
        },
        {
          "title": "Fyrir heimili & atvinnu",
          "description": "Fræ, áburðir og lausnir fyrir garða, golfvelli og akrana."
        },
        {
          "title": "Reynsla og þekking",
          "description": "Um 30 ára samanlögð reynsla í þjónustu og sölu."
        }
      ]
    },
    {
      "type": "imageGallery",
      "data": [
        { 
          "url": "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
          "alt": "Grasrækt og græn svæði"
        },
        { 
          "url": "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
          "alt": "Umhverfisvænir áburðir"
        },
        { 
          "url": "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80",
          "alt": "Heilbrigðar plöntur"
        }
      ]
    },
    {
      "type": "cta",
      "data": {
        "text": "Skoða vörur",
        "link": "/products"
      }
    }
  ]'::jsonb,
  '{
    "title": "Eco Garden – Vistvænar garðvörur fyrir Ísland",
    "description": "Hágæða umhverfisvænar garðvörur fyrir heimili og atvinnu. Um 30 ára reynsla í þjónustu og sölu garð- og gróðurvara.",
    "image": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80"
  }'::jsonb
)
ON CONFLICT (slug) DO UPDATE
SET
  blocks = EXCLUDED.blocks,
  seo = EXCLUDED.seo,
  status = EXCLUDED.status,
  updated_at = NOW();
