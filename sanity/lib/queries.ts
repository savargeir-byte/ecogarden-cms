import { groq } from 'next-sanity'

// ── Forsíða ──────────────────────────────────────────────────
export const homePageQuery = groq`
  *[_type == "homePage" && _id == "homePage"][0] {
    title_is,
    title_en,
    subtitle_is,
    subtitle_en,
    image,
    imageAlt_is,
    imageAlt_en,
    ctaText_is,
    ctaText_en,
    ctaLink
  }
`

// ── Stillingar (þýðingar) ────────────────────────────────────
export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0]
`

// ── Allar vörur ──────────────────────────────────────────────
export const allProductsQuery = groq`
  *[_type == "product" && status == "published"] | order(_createdAt asc) {
    _id,
    "id": _id,
    "slug": slug.current,
    title,
    description,
    price,
    "image": image.asset->url,
    "images": images[].asset->url,
    category,
    subcategory,
    status,
    features,
    specifications,
    seo
  }
`

// ── Ein vara ─────────────────────────────────────────────────
export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    "id": _id,
    "slug": slug.current,
    title,
    description,
    price,
    "image": image.asset->url,
    "images": images[].asset->url,
    category,
    subcategory,
    status,
    features,
    specifications,
    seo
  }
`

// ── Featured vörur (3 fyrstu) ────────────────────────────────
export const featuredProductsQuery = groq`
  *[_type == "product" && status == "published" && featured == true][0...3] {
    _id,
    "id": _id,
    "slug": slug.current,
    title,
    description,
    price,
    "image": image.asset->url,
    category,
    subcategory,
    status
  }
`

// ── Allir slugs (fyrir generateStaticParams) ─────────────────
export const allProductSlugsQuery = groq`
  *[_type == "product" && defined(slug.current)] { "slug": slug.current }
`
