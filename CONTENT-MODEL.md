# 🔒 CONTENT MODEL - LOCKED SPECIFICATION

**Last Updated:** January 15, 2026  
**Status:** 🔐 LOCKED - Do not modify without architecture review

---

## 📦 Block Type Definitions

### 1. HERO Section
```typescript
{
  type: "hero",
  data: {
    heading: string,        // Required, max 100 chars
    text: string,           // Required, max 300 chars
    image: string,          // URL, required
    imageAlt: string,       // Required for a11y
    ctaText?: string,       // Optional, max 30 chars
    ctaLink?: string        // Optional, must be valid URL
  }
}
```

**Visual:**
- 2-column grid on desktop (image + text)
- Single column on mobile (image top, text below)
- Fluid typography with clamp()
- Focus ring on CTA button

---

### 2. FEATURES Section
```typescript
{
  type: "features",
  data: {
    heading: string,        // Required, max 80 chars
    items: Array<{
      icon: string,         // Emoji or icon, required
      title: string,        // Required, max 50 chars
      text: string          // Required, max 150 chars
    }>                      // Min 2, max 6 items
  }
}
```

**Visual:**
- Responsive grid: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop)
- Card layout with shadow
- Centered text

---

### 3. FEATURE LIST Section
```typescript
{
  type: "featureList",
  data: Array<{
    title: string,          // Required, max 80 chars
    description: string     // Required, max 300 chars
  }>                        // Min 1, max 8 items
}
```

**Visual:**
- Vertical stacked list
- White cards with shadow
- Full-width on mobile
- Ideal for detailed feature descriptions

---

### 4. IMAGE GALLERY Section
```typescript
{
  type: "imageGallery",
  data: Array<{
    url: string,            // Required, image URL
    caption?: string        // Optional, max 100 chars
  }>                        // Min 1, max 12 images
}
```

**Visual:**
- Responsive grid: 1 col → 2 cols → 3 cols
- Aspect ratio maintained (4:3)
- Hover zoom effect
- Optional captions

---

### 5. SPECS TABLE Section
```typescript
{
  type: "specsTable",
  data: Array<{
    label: string,          // Required, max 80 chars
    value: string           // Required, max 200 chars
  }>                        // Min 1, max 20 rows
}
```

**Visual:**
- Two-column table
- Label (left) | Value (right)
- Zebra striping for readability
- Full responsive layout

---

### 6. CTA Section
```typescript
{
  type: "cta",
  data: {
    text: string,           // Required, max 100 chars
    buttonText: string,     // Required, max 30 chars
    buttonLink: string      // Required, must be valid URL
  }
}
```

**Visual:**
- Full-width gradient background
- Centered content
- High-contrast button
- Focus ring for accessibility

---

### 4. TEXT Block
```typescript
{
  type: "text",
  data: {
    content: string         // HTML from Quill editor
  }
}
```

**Visual:**
- Container max-width
- Typography styles applied
- Sanitized HTML output

---

### 5. IMAGE Block
```typescript
{
  type: "image",
  data: {
    url: string,            // Required, Supabase Storage URL
    alt: string,            // Required for a11y
    caption?: string        // Optional, max 200 chars
  }
}
```

**Visual:**
- SmartImage component (Next.js optimization)
- Lazy loading
- Aspect ratio maintained
- Optional caption below

---

### 6. BANNER Block
```typescript
{
  type: "banner",
  data: {
    text: string,           // Required, max 200 chars
    type: "info" | "warning" | "success" | "error"
  }
}
```

**Visual:**
- Full-width colored bar
- Icon based on type
- Dismissible (optional)

---

## 🚫 VALIDATION RULES (Backend Enforcement)

### Content Limits
- **Max blocks per page:** 12
- **Max hero heading:** 100 characters
- **Max feature items:** 6
- **Max image size:** 5MB
- **Allowed image formats:** jpg, png, webp, avif

### Required Fields
- All `heading` fields are required
- All images must have `alt` text
- All CTAs must have both `text` and `link`

### Immutable Fields
- `type` cannot change after block creation
- `slug` cannot change after page publication

---

## 🎨 SECTION PRESETS

Users can click these buttons in BlockEditor:

```typescript
// lib/sectionPresets.ts
export const sectionPresets = {
  hero: {
    type: "hero",
    data: {
      heading: "Welcome to Our Site",
      text: "Transform your business with our solutions",
      image: "/placeholder-hero.jpg",
      imageAlt: "Hero image",
      ctaText: "Get Started",
      ctaLink: "#"
    }
  },
  features: {
    type: "features",
    data: {
      heading: "Our Features",
      items: [
        { icon: "⚡", title: "Fast", text: "Lightning-fast performance" },
        { icon: "🔒", title: "Secure", text: "Bank-level security" },
        { icon: "📱", title: "Responsive", text: "Works on all devices" }
      ]
    }
  },
  cta: {
    type: "cta",
    data: {
      text: "Ready to get started?",
      buttonText: "Sign Up Now",
      buttonLink: "/signup"
    }
  }
};
```

---

## 🔄 RENDERING LOGIC

### SectionRenderer Component
```tsx
// components/SectionRenderer.tsx
export default function SectionRenderer({ blocks }: { blocks: any[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "hero": return <Hero key={index} data={block.data} />;
          case "features": return <Features key={index} data={block.data} />;
          case "cta": return <CTA key={index} data={block.data} />;
          case "text": return <TextBlock key={index} data={block.data} />;
          case "image": return <ImageBlock key={index} data={block.data} />;
          case "banner": return <Banner key={index} data={block.data} />;
          default: return null;
        }
      })}
    </>
  );
}
```

---

## 📊 DATABASE STRUCTURE

### pages.content (JSONB)
```json
[
  {
    "type": "hero",
    "data": {
      "heading": "Welcome",
      "text": "Description",
      "image": "https://...",
      "imageAlt": "Hero image",
      "ctaText": "Learn More",
      "ctaLink": "/about"
    }
  },
  {
    "type": "features",
    "data": {
      "heading": "Why Choose Us",
      "items": [...]
    }
  }
]
```

### pages.seo (JSONB)
```json
{
  "title": "Page Title - 60 chars",
  "description": "Meta description - 160 chars",
  "image": "https://...og-image.jpg"
}
```

---

## ✅ CHANGE MANAGEMENT

### To Add New Block Type:
1. Update this document with full spec
2. Add TypeScript interface
3. Create section component in `components/sections/`
4. Add to `SectionRenderer` switch statement
5. Add preset to `sectionPresets.ts`
6. Add to BlockEditor UI
7. Test on mobile/tablet/desktop
8. Update ARCHITECTURE-VALIDATION.md

### To Modify Existing Block:
- ⚠️ **Requires architecture review**
- Must maintain backward compatibility
- Update version history in DB

---

## 🎯 GUI IMPLEMENTATION RULES

### Admin Editor MUST:
- Show visual preview of each block
- Allow inline editing of text fields
- Provide image upload for media fields
- Validate all required fields before save
- Show character count for limited fields

### Admin Editor MUST NOT:
- Allow invalid block structures
- Let users exceed character limits
- Save without required fields
- Allow XSS in rich text
- Break mobile layout

---

**This content model is LOCKED. GUI should implement, not redefine it.**
