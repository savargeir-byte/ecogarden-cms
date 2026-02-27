import { homePageSchema } from './homePage'
import { productSchema } from './product'
import { siteSettingsSchema } from './siteSettings'
import { categorySchema } from './category'
import { aboutPageSchema } from './aboutPage'
import { contactPageSchema } from './contactPage'
import { productsPageSchema } from './productsPage'
import { newsSchema } from './news'
import { industrySchema } from './industry'
import { solutionSchema } from './solution'
import { productTypeSchema } from './productType'
import { categoryNestedSchema } from './categoryNested'

export const schemaTypes = [
  // Site pages
  homePageSchema,
  aboutPageSchema,
  contactPageSchema,
  productsPageSchema,
  newsSchema,
  siteSettingsSchema,
  
  // ⭐ NEW: Nested Category System (ÞETTA ER NÝJA KERFIÐ!)
  categoryNestedSchema,  // Stuðlar ótakmarkaða nesting
  productSchema,         // Vörur vísa í categoryNested
  
  // Legacy: Product hierarchy (Optional - can be removed later)
  industrySchema,    // Level 1: Rekstur (🐄 Nautgripabú, 🐑 Sauðfjárbú, etc.)
  solutionSchema,    // Level 2: Lausn (Legubásar, Fóðrun, etc.)
  productTypeSchema, // Level 3: Vörutegund (Átgrindur, Læsigrindur, etc.)
  
  // Legacy: Old category system (backwards compatibility)
  categorySchema,
]
