# 🌱 Eco Garden CMS

**Headless CMS fyrir Eco Garden - Umhverfisvænar garðvörur**

Built with Next.js 16, Supabase, and TypeScript.

**🌍 Now with full bilingual support (Icelandic/English)!**

---

## 🚀 Quick Start

### 1. Database Setup

```bash
# Copy CLEAN-SCHEMA.sql to Supabase SQL Editor and run it
```

### 2. Environment Setup

```bash
# Create .env.local with your Supabase credentials
cp .env.example .env.local
```

### 3. Install & Run

```bash
npm install
npm run dev
```

### 4. Add English Translations (Optional)

```bash
# Run the setup script
.\setup-translations.ps1

# Or manually run add-english-translations.sql in Supabase SQL Editor
```

Open [http://localhost:3000](http://localhost:3000)

📖 **Full setup guide:** See [QUICKSTART.md](QUICKSTART.md)

---

## 📚 Documentation

| File                                               | Purpose                     |
| -------------------------------------------------- | --------------------------- |
| **[QUICKSTART.md](QUICKSTART.md)**                 | 5-minute setup guide        |
| **[TRANSLATIONS.md](TRANSLATIONS.md)**             | 🌍 Translation system guide |
| **[CLEAN-SCHEMA.sql](CLEAN-SCHEMA.sql)**           | Copy-paste SQL schema       |
| **[EXAMPLES.md](EXAMPLES.md)**                     | ⭐ Code examples & patterns |
| **[FIXED-ARCHITECTURE.md](FIXED-ARCHITECTURE.md)** | Technical architecture      |
| **[DEPLOYMENT.md](DEPLOYMENT.md)**                 | Production deployment       |
| **[MIGRATION-GUIDE.md](MIGRATION-GUIDE.md)**       | Migrate old data            |

---

## 🌍 Bilingual Support

Eco Garden CMS now supports **Icelandic** and **English**:

- ✅ **UI translations** - All interface elements translated
- ✅ **Content translations** - Pages available in both languages
- ✅ **Language switcher** - Easy toggle in navbar
- ✅ **Persistent choice** - Language saved in localStorage
- ✅ **SEO friendly** - Locale-specific content

**Learn more:** [TRANSLATIONS.md](TRANSLATIONS.md)

---

## 🏗️ Architecture

```
Supabase (Database)
    ↓
sections table (Single Source of Truth)
    ↓
Admin (WRITE) ← Realtime Sync → Public Site (READ)
    ↓
i18n Layer (Translations)
```

### Key Features:

- ✅ **Block-based content** - Hero, Text, CTA, Features
- ✅ **Drag & drop ordering** - Position-based
- ✅ **Draft/Publish workflow** - Status field
- ✅ **Live preview** - `?preview=true` mode
- ✅ **Realtime sync** - Supabase channels
- ✅ **Image upload** - Supabase Storage
- ✅ **RLS security** - Row-level permissions
- ✅ **Bilingual support** - IS/EN translations

---

## 📦 Database Schema

```sql
-- PAGES
pages (id, slug, title, status, updated_at)

-- SECTIONS (content blocks)
sections (id, page_id, type, content, position)

-- PRODUCTS
products (id, title, description, image, category, published)
```

**Single source of truth:** Everything is stored in `sections` table.

---

## 🎨 Supported Section Types

- `hero` - Hero section with heading, text, CTA
- `text` - Rich text content (HTML)
- `cta` - Call-to-action button
- `features` - Features grid with icons
- `featureList` - Vertical feature list
- `image` - Single image with caption
- `imageGallery` - Image grid
- `specsTable` - Specifications table

---

## 🔐 Admin Access

**URL:** http://localhost:3000/admin

**First-time setup:**

1. Sign up via `/login`
2. Run SQL to grant admin role:

```sql
insert into profiles (id, email, role)
select id, email, 'admin'
from auth.users
where email = 'YOUR_EMAIL@example.com'
on conflict (id) do update set role = 'admin';
```

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
git push origin master
# Deploy via Vercel dashboard
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for full guide.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **Styling:** Tailwind CSS 4
- **Editor:** TipTap (Rich text)
- **Language:** TypeScript

---

## 📝 Content Management

### Add a section:

1. Go to `/admin`
2. Click **+ Hero** or **+ Text**
3. Edit content
4. Click **Publish**

### Reorder sections:

- Use ↑↓ buttons to change position
- Changes save automatically to database

### Preview draft content:

- Click **👀 Preview** button
- Opens new tab with `?preview=true`

---

## 🔄 Data Flow

```typescript
// Admin adds section
await supabase.from("sections").insert({
  page_id: pageId,
  type: "hero",
  content: { heading: "...", text: "..." },
  position: 0,
});

// Public site reads
const page = await getPage("home", false); // published only
page.sections.forEach((section) => {
  // Render based on section.type
});
```

---

## 🆘 Troubleshooting

### Database errors?

→ Make sure you ran `CLEAN-SCHEMA.sql`

### Can't upload images?

→ Create `media` bucket in Supabase Storage (public)

### Preview not working?

→ Check URL has `?preview=true`

### Changes not syncing?

→ Enable Realtime in Supabase project settings

---

## 📄 License

MIT

---

## 🙋 Support

- Issues: [GitHub Issues](https://github.com/savargeir-byte/ecogarden-cms/issues)
- Docs: See `/docs` folder
- Email: support@ecogarden.is

---

**Made with 🌱 by Eco Garden team**
