# 🎯 NESTED CATEGORY SYSTEM - LEIÐBEININGAR

## 🤔 Af hverju var þetta ekki komið fyrr?

Fyrri lýsingin var:
```
Industry → Solution → ProductType → Product
(Nautgripabú → Legubásar → Átgrindur → Vara X)
```

**NÚ** ertu með nákvæmara category hierarchy:
```
Landbúnaður
  → Innréttingar  
    → Innréttingar Fjós
      → Legubásainnréttingar
        → Plast
        → Stál
```

Þetta er **nested category system** með ótakmörkuðum levels!

---

## ✅ HVAÐ VAR GERT

### 1. Nýtt Schema: `categoryNested.ts`

- Hver category getur átt **parent** (yfirflokk)
- Ótakmarkaðir levels (2, 3, 4+ levels)
- Supports íslenskt + enskt
- Icon/emoji stuðningur
- Featured flokkar fyrir forsíðu

### 2. Product Schema Uppfært

Vörur geta nú tilheyrt **mörgum flokkum**:
```typescript
categories: [
  "Landbúnaður",
  "Innréttingar", 
  "Innréttingar Nautahús",
  "Átgrindur"
]
```

### 3. Seed Script: `seed-categories-nested.mjs`

Býr til **ÖLLKATEGORY HIERARCHY** sem þú lýstir:
- Landbúnaður
  - Sáðvörur (Grasfræ, Byggfræ, etc.)
  - Vélar og Tæki (Plastpressur, Gjafaskóflur, etc.)
  - Mykjulón & Tankar
  - Innréttingar
    - Innréttingar Nautahús (Milligrindur, Átgrindur, etc.)
    - Innréttingar Fjós
      - Legubásainnréttingar (Plast, Stál)
      - Básamottur (Vatnsmottur, Svampmottur)
      - Átgrindur, Læsigrindur, etc.
    - Innréttingar Kálfauppeldi
    - Innréttingar Sauðfé og Hestar
  - Heyskapur
    - Stæðugerð
    - Rúllugerð
  - Kjarnfóður
  - Rekstrarvörur
- Garðyrkjubændur
- Stálgrindarhús
- Golf og fótboltavellir

---

## 🚀 HVERNIG Á AÐ NOTA ÞETTA

### Skref 1: Seed-a Categories

```bash
# Fyrst þarftu SANITY_API_TOKEN
# Fáðu það í https://sanity.io/manage

# Bættu við í .env.local:
SANITY_API_TOKEN=skXXXXXXXXXXXXXX

# Síðan keyrðu:
node seed-categories-nested.mjs
```

Þetta býr til **öll** category hierarchy.

### Skref 2: Opna Sanity Studio

```bash
npm run dev
```

Farðu í http://localhost:3000/studio

Þú munt sjá:
- **Vöruflokkar (Nested)** - Nýja kerfið! ⭐

### Skref 3: Búa til vöru

1. Farðu í "Vara"
2. Búðu til nýja vöru
3. Í "Flokkar" field:
   - Veldu **alla** viðeigandi flokka
   - Dæmi fyrir **Átgrindur fyrir nautahús**:
     - ✅ Landbúnaður
     - ✅ Innréttingar
     - ✅ Innréttingar Nautahús
     - ✅ Átgrindur

Sanity veit núna að þessi vara tilheyrir öllum þessum flokkum!

---

## 🎨 FRONTEND DÆMI

### Sýna aðalflokka á forsíðu

```tsx
import { client } from '@/sanity/lib/client'
import { topLevelCategoriesQuery } from '@/sanity/lib/queries'
import Link from 'next/link'

export default async function HomePage() {
  const categories = await client.fetch(topLevelCategoriesQuery)
  
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8">Vöruflokkar</h2>
      
      <div className="grid md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/flokkar/${cat.slug}`}
            className="text-center p-6 border rounded-lg hover:shadow-lg"
          >
            <div className="text-5xl mb-3">{cat.icon}</div>
            <h3 className="font-bold">{cat.title_is}</h3>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

### Sýna category með undirflokkum

