import { groq } from 'next-sanity'

// ── Forsíða ──────────────────────────────────────────────────
export const homePageQuery = groq`
  *[_type == "homePage" && _id == "homePage"][0] {
    title_is, title_en,
    subtitle_is, subtitle_en,
    "heroImage": image.asset->url,
    imageAlt_is, imageAlt_en,
    ctaText_is, ctaText_en, ctaLink,
    missionHeading_is, missionHeading_en,
    missionText_is, missionText_en,
    missionDesc_is, missionDesc_en,
    statsHeading_is, statsHeading_en,
    statsSubheading_is, statsSubheading_en,
    stat1Value, stat1Suffix, stat1Label_is, stat1Label_en, stat1Desc_is, stat1Desc_en,
    stat2Value, stat2Suffix, stat2Label_is, stat2Label_en, stat2Desc_is, stat2Desc_en,
    stat3Value, stat3Suffix, stat3Label_is, stat3Label_en, stat3Desc_is, stat3Desc_en
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

// ── Allir flokkar ────────────────────────────────────────────
export const allCategoriesQuery = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    title_is,
    title_en,
    "slug": slug.current,
    "image": image.asset->url,
    subcategories[] {
      _key,
      title_is,
      title_en,
      slug,
      description_is,
      description_en,
      "image": image.asset->url,
      "images": images[].asset->url
    }
  }
`

// ── Um okkur síða ────────────────────────────────────────────
export const aboutPageQuery = groq`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    heroTitle_is, heroTitle_en,
    heroSubtitle_is, heroSubtitle_en,
    "heroImage": heroImage.asset->url,
    heroBtn1_is, heroBtn1_en,
    heroBtn2_is, heroBtn2_en,
    trustBadges,
    whyHeading_is, whyHeading_en,
    whyCards,
    solutionsHeading_is, solutionsHeading_en,
    solutionCards,
    teamHeading_is, teamHeading_en,
    teamSubtitle_is, teamSubtitle_en,
    teamMembers[] {
      name, jobTitle_is, jobTitle_en,
      quote_is, quote_en,
      description_is, description_en,
      "image": image.asset->url
    },
    ctaHeading_is, ctaHeading_en,
    ctaText_is, ctaText_en
  }
`

// ── Hafa samband síða ────────────────────────────────────────
export const contactPageQuery = groq`
  *[_type == "contactPage" && _id == "contactPage"][0] {
    "heroImage": heroImage.asset->url,
    heroTitle_is, heroTitle_en,
    heroSubtitle_is, heroSubtitle_en,
    address, phone, email,
    openingHours_is, openingHours_en,
    facebookUrl, linkedinUrl, instagramUrl,
    mapEmbedSrc
  }
`

// ── Vörur síða ───────────────────────────────────────────────
export const productsPageQuery = groq`
  *[_type == "productsPage" && _id == "productsPage"][0] {
    "heroImage": heroImage.asset->url,
    heroTitle_is, heroTitle_en,
    heroSubtitle_is, heroSubtitle_en
  }
`

// ── Allar fréttir ────────────────────────────────────────────
export const allNewsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "mainImage": mainImage.asset->url
  }
`

// ── 3 nýjustu fréttir (fyrir forsíðu) ──────────────────────
export const latestNewsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) [0..2] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "mainImage": mainImage.asset->url
  }
`

// ── Ein frétt (eftir slug) ───────────────────────────────────
export const newsBySlugQuery = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "mainImage": mainImage.asset->url,
    body
  }
`
