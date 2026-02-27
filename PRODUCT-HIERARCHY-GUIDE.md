/**
 * LEIÐBEININGAR: Hvernig á að nota nýja skipulagið
 * 
 * Þetta skjal útskýrir hvernig á að nota nýja 3-þrepa product hierarchy
 * á frontend til að halda núverandi design.
 */

# Nýja Product Hierarchy Kerfið

## 📊 Strúktúr

```
Industry (Rekstur)
  ↓
Solution (Lausn)
  ↓
ProductType (Vörutegund)
  ↓
Product (Vara)
```

## 🎯 User Flow á vefsíðu

```
Forsíða → Veldu rekstur → Veldu lausn → Sjá vörur → Fá tilboð
```

## 🚀 Uppsetning

### 1. Keyra Sanity Studio

\`\`\`bash
npm run dev
\`\`\`

Studio opnast á http://localhost:3000/studio

### 2. Seed-a grunndata

\`\`\`bash
node seed-product-hierarchy.mjs
\`\`\`

Þetta býr til:
- 8 rekstra (Industries)
- 15 lausnir (Solutions)
- 12 vörutegundir (Product Types)

### 3. Búa til vörur

Í Sanity Studio:
1. Farðu í "Vara" 
2. Búðu til nýja vöru
3. Veldu **Vörutegund** (t.d. "Átgrindur")
4. Kerfið veit sjálfkrafa að þetta tilheyrir:
   - Lausn: Fóðrun
   - Rekstur: Nautgripabú

## 📁 Nýjar síður (dæmi)

### `/app/rekstrar/page.tsx` - Sýna alla rekstra

\`\`\`tsx
import { client } from '@/sanity/lib/client'
import { allIndustriesQuery } from '@/sanity/lib/queries'
import Link from 'next/link'
import Image from 'next/image'

export default async function RekstrarPage() {
  const industries = await client.fetch(allIndustriesQuery)
  
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Hvað ertu að rekja?</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        {industries.map((industry: any) => (
          <Link 
            key={industry._id}
            href={\`/rekstrar/\${industry.slug}\`}
            className="group border rounded-lg p-6 hover:shadow-lg transition"
          >
            <div className="text-5xl mb-4">{industry.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{industry.title_is}</h3>
            <p className="text-gray-600">{industry.description_is}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
\`\`\`

### `/app/rekstrar/[slug]/page.tsx` - Einn rekstur með lausnum

\`\`\`tsx
import { client } from '@/sanity/lib/client'
import { industryBySlugQuery } from '@/sanity/lib/queries'
import Link from 'next/link'

export default async function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = await client.fetch(industryBySlugQuery, { slug: params.slug })
  
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">
          {industry.icon} {industry.title_is}
        </h1>
        <p className="text-xl text-gray-600">{industry.description_is}</p>
      </div>
      
      {/* Lausnir */}
      <h2 className="text-3xl font-bold mb-8">Veldu lausn</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {industry.solutions?.map((solution: any) => (
          <Link
            key={solution._id}
            href={\`/lausnir/\${solution.slug}\`}
            className="border rounded-lg p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold mb-2">{solution.title_is}</h3>
            <p className="text-gray-600">{solution.description_is}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
\`\`\`

### `/app/lausnir/[slug]/page.tsx` - Ein lausn með vörutegundum

\`\`\`tsx
import { client } from '@/sanity/lib/client'
import { solutionBySlugQuery } from '@/sanity/lib/queries'
import Link from 'next/link'

export default async function SolutionPage({ params }: { params: { slug: string } }) {
  const solution = await client.fetch(solutionBySlugQuery, { slug: params.slug })
  
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Breadcrumbs */}
      <div className="mb-8 text-sm">
        <Link href="/rekstrar" className="text-green-600 hover:underline">
          {solution.industry.icon} {solution.industry.title_is}
        </Link>
        <span className="mx-2">→</span>
        <span className="font-bold">{solution.title_is}</span>
      </div>
      
      {/* Hero */}
      <h1 className="text-4xl font-bold mb-4">{solution.title_is}</h1>
      <p className="text-xl text-gray-600 mb-12">{solution.description_is}</p>
      
      {/* Vörutegundir */}
      <h2 className="text-3xl font-bold mb-8">Vörutegundir</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {solution.productTypes?.map((pt: any) => (
          <Link
            key={pt._id}
            href={\`/vorutegundir/\${pt.slug}\`}
            className="border rounded-lg p-4 hover:shadow-lg transition"
          >
            <h3 className="font-bold mb-1">{pt.title_is}</h3>
            <p className="text-sm text-gray-600">{pt.description_is}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
\`\`\`

### `/app/vorutegundir/[slug]/page.tsx` - Ein vörutegund með vörum

\`\`\`tsx
import { client } from '@/sanity/lib/client'
import { productTypeBySlugQuery } from '@/sanity/lib/queries'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

export default async function ProductTypePage({ params }: { params: { slug: string } }) {
  const productType = await client.fetch(productTypeBySlugQuery, { slug: params.slug })
  
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Breadcrumbs */}
      <div className="mb-8 text-sm">
        <Link href="/rekstrar" className="text-green-600 hover:underline">
          {productType.solution.industry.icon} {productType.solution.industry.title_is}
        </Link>
        <span className="mx-2">→</span>
        <Link href={\`/lausnir/\${productType.solution.slug}\`} className="text-green-600 hover:underline">
          {productType.solution.title_is}
        </Link>
        <span className="mx-2">→</span>
        <span className="font-bold">{productType.title_is}</span>
      </div>
      
      {/* Hero */}
      <h1 className="text-4xl font-bold mb-4">{productType.title_is}</h1>
      <p className="text-xl text-gray-600 mb-12">{productType.description_is}</p>
      
      {/* Vörur */}
      <div className="grid md:grid-cols-3 gap-6">
        {productType.products?.map((product: any) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
\`\`\`

## 🎨 Halda núverandi design

Þú getur haldið öllum núverandi stílum (CSS, Tailwind classes, etc.).

### Dæmi: Uppfæra forsíðu

Breyta `/app/page.tsx` til að sýna rekstra í stað flokka:

\`\`\`tsx
import { client } from '@/sanity/lib/client'
import { allIndustriesQuery } from '@/sanity/lib/queries'

export default async function Home() {
  const industries = await client.fetch(allIndustriesQuery)
  const featuredIndustries = industries.filter((i: any) => i.featured)
  
  return (
    <main>
      {/* Hero section - sama og áður */}
      
      {/* Rekstrar section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Hvað ertu að rekja?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {featuredIndustries.map((industry: any) => (
              <a
                key={industry._id}
                href={\`/rekstrar/\${industry.slug}\`}
                className="text-center p-6 border rounded-lg hover:shadow-lg transition"
              >
                <div className="text-5xl mb-3">{industry.icon}</div>
                <h3 className="font-bold">{industry.title_is}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
\`\`\`

## ✅ Kostir

1. **Sveigjanlegt**: Bæta við nýjum rekstri, lausn, eða vörutegund án þess að kóða
2. **SEO friendly**: Hver level hefur sína slóð
3. **Auðvelt fyrir viðskiptavin**: Fylgir hugsunarhætti þeirra
4. **CMS control**: EcoGarden getur breytt öllu í Sanity Studio

## 🔄 Migration frá gömlu kerfi

Gamlar vörur með \`category\` og \`subcategory\` munu virka áfram.
Þegar þú ert tilbúinn:

1. Búðu til ProductType fyrir hverja subcategory
2. Uppfærðu vörur til að vísa í ProductType
3. Fjarlægðu \`category\` og \`subcategory\` fields

## 📞 Næstu skref

1. **Test-a**: \`npm run dev\` og sjá Sanity Studio
2. **Seed-a**: \`node seed-product-hierarchy.mjs\`
3. **Búa til vörur**: Í Studio
4. **Uppfæra frontend**: Nota dæmin hér að ofan
5. **Style-a**: Nota núverandi Tailwind/CSS
