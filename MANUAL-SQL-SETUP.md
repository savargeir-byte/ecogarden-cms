**Supabase SQL Setup Manual**

Þar sem API aðgangur virkar ekki sjálfkrafa, hér eru skrefin til að setja upp gagnagrunninn handvirkt:

## 🔗 Opna Supabase SQL Editor

1. Farðu á: https://supabase.com/dashboard/project/irqhaetqxulvylwolhqe/sql/new

## 📋 Keyra SQL í þessari röð:

### 1️⃣ GRUNNUPPSETNING (supabase-setup.sql)

```sql
-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  role TEXT DEFAULT 'editor'
);

-- Pages table
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE,
  title TEXT,
  blocks JSONB DEFAULT '[]'::jsonb,
  seo JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMP,
  locale TEXT DEFAULT 'is',
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Products table  
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE,
  title TEXT,
  category TEXT,
  description TEXT,
  blocks JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMP,
  locale TEXT DEFAULT 'is',
  seo JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Product versions
CREATE TABLE IF NOT EXISTS product_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  blocks JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

-- Product views (analytics)
CREATE TABLE IF NOT EXISTS product_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  slug TEXT,
  user_agent TEXT,
  country TEXT,
  device TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Product categories
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE,
  slug TEXT UNIQUE,
  description TEXT
);

-- Page views
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Ýttu á RUN** ✅

---

### 2️⃣ FORSÍÐA (sample-home-page.sql)

```sql
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
      "data": "<div class=\"max-w-4xl mx-auto px-6 py-16 text-center\"><p class=\"text-xl text-gray-700 leading-relaxed\">Eco Garden sérhæfir sig í umhverfisvænum garðvörum fyrir neytendamarkað og stórnotendur. Við bjóðum fjölbreytt úrval áburðar, fræja, varnarefna og moltugerðarvöru sem leysir raunveruleg vandamál í garðyrkju og ræktun.</p></div>"
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
```

**Ýttu á RUN** ✅

---

### 3️⃣ FLOKKAR (categories)

```sql
INSERT INTO product_categories (name, slug, description)
VALUES 
  ('Fræ', 'frae', 'Grasfræ og plöntufræ'),
  ('Áburður', 'aburður', 'Fljótandi og fast áburð'),
  ('Varnarefni', 'varnarefni', 'Umhverfisvæn varnarefni'),
  ('Moltugerðarvörur', 'moltugerðarvörur', 'Moltugerðarbox og fylgihlutir')
ON CONFLICT (slug) DO NOTHING;
```

**Ýttu á RUN** ✅

---

## ✅ Núna er gagnagrunnurinn tilbúinn!

**Opna:** http://localhost:3000

Þú ættir að sjá Eco Garden forsíðuna! 🪴
