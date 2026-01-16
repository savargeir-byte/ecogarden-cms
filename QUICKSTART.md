# 🚀 QUICK START GUIDE

## 1️⃣ Supabase Setup (5 mínútur)

### Stofna Supabase project

1. Farðu á https://supabase.com
2. "New Project" → veldu nafn og lykilorð
3. Bíddu í 2 mín meðan project er að buast til

### Keyra SQL schema

1. Farðu í Supabase Dashboard → **SQL Editor**
2. Afritaðu **ALLT** úr `CLEAN-SCHEMA.sql`
3. Límdu og smelltu **RUN**
4. ✅ Ef þú sérð "Success" þá er database tilbúinn!

### Búa til Storage bucket

1. Farðu í **Storage** → **New bucket**
2. Name: `media`
3. **Public bucket**: ✅ (hakað við)
4. Create bucket

---

## 2️⃣ Local Development

### Environment variables

Búðu til `.env.local` skrá:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ÞITT-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...ÞINN_ANON_KEY
```

**Hvar finn ég þetta?**

- Supabase Dashboard → **Settings** → **API**
- Project URL = `NEXT_PUBLIC_SUPABASE_URL`
- `anon` `public` = `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Installa og keyra

```bash
npm install
npm run dev
```

Opnaðu http://localhost:3000

---

## 3️⃣ Fyrsta Admin Notandi

### Valkostur A: Slökkva á auth (dev only)

Middleware.ts leyfir alla aðgang núna, svo þú getur farið beint á:

- http://localhost:3000/admin

### Valkostur B: Proper auth (production)

1. Farðu á http://localhost:3000/login
2. Sláðu inn email
3. Athugaðu email fyrir magic link
4. Smelltu á linkinn
5. Farðu í Supabase → **SQL Editor** og keyrðu:

```sql
-- Bættu þér við sem admin
insert into profiles (id, email, role)
select id, email, 'admin'
from auth.users
where email = 'ÞIN_EMAIL@example.com'
on conflict (id) do update set role = 'admin';
```

---

## 4️⃣ Byrja að nota CMS

### Opna Admin

http://localhost:3000/admin

### Bæta við sections

1. Smelltu á **+ Hero** eða **+ Text** í hliðarstikunni
2. Breyttu content
3. Smelltu **Done**
4. Smelltu **Publish**

### Preview

- Smelltu **👀 Preview** til að sjá draft content
- Opnar nýjan tab með `?preview=true`

### Public site

http://localhost:3000/home

---

## 5️⃣ Architecture Overview

```
┌─────────────────────────────────────────┐
│         SUPABASE DATABASE                │
│                                          │
│  ┌──────────┐      ┌────────────┐      │
│  │  pages   │◄─────│  sections  │      │
│  │  table   │  FK  │   table    │      │
│  └──────────┘      └────────────┘      │
│                                          │
└──────────────┬───────────────────────────┘
               │
      ┌────────┴────────┐
      │                 │
┌─────▼──────┐   ┌─────▼─────┐
│   ADMIN    │   │   PUBLIC  │
│   (WRITE)  │   │   (READ)  │
└────────────┘   └───────────┘
      │                 │
      └────────┬────────┘
               │
        Realtime Sync
```

### Hvernig data flæðir:

1. **Admin bætir við section:**

   ```sql
   INSERT INTO sections (page_id, type, content, position)
   VALUES (uuid, 'hero', {...}, 0)
   ```

2. **Admin færir section upp:**

   ```sql
   UPDATE sections SET position = 1 WHERE id = uuid
   ```

3. **Admin publishar:**

   ```sql
   UPDATE pages SET status = 'published' WHERE id = uuid
   ```

4. **Public site les:**
   ```sql
   SELECT * FROM pages
   JOIN sections ON sections.page_id = pages.id
   WHERE slug = 'home' AND status = 'published'
   ORDER BY sections.position
   ```

---

## 6️⃣ Data Structure

### Section format:

```typescript
{
  id: uuid,
  page_id: uuid,
  type: "hero",
  content: {
    heading: "Welcome to Eco Garden",
    text: "Sustainable solutions",
    ctaText: "Learn More",
    ctaLink: "/products"
  },
  position: 0
}
```

### Supported types:

- `hero` - Hero section með heading, text, CTA
- `text` - Rich text með HTML
- `cta` - Call to action takki
- `features` - Features grid
- `image` - Stakstæð mynd
- `featureList` - Listi af features

---

## 7️⃣ Common Tasks

### Búa til nýja síðu:

```sql
INSERT INTO pages (slug, title, status)
VALUES ('about', 'Um okkur', 'draft');
```

Síðan verður aðgengileg á: `http://localhost:3000/about`

### Bæta við section handvirkt:

```sql
INSERT INTO sections (page_id, type, content, position)
SELECT id, 'text', '{"html": "<h1>Hello</h1>"}', 0
FROM pages WHERE slug = 'about';
```

### Eyða síðu (eyðir líka öllum sections):

```sql
DELETE FROM pages WHERE slug = 'about';
-- sections eru sjálfkrafa eydd (cascade)
```

---

## 8️⃣ Troubleshooting

### Problem: "Module not found: Can't resolve @supabase..."

**Fix:** `npm install`

### Problem: Admin sýnir ekki sections

**Fix:** Athugaðu að þú hafir keyrt `CLEAN-SCHEMA.sql`

### Problem: Images ekki að uploada

**Fix:** Búðu til `media` bucket í Supabase Storage (public)

### Problem: Preview sýnir ekki draft content

**Fix:** Athugaðu að URL hafi `?preview=true`

---

## 9️⃣ Next Steps

- [ ] Bæta við fleiri section types
- [ ] Implementa @dnd-kit fyrir drag-drop
- [ ] Bæta við SEO metadata editor
- [ ] Deploy á Vercel
- [ ] Tengja við custom domain

---

## 📚 Docs

- **FIXED-ARCHITECTURE.md** - Complete technical docs
- **CLEAN-SCHEMA.sql** - Database schema (copy-paste ready)
- **DEPLOYMENT.md** - Production deployment guide

---

## ✅ Checklist

Before going live:

- [ ] SQL schema keyrt
- [ ] Media bucket búinn til
- [ ] Admin user búinn til
- [ ] Environment variables sett upp
- [ ] Tested locally
- [ ] Content published
- [ ] Ready for deployment

🎉 **Til hamingju! Þú ert núna með working CMS!**
