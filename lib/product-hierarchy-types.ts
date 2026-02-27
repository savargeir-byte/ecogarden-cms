/**
 * TypeScript Types fyrir nýja Product Hierarchy
 * 
 * Notaðu þetta í components og pages
 */

// ═══════════════════════════════════════════════════════════
// NESTED CATEGORY SYSTEM (NÝTT!)
// ═══════════════════════════════════════════════════════════

export interface CategoryNested {
  _id: string
  title_is: string
  title_en?: string
  slug: string
  parent?: CategoryNested
  children?: CategoryNested[]
  description_is?: string
  description_en?: string
  image?: string
  icon?: string
  order: number
  featured?: boolean
  showInMenu?: boolean
  products?: Product[]
}

export interface CategoryTree extends CategoryNested {
  children: CategoryTree[]
}

// ═══════════════════════════════════════════════════════════
// LEGACY SYSTEMS (fyrir backwards compatibility)
// ═══════════════════════════════════════════════════════════

export interface Industry {
  _id: string
  title_is: string
  title_en?: string
  slug: string
  icon?: string
  description_is?: string
  description_en?: string
  image?: string
  order: number
  featured?: boolean
}

export interface Solution {
  _id: string
  title_is: string
  title_en?: string
  slug: string
  description_is?: string
  description_en?: string
  image?: string
  order: number
  industry?: Industry
}

export interface ProductType {
  _id: string
  title_is: string
  title_en?: string
  slug: string
  description_is?: string
  description_en?: string
  image?: string
  order: number
  solution?: Solution
}

export interface Product {
  _id: string
  id: string
  slug: string
  title: string
  description?: string
  price?: number
  image?: string
  images?: string[]
  categories?: CategoryNested[] // NEW: Nested categories
  productType?: ProductType // Legacy
  // Legacy fields (backwards compatibility)
  category?: string
  subcategory?: string
  status?: 'published' | 'draft'
  featured?: boolean
  features?: string[]
  specifications?: Array<{ key: string; value: string }>
  seo?: {
    title?: string
    description?: string
  }
}

// Helper type fyrir full hierarchy
export interface ProductWithHierarchy extends Product {
  productType: ProductType & {
    solution: Solution & {
      industry: Industry
    }
  }
}

// Helper type fyrir Industry með lausnum
export interface IndustryWithSolutions extends Industry {
  solutions: Solution[]
}

// Helper type fyrir Solution með vörutegundum
export interface SolutionWithProductTypes extends Solution {
  productTypes: ProductType[]
}

// Helper type fyrir ProductType með vörum
export interface ProductTypeWithProducts extends ProductType {
  products: Product[]
}