```tsx
// app/flokkar/[slug]/page.tsx
import { client } from '@/sanity/lib/client'
import { categoryWithChildrenQuery } from '@/sanity/lib/queries'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'

export default async function CategoryPage({ params }) {
  const category = await client.fetch(categoryWithChildrenQuery, { 
    slug: params.slug 
  })
  
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Breadcrumbs */}
      {category.parent && (
        <div className="mb-8 text-sm">
          {category.parent.parent && (
            <>
              <Link href={`/flokkar/${category.parent.parent.slug}`} className="text-green-600">
                {category.parent.parent.title_is}
              </Link>
              <span className="mx-2">→</span>
            </>
          )}
          <Link href={`/flokkar/${category.parent.slug}`} className="text-green-600">
            {category.parent.title_is}
          </Link>
          <span className="mx-2">→</span>
          <span className="font-bold">{category.title_is}</span>
        </div>
      )}
      
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {category.icon} {category.title_is}
        </h1>
        <p className="text-xl text-gray-600">{category.description_is}</p>
      </div>
      
      {/* Undirflokkar */}
      {category.children?.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Undirflokkar</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {category.children.map((child) => (
              <Link
                key={child._id}
                href={`/flokkar/${child.slug}`}
                className="p-4 border rounded-lg hover:shadow-lg"
              >
                <h3 className="font-bold">{child.title_is}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Vörur */}
      {category.products?.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Vörur</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {category.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

### Mega Menu með category tree

```tsx
// components/MegaMenu.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CategoryTree } from '@/lib/product-hierarchy-types'

export default function MegaMenu({ categories }: { categories: CategoryTree[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <ul className="flex gap-8">
          {categories.map((cat) => (
            <li
              key={cat._id}
              className="relative"
              onMouseEnter={() => setActiveCategory(cat._id)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <Link
                href={`/flokkar/${cat.slug}`}
                className="inline-block py-4 font-medium hover:text-green-600"
              >
                {cat.icon} {cat.title_is}
              </Link>
              
              {/* Dropdown */}
              {activeCategory === cat._id && cat.children?.length > 0 && (
                <div className="absolute top-full left-0 bg-white shadow-lg p-6 min-w-[600px] z-50">
                  <div className="grid grid-cols-2 gap-6">
                    {cat.children.map((child) => (
                      <div key={child._id}>
                        <Link
                          href={`/flokkar/${child.slug}`}
                          className="font-bold text-green-600 hover:underline"
                        >
                          {child.title_is}
                        </Link>
                        
                        {/* Level 3 */}
                        {child.children?.length > 0 && (
                          <ul className="mt-2 ml-4 space-y-1">
                            {child.children.map((subChild) => (
                              <li key={subChild._id}>
                                <Link
                                  href={`/flokkar/${subChild.slug}`}
                                  className="text-sm text-gray-600 hover:text-green-600"
                                >
                                  {subChild.title_is}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
```

Sækja categories fyrir menu:

```tsx
// In layout.tsx or similar
import { client } from '@/sanity/lib/client'
import { categoryTreeQuery } from '@/sanity/lib/queries'
import MegaMenu from '@/components/MegaMenu'

export default async function Layout({ children }) {
  const categories = await client.fetch(categoryTreeQuery)
  
  return (
    <>
      <Navbar />
      <MegaMenu categories={categories} />
      {children}
    </>
  )
}
```

---

## 🔄 MIGRATION frá gömlu kerfi

Ef þú ert með vörur með gömlu `category` og `subcategory`:

1. Þær virka áfram
2. Þegar þú ert tilbúinn, uppfærðu vörurnar í Sanity Studio
3. Veldu viðeigandi flokka í "Flokkar" field
4. Gamla kerfið verður falið (`hidden: true`)

---

## 💡 KOSTIR

✅ **Ótakmarkaðir levels** - Bættu við eins mörgum levels og þú vilt  
✅ **Engin hardcoding** - Breyttu öllu í Sanity Studio  
✅ **SEO friendly** - Hver flokkur hefur sína slóð  
✅ **Mega menu ready** - Auðvelt að búa til dropdown menu  
✅ **Breadcrumbs** - Auðvelt að sýna hierarchy  
✅ **Multi-category products** - Vara getur tilheyrt mörgum flokkum  

---

## 📞 NÆSTU SKREF

1. ✅ Schema búið til
2. ✅ Seed script tilbúinn
3. ⏳ **Núna:** Keyrðu `node seed-categories-nested.mjs`
4. ⏳ **Síðan:** Opnaðu Sanity Studio og sjáðu flokkana
5. ⏳ **Loks:** Búðu til vörur og veldu flokka

**ALLT TILBÚIÐ!** 🎉
