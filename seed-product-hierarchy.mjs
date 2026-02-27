/**
 * Seed Script fyrir nýja Product Hierarchy í Sanity
 * 
 * Level 1: Industry (Rekstur)
 * Level 2: Solution (Lausn)
 * Level 3: ProductType (Vörutegund)
 * Level 4: Product (Vara)
 * 
 * Keyrðu: node seed-product-hierarchy.mjs
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Þú þarft admin token
  apiVersion: '2024-01-01',
})

// 🔥 LEVEL 1 — INDUSTRIES (Rekstur)
const industries = [
  {
    _type: 'industry',
    _id: 'industry-naut',
    title_is: 'Nautgripabú',
    title_en: 'Cattle Farming',
    icon: '🐄',
    slug: { _type: 'slug', current: 'nautgripabu' },
    description_is: 'Lausnir fyrir nautgriparekstur',
    order: 1,
    featured: true,
  },
  {
    _type: 'industry',
    _id: 'industry-saud',
    title_is: 'Sauðfjárbú',
    title_en: 'Sheep Farming',
    icon: '🐑',
    slug: { _type: 'slug', current: 'saudfjarbu' },
    description_is: 'Lausnir fyrir sauðfjárrekstur',
    order: 2,
    featured: true,
  },
  {
    _type: 'industry',
    _id: 'industry-hesta',
    title_is: 'Hestabú',
    title_en: 'Horse Farming',
    icon: '🐎',
    slug: { _type: 'slug', current: 'hestabu' },
    description_is: 'Lausnir fyrir hestarækt',
    order: 3,
  },
  {
    _type: 'industry',
    _id: 'industry-kalfa',
    title_is: 'Kálfauppeldi',
    title_en: 'Calf Rearingí',
    icon: '🐮',
    slug: { _type: 'slug', current: 'kalfauppeldi' },
    description_is: 'Lausnir fyrir kálfauppeldi',
    order: 4,
  },
  {
    _type: 'industry',
    _id: 'industry-jardraekt',
    title_is: 'Jarðrækt',
    title_en: 'Agriculture',
    icon: '🌾',
    slug: { _type: 'slug', current: 'jardraekt' },
    description_is: 'Lausnir fyrir jarðrækt',
    order: 5,
  },
  {
    _type: 'industry',
    _id: 'industry-gardyrkja',
    title_is: 'Garðyrkja',
    title_en: 'Horticulture',
    icon: '🌱',
    slug: { _type: 'slug', current: 'gardyrkja' },
    description_is: 'Lausnir fyrir garðyrkju',
    order: 6,
  },
  {
    _type: 'industry',
    _id: 'industry-golf',
    title_is: 'Golf- og fótboltavellir',
    title_en: 'Golf & Sports Fields',
    icon: '🏟',
    slug: { _type: 'slug', current: 'golf-fotbolti' },
    description_is: 'Lausnir fyrir íþróttavelli',
    order: 7,
  },
  {
    _type: 'industry',
    _id: 'industry-stal',
    title_is: 'Stálgrindarhús',
    title_en: 'Steel Frame Buildings',
    icon: '🏗',
    slug: { _type: 'slug', current: 'stalgrindarhus' },
    description_is: 'Lausnir fyrir stálgrindarhús',
    order: 8,
  },
]

// 🔥 LEVEL 2 — SOLUTIONS (Lausn)
const solutions = [
  // Nautgripabú
  { _type: 'solution', _id: 'sol-naut-legubasar', title_is: 'Legubásar', title_en: 'Cubicles', slug: { _type: 'slug', current: 'legubasar' }, industry: { _type: 'reference', _ref: 'industry-naut' }, order: 1 },
  { _type: 'solution', _id: 'sol-naut-fodrun', title_is: 'Fóðrun', title_en: 'Feeding', slug: { _type: 'slug', current: 'fodrun' }, industry: { _type: 'reference', _ref: 'industry-naut' }, order: 2 },
  { _type: 'solution', _id: 'sol-naut-drykkjar', title_is: 'Drykkjarbúnaður', title_en: 'Drinking Equipment', slug: { _type: 'slug', current: 'drykkjarbunadur' }, industry: { _type: 'reference', _ref: 'industry-naut' }, order: 3 },
  { _type: 'solution', _id: 'sol-naut-golf', title_is: 'Gólf & Velferð', title_en: 'Flooring & Welfare', slug: { _type: 'slug', current: 'golf-velferd' }, industry: { _type: 'reference', _ref: 'industry-naut' }, order: 4 },
  { _type: 'solution', _id: 'sol-naut-medhondlun', title_is: 'Meðhöndlun', title_en: 'Handling', slug: { _type: 'slug', current: 'medhondlun' }, industry: { _type: 'reference', _ref: 'industry-naut' }, order: 5 },
  { _type: 'solution', _id: 'sol-naut-stiur', title_is: 'Stíur', title_en: 'Pens', slug: { _type: 'slug', current: 'stiur' }, industry: { _type: 'reference', _ref: 'industry-naut' }, order: 6 },
  { _type: 'solution', _id: 'sol-naut-mykju', title_is: 'Mykjukerfi', title_en: 'Manure Systems', slug: { _type: 'slug', current: 'mykjukerfi' }, industry: { _type: 'reference', _ref: 'industry-naut' }, order: 7 },
  
  // Sauðfé
  { _type: 'solution', _id: 'sol-saud-stiur', title_is: 'Stíur', title_en: 'Pens', slug: { _type: 'slug', current: 'stiur-saud' }, industry: { _type: 'reference', _ref: 'industry-saud' }, order: 1 },
  { _type: 'solution', _id: 'sol-saud-fodrun', title_is: 'Fóðrun', title_en: 'Feeding', slug: { _type: 'slug', current: 'fodrun-saud' }, industry: { _type: 'reference', _ref: 'industry-saud' }, order: 2 },
  { _type: 'solution', _id: 'sol-saud-drykkjar', title_is: 'Drykkjarbúnaður', title_en: 'Drinking', slug: { _type: 'slug', current: 'drykkjar-saud' }, industry: { _type: 'reference', _ref: 'industry-saud' }, order: 3 },
  
  // Hestar
  { _type: 'solution', _id: 'sol-hest-stiur', title_is: 'Stíur', title_en: 'Stalls', slug: { _type: 'slug', current: 'stiur-hest' }, industry: { _type: 'reference', _ref: 'industry-hesta' }, order: 1 },
  { _type: 'solution', _id: 'sol-hest-fodrun', title_is: 'Fóðrun', title_en: 'Feeding', slug: { _type: 'slug', current: 'fodrun-hest' }, industry: { _type: 'reference', _ref: 'industry-hesta' }, order: 2 },
  
  // Jarðrækt
  { _type: 'solution', _id: 'sol-jard-sadvörur', title_is: 'Sáðvörur', title_en: 'Seeds', slug: { _type: 'slug', current: 'sadvörur' }, industry: { _type: 'reference', _ref: 'industry-jardraekt' }, order: 1 },
  { _type: 'solution', _id: 'sol-jard-rullugerd', title_is: 'Rúllugerð', title_en: 'Baling', slug: { _type: 'slug', current: 'rullugerd' }, industry: { _type: 'reference', _ref: 'industry-jardraekt' }, order: 2 },
]

// 🔥 LEVEL 3 — PRODUCT TYPES (Vörutegund)
const productTypes = [
  // Legubásar
  { _type: 'productType', _id: 'pt-basar-plast', title_is: 'Plastlegubásar', title_en: 'Plastic Cubicles', slug: { _type: 'slug', current: 'plast-legubasar' }, solution: { _type: 'reference', _ref: 'sol-naut-legubasar' }, order: 1 },
  { _type: 'productType', _id: 'pt-basar-stal', title_is: 'Stállegubásar', title_en: 'Steel Cubicles', slug: { _type: 'slug', current: 'stal-legubasar' }, solution: { _type: 'reference', _ref: 'sol-naut-legubasar' }, order: 2 },
  { _type: 'productType', _id: 'pt-basar-mottur', title_is: 'Básamottur', title_en: 'Cubicle Mats', slug: { _type: 'slug', current: 'basamottur' }, solution: { _type: 'reference', _ref: 'sol-naut-legubasar' }, order: 3 },
  
  // Fóðrun
  { _type: 'productType', _id: 'pt-fod-atgrindur', title_is: 'Átgrindur', title_en: 'Feed Barriers', slug: { _type: 'slug', current: 'atgrindur' }, solution: { _type: 'reference', _ref: 'sol-naut-fodrun' }, order: 1 },
  { _type: 'productType', _id: 'pt-fod-laesigrindur', title_is: 'Læsigrindur', title_en: 'Locking Feed Gates', slug: { _type: 'slug', current: 'laesigrindur' }, solution: { _type: 'reference', _ref: 'sol-naut-fodrun' }, order: 2 },
  { _type: 'productType', _id: 'pt-fod-gjafaskóflur', title_is: 'Gjafaskóflur', title_en: 'Feed Pushers', slug: { _type: 'slug', current: 'gjafaskoflur' }, solution: { _type: 'reference', _ref: 'sol-naut-fodrun' }, order: 3 },
  { _type: 'productType', _id: 'pt-fod-heygrindur', title_is: 'Heygrindur', title_en: 'Hay Feeders', slug: { _type: 'slug', current: 'heygrindur' }, solution: { _type: 'reference', _ref: 'sol-naut-fodrun' }, order: 4 },
  
  // Drykkjarbúnaður
  { _type: 'productType', _id: 'pt-dryk-skaalar', title_is: 'Drykkjaskálar', title_en: 'Drinking Bowls', slug: { _type: 'slug', current: 'drykkjaskaalar' }, solution: { _type: 'reference', _ref: 'sol-naut-drykkjar' }, order: 1 },
  { _type: 'productType', _id: 'pt-dryk-hlifar', title_is: 'Drykkjarhlifar', title_en: 'Bowl Covers', slug: { _type: 'slug', current: 'drykkjarhlifar' }, solution: { _type: 'reference', _ref: 'sol-naut-drykkjar' }, order: 2 },
  
  // Mykjukerfi
  { _type: 'productType', _id: 'pt-mykju-lon', title_is: 'Mykjulón', title_en: 'Manure Lagoons', slug: { _type: 'slug', current: 'mykjulon' }, solution: { _type: 'reference', _ref: 'sol-naut-mykju' }, order: 1 },
  { _type: 'productType', _id: 'pt-mykju-tankar', title_is: 'Mykjutankar', title_en: 'Slurry Tanks', slug: { _type: 'slug', current: 'mykjutankar' }, solution: { _type: 'reference', _ref: 'sol-naut-mykju' }, order: 2 },
  { _type: 'productType', _id: 'pt-mykju-hraerur', title_is: 'Haughrærur', title_en: 'Manure Agitators', slug: { _type: 'slug', current: 'haughrærur' }, solution: { _type: 'reference', _ref: 'sol-naut-mykju' }, order: 3 },
]

async function seedData() {
  console.log('🌱 Byrja að seeda nýja product hierarchy...\n')

  try {
    // 1. Búa til Industries
    console.log('📊 Level 1: Industries (Rekstur)...')
    for (const industry of industries) {
      await client.createOrReplace(industry)
      console.log(`  ✅ ${industry.icon} ${industry.title_is}`)
    }

    // 2. Búa til Solutions
    console.log('\n🔧 Level 2: Solutions (Lausnir)...')
    for (const solution of solutions) {
      await client.createOrReplace(solution)
      console.log(`  ✅ ${solution.title_is}`)
    }

    // 3. Búa til Product Types
    console.log('\n📦 Level 3: Product Types (Vörutegundir)...')
    for (const productType of productTypes) {
      await client.createOrReplace(productType)
      console.log(`  ✅ ${productType.title_is}`)
    }

    console.log('\n✨ Seeding lokið!')
    console.log('\n🎯 Næstu skref:')
    console.log('1. Farðu í Sanity Studio (npm run dev)')
    console.log('2. Búðu til vörur (Product) og veldu vörutegund')
    console.log('3. Uppfærðu frontend til að sýna nýju skipulagið')
    
  } catch (error) {
    console.error('❌ Villa við seeding:', error)
  }
}

seedData()
