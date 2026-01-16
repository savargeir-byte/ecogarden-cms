# 🏗️ FIXED ARCHITECTURE - Setup Guide

**Date:** January 15, 2026  
**Status:** ✅ Architecture Fixed - Single Source of Truth

---

## 🎯 What Changed?

### ❌ BEFORE (Broken):

- Admin had `page_sections` table that didn't exist in SQL
- Public site read from `pages.content` JSONB array
- Two different data structures that didn't sync
- Local state in admin that wasn't saved to DB

### ✅ AFTER (Fixed):

```
Supabase (DB + Storage + Realtime)
        ↓
   sections table
        ↓
CMS Admin (WRITE) ← Realtime → Public Site (READ)
```

---

## 📊 Database Schema

### `pages` table

```sql
create table pages (
  id uuid primary key,
  slug text unique not null,
  title text,
  status text check (status in ('draft', 'published')),
  published_at timestamptz,
  locale text default 'is',
  seo jsonb,
  updated_at timestamptz default now()
);
```

### `sections` table (NEW - SINGLE SOURCE OF TRUTH)

```sql
create table sections (
  id uuid primary key,
  page_id uuid references pages(id) on delete cascade,
  type text not null,           -- hero | features | text | cta | etc.
  content jsonb not null,        -- actual data for the section
  position int not null,         -- for ordering
  created_at timestamptz,
  updated_at timestamptz
);
```

### `products` table

```sql
create table products (
  id uuid primary key,
  slug text unique not null,
  title text,
  description text,
  image text,
  category text,
  price numeric(10,2),
  status text check (status in ('draft', 'published')),
  blocks jsonb,                  -- product uses blocks array
  published_at timestamptz,
  created_at timestamptz,
  updated_at timestamptz
);
```

---

## 🔄 How Data Flows Now

### 1️⃣ Admin adds a section:

```typescript
await supabase.from("sections").insert({
  page_id: pageId,
  type: "hero",
  content: { heading: "...", text: "..." },
  position: 0,
});
```

### 2️⃣ Admin drags section up:

```typescript
await supabase
  .from("sections")
  .update({ position: newIndex })
  .eq("id", sectionId);
```

### 3️⃣ Admin publishes page:

```typescript
await supabase
  .from("pages")
  .update({
    status: "published",
    published_at: new Date().toISOString(),
  })
  .eq("id", pageId);
```

### 4️⃣ Public site reads:

```typescript
const page = await getPage("home", false); // false = only published
// Returns: { id, slug, title, status, sections: [...] }
page.sections.forEach((section) => {
  // { id, type, content, position }
});
```

---

## 🔐 Preview Mode

### Admin clicks "Preview":

```typescript
window.open("/home?preview=true", "_blank");
```

### Public page checks:

```typescript
const preview = searchParams?.preview === "true";
const page = await getPage(slug, preview);
// If preview=true, shows draft content
```

---

## ⚡ Realtime Sync

### Admin editor listens:

```typescript
supabase
  .channel("sections-changes")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "sections",
    },
    () => {
      loadPage(); // Auto-refresh when DB changes
    }
  )
  .subscribe();
```

### What happens:

1. Editor A adds a section → DB updates
2. Realtime broadcasts change
3. Editor B's page auto-refreshes
4. Both editors see the same data

---

## 📸 Image Upload Flow

### 1. Upload to Supabase Storage:

```typescript
const { data, error } = await supabase.storage
  .from("media")
  .upload(`images/${filename}`, file);
```

### 2. Get public URL:

```typescript
const { data } = supabase.storage.from("media").getPublicUrl(filePath);
```

### 3. Save to section content:

```typescript
await supabase
  .from("sections")
  .update({
    content: {
      ...content,
      image: data.publicUrl,
    },
  })
  .eq("id", sectionId);
```

---

## 🚀 Setup Instructions

### 1. Run SQL Schema:

```bash
# In Supabase Dashboard → SQL Editor
# Paste and run: supabase-setup.sql
```

### 2. Create Storage Bucket:

```sql
-- Supabase Dashboard → Storage → New Bucket
-- Name: media
-- Public: ✅ Yes
```

### 3. Create First Admin:

```sql
-- After user signs up via Auth UI
insert into profiles (id, email, role)
select id, email, 'admin'
from auth.users
where email = 'YOUR_EMAIL@example.com'
on conflict (id) do update set role = 'admin';
```

### 4. Environment Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## ✅ What Works Now

- ✅ Admin CRUD operations directly on `sections` table
- ✅ Drag & drop = position update in DB
- ✅ Public site reads from same `sections` table
- ✅ Preview mode shows draft content
- ✅ Realtime sync between editors
- ✅ Image upload to Supabase Storage
- ✅ RLS policies for security
- ✅ Draft/Publish workflow

---

## 🎨 Section Types Supported

| Type             | Fields                          | Editor Status  |
| ---------------- | ------------------------------- | -------------- |
| `hero`           | heading, text, ctaText, ctaLink | ✅ Implemented |
| `features`       | heading, items[]                | ⚠️ Basic       |
| `featureList`    | array of {title, description}   | ⚠️ JSON edit   |
| `text`           | html                            | ✅ Rich editor |
| `cta`            | text, buttonText, buttonLink    | ✅ Implemented |
| `image`          | url, alt, caption               | ⚠️ JSON edit   |
| `imageGallery`   | array of {url, caption}         | ⚠️ JSON edit   |
| `specsTable`     | array of {label, value}         | ⚠️ JSON edit   |
| `splitImageText` | various                         | ⚠️ JSON edit   |

---

## 🔧 Next Steps

### Priority 1: Complete Section Editors

- [ ] Features editor (drag-drop items)
- [ ] Feature List editor
- [ ] Image Gallery editor
- [ ] Specs Table editor

### Priority 2: UX Improvements

- [ ] @dnd-kit for drag-drop (nicer than ↑↓ buttons)
- [ ] Section templates/presets
- [ ] Duplicate section button
- [ ] Undo/Redo

### Priority 3: Advanced Features

- [ ] Version history UI
- [ ] Rollback functionality
- [ ] Multi-language support
- [ ] Analytics dashboard

---

## 📝 Key Takeaways

1. **Supabase is the single source of truth** - no local state
2. **Drag & drop = position update** - not array manipulation
3. **Admin and Public read from same tables** - no sync issues
4. **Preview mode = query parameter** - simple and effective
5. **Realtime = automatic sync** - no manual refresh needed

---

## 🆘 Troubleshooting

### Problem: Admin can't see sections

**Solution:** Check RLS policies - editor role must exist in profiles table

### Problem: Images not uploading

**Solution:** Create `media` bucket in Supabase Storage, make it public

### Problem: Preview shows published content

**Solution:** Check `?preview=true` query param is in URL

### Problem: Changes not syncing

**Solution:** Check Realtime is enabled in Supabase project settings
