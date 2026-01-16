# 📝 Code Examples

## 1️⃣ Supabase Client

**lib/supabase.ts**

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

---

## 2️⃣ Admin CMS Operations

### Add Section

```typescript
import { addSection } from "@/lib/cms";

// Add a hero section
await addSection(pageId, "hero", {
  heading: "Welcome",
  text: "Your description",
  ctaText: "Learn More",
  ctaLink: "/about",
});
```

### Update Content

```typescript
import { updateSection } from "@/lib/cms";

await updateSection(sectionId, {
  heading: "Updated heading",
  text: "Updated text",
});
```

### Reorder Sections (Drag & Drop)

```typescript
import { reorderSections } from "@/lib/cms";

// After drag & drop, pass new order
await reorderSections([
  { id: "section-1" },
  { id: "section-3" }, // moved up
  { id: "section-2" }, // moved down
]);
```

### Publish/Unpublish Page

```typescript
import { publishPage, unpublishPage } from "@/lib/cms";

// Publish
await publishPage(pageId);

// Set back to draft
await unpublishPage(pageId);
```

---

## 3️⃣ Public Site (Read-Only)

### Render Page with Sections

```typescript
import { supabase } from "@/lib/supabase";
import Hero from "@/components/sections/Hero";
import TextBlock from "@/components/sections/TextBlock";
import CTA from "@/components/sections/CTA";

export default async function Page({ searchParams }: any) {
  const preview = searchParams.preview === "true";
  const status = preview ? "draft" : "published";

  const { data: page } = await supabase
    .from("pages")
    .select("*, sections(*)")
    .eq("slug", "home")
    .eq("status", status)
    .single();

  if (!page) return <div>Page not found</div>;

  return (
    <>
      {page.sections
        .sort((a, b) => a.position - b.position)
        .map((section) => {
          switch (section.type) {
            case "hero":
              return <Hero key={section.id} data={section.content} />;
            case "text":
              return <TextBlock key={section.id} data={section.content} />;
            case "cta":
              return <CTA key={section.id} data={section.content} />;
            default:
              return null;
          }
        })}
    </>
  );
}
```

### Using SectionRenderer (Cleaner)

```typescript
import { supabase } from "@/lib/supabase";
import SectionRenderer from "@/components/SectionRenderer";

export default async function Page({ searchParams }: any) {
  const preview = searchParams?.preview === "true";

  const { data: page } = await supabase
    .from("pages")
    .select("*, sections(*)")
    .eq("slug", "home")
    .eq("status", preview ? "draft" : "published")
    .single();

  const sections =
    page?.sections?.sort((a, b) => a.position - b.position) || [];

  return <SectionRenderer blocks={sections} />;
}
```

---

## 4️⃣ Realtime Sync (Admin)

```typescript
import { supabase } from "@/lib/supabase";

function setupRealtime() {
  const channel = supabase
    .channel("sections-changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "sections",
      },
      (payload) => {
        console.log("Section changed:", payload);
        // Refresh your UI
        loadPage();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
```

---

## 5️⃣ Direct Database Queries

### Get all sections for a page

```typescript
const { data: sections } = await supabase
  .from("sections")
  .select("*")
  .eq("page_id", pageId)
  .order("position", { ascending: true });
```

### Add section with auto-position

```typescript
// Get current max position
const { data: lastSection } = await supabase
  .from("sections")
  .select("position")
  .eq("page_id", pageId)
  .order("position", { ascending: false })
  .limit(1)
  .single();

const nextPosition = (lastSection?.position ?? -1) + 1;

// Insert new section
await supabase.from("sections").insert({
  page_id: pageId,
  type: "hero",
  content: { heading: "Welcome" },
  position: nextPosition,
});
```

### Update section position

```typescript
await supabase
  .from("sections")
  .update({ position: newPosition })
  .eq("id", sectionId);
```

### Delete section

```typescript
await supabase.from("sections").delete().eq("id", sectionId);
```

---

## 6️⃣ Section Content Examples

### Hero Section

```typescript
{
  type: 'hero',
  content: {
    heading: 'Welcome to Eco Garden',
    text: 'Sustainable garden solutions',
    image: 'https://...',
    imageAlt: 'Garden photo',
    ctaText: 'Shop Now',
    ctaLink: '/products'
  }
}
```

### Text Section

```typescript
{
  type: 'text',
  content: {
    html: '<h2>About Us</h2><p>We provide eco-friendly products...</p>'
  }
}
```

### CTA Section

```typescript
{
  type: 'cta',
  content: {
    text: 'Ready to get started?',
    buttonText: 'Contact Us',
    buttonLink: '/contact'
  }
}
```

### Features Section

```typescript
{
  type: 'features',
  content: {
    heading: 'Why Choose Us',
    items: [
      {
        icon: '🌱',
        title: 'Eco-Friendly',
        text: 'All products are sustainable'
      },
      {
        icon: '✅',
        title: 'Quality',
        text: 'High-quality materials'
      }
    ]
  }
}
```

---

## 7️⃣ Creating a New Page

### In SQL

```sql
INSERT INTO pages (slug, title, status)
VALUES ('about', 'About Us', 'draft');
```

### Programmatically

```typescript
const { data: newPage } = await supabase
  .from("pages")
  .insert({
    slug: "about",
    title: "About Us",
    status: "draft",
  })
  .select()
  .single();

// Add first section
await addSection(newPage.id, "hero", {
  heading: "About Eco Garden",
  text: "Learn more about our story",
});
```

---

## 8️⃣ URL Patterns

### Public URLs

```
/home              → Home page (published only)
/about             → About page (published only)
/home?preview=true → Home page (draft content for logged-in users)
```

### Admin URLs

```
/admin             → CMS editor for home page
/login             → Authentication
```

---

## 9️⃣ Environment Variables

**.env.local**

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

Access in code:

```typescript
process.env.NEXT_PUBLIC_SUPABASE_URL;
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
```

---

## 🔟 Common Patterns

### Loading State

```typescript
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function load() {
    const data = await getPage("home");
    setData(data);
    setLoading(false);
  }
  load();
}, []);

if (loading) return <div>Loading...</div>;
```

### Error Handling

```typescript
try {
  await updateSection(id, content);
  alert("Saved!");
} catch (error) {
  console.error(error);
  alert("Failed to save");
}
```

### Optimistic Updates

```typescript
// Update UI immediately
setSections(newSections);

// Then save to DB
try {
  await reorderSections(newSections);
} catch (error) {
  // Revert on error
  setSections(oldSections);
}
```

---

## 📚 More Examples

See also:

- `app/admin/page.tsx` - Full CMS implementation
- `app/page.tsx` - Public site rendering
- `components/SectionRenderer.tsx` - Section rendering logic
- `lib/cms.ts` - All helper functions
