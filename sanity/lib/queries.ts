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
    productType->{
      _id,
      title_is,
      title_en,
      "slug": slug.current,
      solution->{
        _id,
        title_is,
        title_en,
        "slug": slug.current,
        industry->{
          _id,
          title_is,
          title_en,
          "slug": slug.current,
          icon
        }
      }
    },
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
    productType->{
      _id,
      title_is,
      title_en,
      "slug": slug.current,
      description_is,
      description_en,
      solution->{
        _id,
        title_is,
        title_en,
        "slug": slug.current,
        description_is,
        description_en,
        industry->{
          _id,
          title_is,
          title_en,
          "slug": slug.current,
          icon,
          description_is,
          description_en
        }
      }
    },
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

// ────────────────────────────────────────────────────────────
// NYtt Product Hierarchy System
// ────────────────────────────────────────────────────────────

// ── Allir rekstrar (Industries) Level 1 ─────────────────────
export const allIndustriesQuery = groq`
  *[_type == "industry"] | order(order asc) {
    _id,
    title_is,
    title_en,
    "slug": slug.current,
    icon,
    description_is,
    description_en,
    "image": image.asset->url,
    order,
    featured
  }
`

// ── Einn rekstur með lausnum ─────────────────────────────────
export const industryBySlugQuery = groq`
  *[_type == "industry" && slug.current == $slug][0] {
    _id,
    title_is,
    title_en,
    "slug": slug.current,
    icon,
    description_is,
    description_en,
    "image": image.asset->url,
    "solutions": *[_type == "solution" && references(^._id)] | order(order asc) {
      _id,
      title_is,
      title_en,
      "slug": slug.current,
      description_is,
      description_en,
      "image": image.asset->url,
      order
    }
  }
`

// ── Allar lausnir fyrir rekstur ──────────────────────────────
export const solutionsByIndustryQuery = groq`
  *[_type == "solution" && industry._ref == $industryId] | order(order asc) {
    _id,
    title_is,
    title_en,
    "slug": slug.current,
    description_is,
    description_en,
    "image": image.asset->url,
    order
  }
`

// ── Ein lausn með vörutegundum ───────────────────────────────
export const solutionBySlugQuery = groq`
  *[_type == "solution" && slug.current == $slug][0] {
    _id,
    title_is,
    title_en,
    "slug": slug.current,
    description_is,
    description_en,
    "image": image.asset->url,
    industry->{
      _id,
      title_is,
      title_en,
      "slug": slug.current,
      icon
    },
    "productTypes": *[_type == "productType" && references(^._id)] | order(order asc) {
      _id,
      title_is,
      title_en,
      "slug": slug.current,
      description_is,
      description_en,
      "image": image.asset->url,
      order
    }
  }
`

// ── Allar vörutegundir fyrir lausn ───────────────────────────
export const productTypesBySolutionQuery = groq`
  *[_type == "productType" && solution._ref == $solutionId] | order(order asc) {
    _id,
    title_is,
    title_en,
    "slug": slug.current,
    description_is,
    description_en,
    "image": image.asset->url,
    order
  }
`

// ── Ein vörutegund með vörum ──────────────────────────────────
export const productTypeBySlugQuery = groq`
  *[_type == "productType" && slug.current == $slug][0] {
    _id,
    title_is,
    title_en,
    "slug": slug.current,
    description_is,
    description_en,
    "image": image.asset->url,
    solution->{
      _id,
      title_is,
      title_en,
      "slug": slug.current,
      industry->{
        _id,
        title_is,
        title_en,
        "slug": slug.current,
        icon
      }
    },
    "products": *[_type == "product" && references(^._id) && status == "published"] {
      _id,
      title,
      "slug": slug.current,
      description,
      price,
      "image": image.asset->url,
      features
    }
  }
`

// ── Allar vörur fyrir vörutegund ─────────────────────────────
export const productsByProductTypeQuery = groq`
  *[_type == "product" && productType._ref == $productTypeId && status == "published"] {
    _id,
    title,
    "slug": slug.current,
    description,
    price,
    "image": image.asset->url,
    "images": images[].asset->url,
    features,
    specifications
  }
`

// ────────────────────────────────────────────────────────────
// ── Aðalflokkar með undirflokkum fyrir vörusíðu ──────────────
export const nestedCategoriesForProductsQuery = groq`
  *[_type == "categoryNested" && !defined(parent)] | order(order asc) {
    _id,
    title_is,
    title_en,
    "slug": slug.current,
    icon,
    description_is,
    description_en,
    "image": image.asset->url,
    "subcategories": *[_type == "categoryNested" && parent._ref == ^._id] | order(order asc) {
      "_key": _id,
      _id,
      title_is,
      title_en,
      "slug": slug.current,
      icon,
      description_is,
      description_en,
      "image": image.asset->url
    }
  }
`

// NESTED CATEGORY SYSTEM
// ────────────────────────────────────────────────────────────

// ── Allir aðalflokkar (enginn parent) ─────────────────────────
export const topLevelCategoriesQuery = groq`
  *[_type == "categoryNested" && !defined(parent)] | order(order asc) {
    _id,
    title_is,
    title_en,
    "slug": slug.current,
    icon,
    description_is,
    description_en,
    "image": image.asset->url,
    order,
    featured,
    showInMenu
  }
`

// ── Einn flokkur með undir flokkum ────────────────────────────
export const categoryWithChildrenQuery = groq`
  *[_type == "categoryNested" && slug.current == $slug][0] {
    _id,
    title_is,
    title_en,
    "slug": slug.current,
    icon,
    description_is,
    description_en,
    "image": image.asset->url,
    parent->{
      _id,
      title_is,
      title_en,
      "slug": slug.current,
      parent->{
        _id,
        title_is,
        title_en,
        "slug": slug.current
      }
    },
    "children": *[_type == "categoryNested" && parent._ref == ^._id] | order(order asc) {
      _id,
      title_is,
      title_en,
      "slug": slug.current,
      icon,
      description_is,
      "image": image.asset->url,
      order
    },
    "products": *[_type == "product" && references(^._id) && status == "published"] {
      _id,
      title,
      "slug": slug.current,
      description,
      price,
      "image": image.asset->url,
      features
    }
  }
`

// ── Öll category tree (fyrir menu) ────────────────────────────
export const categoryTreeQuery = groq`
  *[_type == "categoryNested" && !defined(parent) && showInMenu == true] | order(order asc) {
    _id,
    title_is,
    title_en,
    "slug": slug.current,
    icon,
    order,
    "children": *[_type == "categoryNested" && parent._ref == ^._id && showInMenu == true] | order(order asc) {
      _id,
      title_is,
      title_en,
      "slug": slug.current,
      order,
      "children": *[_type == "categoryNested" && parent._ref == ^._id && showInMenu == true] | order(order asc) {
        _id,
        title_is,
        title_en,
        "slug": slug.current,
        order
      }
    }
  }
`

// ── Breadcrumbs fyrir category ─────────────────────────────────
export const categoryBreadcrumbsQuery = groq`
  *[_type == "categoryNested" && slug.current == $slug][0] {
    _id,
    title_is,
    title_en,
    "slug": slug.current,
    parent->{
      _id,
      title_is,
      title_en,
      "slug": slug.current,
      parent->{
        _id,
        title_is,
        title_en,
        "slug": slug.current,
        parent->{
          _id,
          title_is,
          "slug": slug.current
        }
      }
    }
  }
`


