# Advanced CMS Features

## ✅ Implemented

### 1️⃣ Draft/Publish Workflow
- **Database**: `products.status` (draft/published/archived) + `published_at`
- **Public filtering**: Only `status='published'` shown
- **Admin access**: See all statuses
- **Publish button**: Sets status + timestamp in [app/admin/products/edit/[slug]/page.tsx](app/admin/products/edit/[slug]/page.tsx)

### 2️⃣ 👀 Live Preview Toggle
- **Middleware**: [middleware.ts](middleware.ts) checks `admin-preview` cookie
- **URL param**: Adds `?preview=true` for admin users
- **Product page**: [app/products/[slug]/page.tsx](app/products/[slug]/page.tsx) reads `searchParams.preview`
- **Admin toggle**: Click "👀 Preview" button in product editor

**How it works:**
```typescript
// 1. Admin clicks Preview button
document.cookie = "admin-preview=true; path=/; max-age=3600";

// 2. Middleware adds ?preview=true
// 3. Product page shows draft content if preview=true
if (!preview) {
  query = query.eq("status", "published");
}
```

### 3️⃣ 🔄 Realtime Sync
- **Supabase Channels**: Live database updates
- **Product editor**: [app/admin/products/edit/[slug]/page.tsx](app/admin/products/edit/[slug]/page.tsx)
- **Auto-sync**: Multiple editors see changes instantly

**Implementation:**
```typescript
const channel = supabase
  .channel(`product-${params.slug}`)
  .on("postgres_changes", {
    event: "UPDATE",
    schema: "public",
    table: "products",
    filter: `slug=eq.${params.slug}`
  }, (payload) => {
    setBlocks(payload.new.blocks);
  })
  .subscribe();
```

### 4️⃣ 📦 Version History
- **Database**: `product_versions` table ([products-setup.sql](products-setup.sql))
- **Auto-save**: Creates snapshot every 2 seconds
- **Publish**: Saves version before publishing
- **Fields**: `product_id`, `blocks`, `created_at`, `created_by`

**Saved on:**
- Every auto-save (2s delay)
- Before publish
- Manual saves

**Future TODO:**
- Version list UI
- Rollback button
- Side-by-side diff view

### 5️⃣ 📊 Product Analytics
- **Database**: `product_views` table ([products-setup.sql](products-setup.sql))
- **Tracking**: Server-side in [app/products/[slug]/page.tsx](app/products/[slug]/page.tsx)
- **Dashboard**: [app/admin/stats/page.tsx](app/admin/stats/page.tsx) shows:
  - 📄 Page views (left column)
  - 🛍️ Product views (right column)

**Data collected:**
- `product_id`
- `slug`
- `user_agent`
- `country` (future)
- `device` (future)
- `created_at`

---

## Database Schema

### product_versions
```sql
CREATE TABLE product_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  blocks JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);
```

### product_views
```sql
CREATE TABLE product_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  slug TEXT,
  user_agent TEXT,
  country TEXT,
  device TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Next Steps

### Manual Setup (Required)
1. **Execute SQL**: Run [products-setup.sql](products-setup.sql) in Supabase SQL Editor
2. **Test preview**: Click "👀 Preview" in product editor, verify draft content visible
3. **Test realtime**: Open product editor in 2 tabs, edit in one, see update in other
4. **Test analytics**: Visit product pages, check /admin/stats

### Future Enhancements
- **Version UI**: List all versions with timestamps, preview, restore
- **Analytics**: Country/device parsing, charts, date range filters
- **Conflict resolution**: Warn if multiple editors change same field
- **Change tracking**: Highlight what changed between versions
- **Scheduled publish**: Set future publish date
- **Audit log**: Who changed what when

---

## Architecture Notes

### Why Realtime Sync?
- Google Docs-style collaboration
- Prevents conflicting edits
- Live preview for team members

### Why Version History?
- Undo accidental changes
- See content evolution
- Compliance/audit requirements

### Why Preview Mode?
- Test changes before publish
- Share draft links with stakeholders
- Single URL for draft + published

### Performance
- **Realtime**: Uses WebSockets, minimal overhead
- **Analytics**: Indexed by `product_id` and `slug`
- **Versions**: Only stores snapshots on change (not every keystroke)
