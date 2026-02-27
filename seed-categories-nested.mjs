/**
 * Seed Script fyrir Nested Category System
 * 
 * Þetta býr til NÁKVÆMLEGA þá flokka sem EcoGarden vill:
 * - Landbúnaður
 *   - Sáðvörur
 *     - Grasfræ, Byggfræ, etc.
 *   - Innréttingar
 *     - Innréttingar Nautahús
 *       - Milligrindur, Átgrindur, etc.
 * 
 * Keyrðu: node seed-categories-nested.mjs
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Debug: Check if env vars are loaded
console.log('🔍 Debug Info:')
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET)
console.log('Has Token:', !!process.env.SANITY_API_TOKEN)
console.log('Token length:', process.env.SANITY_API_TOKEN?.length || 0)
console.log('')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
})

const categories = []

// ═══════════════════════════════════════════════════════════
// 1. LANDBÚNAÐUR
// ═══════════════════════════════════════════════════════════

const landbunadur = {
  _type: 'categoryNested',
  _id: 'cat-landbunadur',
  title_is: 'Landbúnaður',
  title_en: 'Agriculture',
  slug: { _type: 'slug', current: 'landbunadur' },
  icon: '🌾',
  order: 1,
  featured: true,
  showInMenu: true,
}
categories.push(landbunadur)

// ───────────────────────────────────────────────────────────
// 1.1. Sáðvörur
// ───────────────────────────────────────────────────────────

const sadvorur = {
  _type: 'categoryNested',
  _id: 'cat-sadvorur',
  title_is: 'Sáðvörur',
  title_en: 'Seeds',
  slug: { _type: 'slug', current: 'sadvorur' },
  parent: { _type: 'reference', _ref: 'cat-landbunadur' },
  order: 1,
}
categories.push(sadvorur)

const sadvorurSub = [
  { id: 'grasfre', title_is: 'Grasfræ', title_en: 'Grass Seeds' },
  { id: 'byggfre', title_is: 'Byggfræ', title_en: 'Barley Seeds' },
  { id: 'graenfodur', title_is: 'Grænfóður', title_en: 'Green Fodder' },
  { id: 'lupina', title_is: 'Lúpína', title_en: 'Lupine' },
  { id: 'rofur', title_is: 'Rófur', title_en: 'Turnips' },
]

sadvorurSub.forEach((item, i) => {
  categories.push({
    _type: 'categoryNested',
    _id: `cat-sadvorur-${item.id}`,
    title_is: item.title_is,
    title_en: item.title_en,
    slug: { _type: 'slug', current: item.id },
    parent: { _type: 'reference', _ref: 'cat-sadvorur' },
    order: i + 1,
  })
})

// ───────────────────────────────────────────────────────────
// 1.2. Vélar og Tæki
// ───────────────────────────────────────────────────────────

const velar = {
  _type: 'categoryNested',
  _id: 'cat-velar-taeki',
  title_is: 'Vélar og Tæki',
  title_en: 'Machinery & Equipment',
  slug: { _type: 'slug', current: 'velar-taeki' },
  parent: { _type: 'reference', _ref: 'cat-landbunadur' },
  order: 2,
}
categories.push(velar)

const velarSub = [
  { id: 'plastpressur', title_is: 'Plastpressur', title_en: 'Plastic Wrappers' },
  { id: 'gjafaskoflur', title_is: 'Gjafaskóflur', title_en: 'Feed Pushers' },
  { id: 'heilfodur', title_is: 'Heilfóðurvagnar', title_en: 'TMR Wagons' },
  { id: 'haughraerur', title_is: 'Haughrærur', title_en: 'Slurry Agitators' },
  { id: 'udadaelur', title_is: 'Úðadælur', title_en: 'Spray Pumps' },
]

velarSub.forEach((item, i) => {
  categories.push({
    _type: 'categoryNested',
    _id: `cat-velar-${item.id}`,
    title_is: item.title_is,
    title_en: item.title_en,
    slug: { _type: 'slug', current: item.id },
    parent: { _type: 'reference', _ref: 'cat-velar-taeki' },
    order: i + 1,
  })
})

// ───────────────────────────────────────────────────────────
// 1.3. Mykjulón & Tankar
// ───────────────────────────────────────────────────────────

const mykjulon = {
  _type: 'categoryNested',
  _id: 'cat-mykjulon-tankar',
  title_is: 'Mykjulón & Tankar',
  title_en: 'Slurry Lagoons & Tanks',
  slug: { _type: 'slug', current: 'mykjulon-tankar' },
  parent: { _type: 'reference', _ref: 'cat-landbunadur' },
  order: 3,
}
categories.push(mykjulon)

const mykjulonSub = [
  { id: 'mykjulon', title_is: 'Mykjulón', title_en: 'Slurry Lagoons' },
  { id: 'mykjutankar', title_is: 'Mykjutankar', title_en: 'Slurry Tanks' },
  { id: 'vatnstankar', title_is: 'Vatnstankar', title_en: 'Water Tanks' },
]

mykjulonSub.forEach((item, i) => {
  categories.push({
    _type: 'categoryNested',
    _id: `cat-mykju-${item.id}`,
    title_is: item.title_is,
    title_en: item.title_en,
    slug: { _type: 'slug', current: item.id },
    parent: { _type: 'reference', _ref: 'cat-mykjulon-tankar' },
    order: i + 1,
  })
})

// ───────────────────────────────────────────────────────────
// 1.4. Innréttingar
// ───────────────────────────────────────────────────────────

const innrettingar = {
  _type: 'categoryNested',
  _id: 'cat-innrettingar',
  title_is: 'Innréttingar',
  title_en: 'Interior Fittings',
  slug: { _type: 'slug', current: 'innrettingar' },
  parent: { _type: 'reference', _ref: 'cat-landbunadur' },
  order: 4,
}
categories.push(innrettingar)

// 1.4.1. Innréttingar Nautahús
const nautahus = {
  _type: 'categoryNested',
  _id: 'cat-innr-nautahus',
  title_is: 'Innréttingar Nautahús',
  title_en: 'Cattle Barn Fittings',
  slug: { _type: 'slug', current: 'innr-nautahus' },
  parent: { _type: 'reference', _ref: 'cat-innrettingar' },
  order: 1,
}
categories.push(nautahus)

const nautahusSub = [
  { id: 'milligrindur', title_is: 'Milligrindur', title_en: 'Dividers' },
  { id: 'atgrindur', title_is: 'Átgrindur', title_en: 'Feed Barriers' },
  { id: 'drykkjaskaalar-hlifar', title_is: 'Drykkjaskálar og hlífar', title_en: 'Drinking Bowls & Covers' },
  { id: 'festingar', title_is: 'Festingar', title_en: 'Fixings' },
  { id: 'velferdargolf', title_is: 'Velferðargólf', title_en: 'Welfare Flooring' },
  { id: 'laesigrindur', title_is: 'Læsigrindur', title_en: 'Locking Gates' },
  { id: 'medhondlunarbunadur', title_is: 'Meðhöndlunarbúnaður', title_en: 'Handling Equipment' },
  { id: 'hannanir-husum', title_is: 'Hannanir á húsum', title_en: 'Barn Design' },
]

nautahusSub.forEach((item, i) => {
  categories.push({
    _type: 'categoryNested',
    _id: `cat-nautahus-${item.id}`,
    title_is: item.title_is,
    title_en: item.title_en,
    slug: { _type: 'slug', current: item.id },
    parent: { _type: 'reference', _ref: 'cat-innr-nautahus' },
    order: i + 1,
  })
})

// 1.4.2. Innréttingar Fjós
const fjos = {
  _type: 'categoryNested',
  _id: 'cat-innr-fjos',
  title_is: 'Innréttingar Fjós',
  title_en: 'Dairy Barn Fittings',
  slug: { _type: 'slug', current: 'innr-fjos' },
  parent: { _type: 'reference', _ref: 'cat-innrettingar' },
  order: 2,
}
categories.push(fjos)

// Legubásainnréttingar
const legubasar = {
  _type: 'categoryNested',
  _id: 'cat-fjos-legubasar',
  title_is: 'Legubásainnréttingar',
  title_en: 'Cubicle Fittings',
  slug: { _type: 'slug', current: 'legubasar' },
  parent: { _type: 'reference', _ref: 'cat-innr-fjos' },
  order: 1,
}
categories.push(legubasar)

const legubasarSub = [
  { id: 'plast', title_is: 'Plast', title_en: 'Plastic' },
  { id: 'stal', title_is: 'Stál', title_en: 'Steel' },
]

legubasarSub.forEach((item, i) => {
  categories.push({
    _type: 'categoryNested',
    _id: `cat-legubasar-${item.id}`,
    title_is: item.title_is,
    title_en: item.title_en,
    slug: { _type: 'slug', current: `legubasar-${item.id}` },
    parent: { _type: 'reference', _ref: 'cat-fjos-legubasar' },
    order: i + 1,
  })
})

// Básamottur
const basamottur = {
  _type: 'categoryNested',
  _id: 'cat-fjos-basamottur',
  title_is: 'Básamottur',
  title_en: 'Cubicle Mats',
  slug: { _type: 'slug', current: 'basamottur' },
  parent: { _type: 'reference', _ref: 'cat-innr-fjos' },
  order: 2,
}
categories.push(basamottur)

const basamotturSub = [
  { id: 'vatnsmottur', title_is: 'Vatnsmottur', title_en: 'Water Mats' },
  { id: 'svampmottur', title_is: 'Svampmottur', title_en: 'Foam Mats' },
]

basamotturSub.forEach((item, i) => {
  categories.push({
    _type: 'categoryNested',
    _id: `cat-basamottur-${item.id}`,
    title_is: item.title_is,
    title_en: item.title_en,
    slug: { _type: 'slug', current: item.id },
    parent: { _type: 'reference', _ref: 'cat-fjos-basamottur' },
    order: i + 1,
  })
})

// Aðrir undirflokkar Fjós
const fjosSub = [
  { id: 'mottur-golf', title_is: 'Mottur í gólf', title_en: 'Floor Mats' },
  { id: 'atgrindur-fjos', title_is: 'Átgrindur', title_en: 'Feed Barriers' },
  { id: 'laesigrindur-fjos', title_is: 'Læsigrindur', title_en: 'Locking Gates' },
  { id: 'hlid', title_is: 'Hlið', title_en: 'Gates' },
  { id: 'milligerdi', title_is: 'Milligerði', title_en: 'Partitions' },
  { id: 'festingar-fjos', title_is: 'Festingar', title_en: 'Fixings' },
  { id: 'brynningar', title_is: 'Brynningar', title_en: 'Edges' },
]

fjosSub.forEach((item, i) => {
  categories.push({
    _type: 'categoryNested',
    _id: `cat-fjos-${item.id}`,
    title_is: item.title_is,
    title_en: item.title_en,
    slug: { _type: 'slug', current: item.id },
    parent: { _type: 'reference', _ref: 'cat-innr-fjos' },
    order: i + 3, // Start after legubasar and basamottur
  })
})

// 1.4.3. Innréttingar Kálfauppeldi
const kalfa = {
  _type: 'categoryNested',
  _id: 'cat-innr-kalfa',
  title_is: 'Innréttingar Kálfauppeldi',
  title_en: 'Calf Rearing Fittings',
  slug: { _type: 'slug', current: 'innr-kalfa' },
  parent: { _type: 'reference', _ref: 'cat-innrettingar' },
  order: 3,
}
categories.push(kalfa)

const kalfaSub = [
  { id: 'stiur-kalfa', title_is: 'Stíur', title_en: 'Pens' },
  { id: 'atgrindur-kalfa', title_is: 'Átgrindur', title_en: 'Feed Barriers' },
  { id: 'heygrindur-kalfa', title_is: 'Heygrindur', title_en: 'Hay Feeders' },
  { id: 'drykkjaskaalar-kalfa', title_is: 'Drykkjaskálar', title_en: 'Drinking Bowls' },
  { id: 'mottur-golf-kalfa', title_is: 'Mottur í gólf', title_en: 'Floor Mats' },
]

kalfaSub.forEach((item, i) => {
  categories.push({
    _type: 'categoryNested',
    _id: `cat-kalfa-${item.id}`,
    title_is: item.title_is,
    title_en: item.title_en,
    slug: { _type: 'slug', current: item.id },
    parent: { _type: 'reference', _ref: 'cat-innr-kalfa' },
    order: i + 1,
  })
})

// 1.4.4. Innréttingar Sauðfé og Hestar
const saud = {
  _type: 'categoryNested',
  _id: 'cat-innr-saud',
  title_is: 'Innréttingar Sauðfé og Hestar',
  title_en: 'Sheep & Horse Fittings',
  slug: { _type: 'slug', current: 'innr-saud-hestar' },
  parent: { _type: 'reference', _ref: 'cat-innrettingar' },
  order: 4,
}
categories.push(saud)

const saudSub = [
  { id: 'stiur-saud', title_is: 'Stíur', title_en: 'Pens' },
  { id: 'atgrindur-saud', title_is: 'Átgrindur', title_en: 'Feed Barriers' },
  { id: 'drykkjaskaalar-saud', title_is: 'Drykkjaskálar', title_en: 'Drinking Bowls' },
  { id: 'mottur-saud', title_is: 'Mottur', title_en: 'Mats' },
  { id: 'golfefni', title_is: 'Gólfefni', title_en: 'Flooring Material' },
]

saudSub.forEach((item, i) => {
  categories.push({
    _type: 'categoryNested',
    _id: `cat-saud-${item.id}`,
    title_is: item.title_is,
    title_en: item.title_en,
    slug: { _type: 'slug', current: item.id },
    parent: { _type: 'reference', _ref: 'cat-innr-saud' },
    order: i + 1,
  })
})

// ───────────────────────────────────────────────────────────
// 1.5. Heyskapur
// ───────────────────────────────────────────────────────────

const heyskapur = {
  _type: 'categoryNested',
  _id: 'cat-heyskapur',
  title_is: 'Heyskapur',
  title_en: 'Haymaking',
  slug: { _type: 'slug', current: 'heyskapur' },
  parent: { _type: 'reference', _ref: 'cat-landbunadur' },
  order: 5,
}
categories.push(heyskapur)

// Stæðugerð
const staedugerd = {
  _type: 'categoryNested',
  _id: 'cat-staedugerd',
  title_is: 'Stæðugerð',
  title_en: 'Stack Making',
  slug: { _type: 'slug', current: 'staedugerd' },
  parent: { _type: 'reference', _ref: 'cat-heyskapur' },
  order: 1,
}
categories.push(staedugerd)

const staedugerdSub = [
  { id: 'staeduyfirbreidslur', title_is: 'Stæðuyfirbreiðslur', title_en: 'Stack Covers' },
  { id: 'staeduveggir', title_is: 'Stæðuveggir', title_en: 'Stack Walls' },
  { id: 'staeduplast', title_is: 'Stæðuplast', title_en: 'Stack Plastic' },
  { id: 'iblondunarefni-staedu', title_is: 'Íblöndunarefni', title_en: 'Additives' },
]

staedugerdSub.forEach((item, i) => {
  categories.push({
    _type: 'categoryNested',
    _id: `cat-staedu-${item.id}`,
    title_is: item.title_is,
    title_en: item.title_en,
    slug: { _type: 'slug', current: item.id },
    parent: { _type: 'reference', _ref: 'cat-staedugerd' },
    order: i + 1,
  })
})

// Rúllugerð
const rullugerd = {
  _type: 'categoryNested',
  _id: 'cat-rullugerd',
  title_is: 'Rúllugerð',
  title_en: 'Baling',
  slug: { _type: 'slug', current: 'rullugerd' },
  parent: { _type: 'reference', _ref: 'cat-heyskapur' },
  order: 2,
}
categories.push(rullugerd)

const rullugerdSub = [
  { id: 'rulluplast', title_is: 'Rúlluplast', title_en: 'Bale Wrap' },
  { id: 'iblondunarefni-rullu', title_is: 'Íblöndunarefni', title_en: 'Additives' },
]

rullugerdSub.forEach((item, i) => {
  categories.push({
    _type: 'categoryNested',
    _id: `cat-rullu-${item.id}`,
    title_is: item.title_is,
    title_en: item.title_en,
    slug: { _type: 'slug', current: item.id },
    parent: { _type: 'reference', _ref: 'cat-rullugerd' },
    order: i + 1,
  })
})

// ───────────────────────────────────────────────────────────
// 1.6. Kjarnfóður
// ───────────────────────────────────────────────────────────

const kjarnfodur = {
  _type: 'categoryNested',
  _id: 'cat-kjarnfodur',
  title_is: 'Kjarnfóður',
  title_en: 'Concentrates',
  slug: { _type: 'slug', current: 'kjarnfodur' },
  parent: { _type: 'reference', _ref: 'cat-landbunadur' },
  order: 6,
}
categories.push(kjarnfodur)

const kjarnfodurSub = [
  { id: 'fyrir-nautin', title_is: 'Fyrir Nautin', title_en: 'For Cattle' },
  { id: 'fyrir-kyrnar', title_is: 'Fyrir Kýrnar', title_en: 'For Cows' },
  { id: 'fyrir-kalfana', title_is: 'Fyrir Kálfana', title_en: 'For Calves' },
  { id: 'fyrir-hrossin', title_is: 'Fyrir Hrossin', title_en: 'For Horses' },
]

kjarnfodurSub.forEach((item, i) => {
  categories.push({
    _type: 'categoryNested',
    _id: `cat-kjarn-${item.id}`,
    title_is: item.title_is,
    title_en: item.title_en,
    slug: { _type: 'slug', current: item.id },
    parent: { _type: 'reference', _ref: 'cat-kjarnfodur' },
    order: i + 1,
  })
})

// ───────────────────────────────────────────────────────────
// 1.7. Rekstrarvörur
// ───────────────────────────────────────────────────────────

const rekstrarvorur = {
  _type: 'categoryNested',
  _id: 'cat-rekstrarvorur',
  title_is: 'Rekstrarvörur',
  title_en: 'Operating Supplies',
  slug: { _type: 'slug', current: 'rekstrarvorur' },
  parent: { _type: 'reference', _ref: 'cat-landbunadur' },
  order: 7,
}
categories.push(rekstrarvorur)

const rekstrarvoruSub = [
  { id: 'mjolkurduft', title_is: 'Mjólkurduft', title_en: 'Milk Powder' },
  { id: 'sag', title_is: 'Sag', title_en: 'Sawdust' },
  { id: 'stalosan', title_is: 'Stalosan Blandað sag', title_en: 'Stalosan Mixed Sawdust' },
  { id: 'florbitar', title_is: 'Flórbitar', title_en: 'Flakes' },
  { id: 'velferdargolf-flor', title_is: 'Velferðagólf á flórbita', title_en: 'Welfare Floor on Flakes' },
]

rekstrarvoruSub.forEach((item, i) => {
  categories.push({
    _type: 'categoryNested',
    _id: `cat-rekstrar-${item.id}`,
    title_is: item.title_is,
    title_en: item.title_en,
    slug: { _type: 'slug', current: item.id },
    parent: { _type: 'reference', _ref: 'cat-rekstrarvorur' },
    order: i + 1,
  })
})

// ═══════════════════════════════════════════════════════════
// 2. GARÐYRKJUBÆNDUR
// ═══════════════════════════════════════════════════════════

const gardyrkja = {
  _type: 'categoryNested',
  _id: 'cat-gardyrkjubaendur',
  title_is: 'Garðyrkjubændur',
  title_en: 'Horticulture',
  slug: { _type: 'slug', current: 'gardyrkjubaendur' },
  icon: '🌱',
  order: 2,
  featured: true,
  showInMenu: true,
}
categories.push(gardyrkja)

// ═══════════════════════════════════════════════════════════
// 3. STÁLGRINDARHÚS
// ═══════════════════════════════════════════════════════════

const stalgrindarhus = {
  _type: 'categoryNested',
  _id: 'cat-stalgrindarhus',
  title_is: 'Stálgrindarhús',
  title_en: 'Steel Frame Buildings',
  slug: { _type: 'slug', current: 'stalgrindarhus' },
  icon: '🏗️',
  order: 3,
  featured: true,
  showInMenu: true,
}
categories.push(stalgrindarhus)

// ═══════════════════════════════════════════════════════════
// 4. GOLF OG FÓTBOLTAVELLIR
// ═══════════════════════════════════════════════════════════

const golf = {
  _type: 'categoryNested',
  _id: 'cat-golf-fotbolti',
  title_is: 'Golf og fótboltavellir',
  title_en: 'Golf & Football Fields',
  slug: { _type: 'slug', current: 'golf-fotbolti' },
  icon: '⚽',
  order: 4,
  featured: true,
  showInMenu: true,
}
categories.push(golf)

// ═══════════════════════════════════════════════════════════
// SEED FUNCTION
// ═══════════════════════════════════════════════════════════

async function seedCategories() {
  console.log(`🌱 Byrja að seeda ${categories.length} flokka...\n`)

  let count = 0
  for (const category of categories) {
    try {
      await client.createOrReplace(category)
      const indent = category.parent ? '  '.repeat(getDepth(category._id)) : ''
      console.log(`${indent}✅ ${category.icon || '📁'} ${category.title_is}`)
      count++
    } catch (error) {
      console.error(`❌ Villa við að búa til ${category.title_is}:`, error)
    }
  }

  console.log(`\n✨ Lokið! Bjó til ${count}/${categories.length} flokka`)
  console.log(`\n🎯 Næstu skref:`)
  console.log(`1. Opnaðu Sanity Studio: npm run dev`)
  console.log(`2. Farðu í "Vöruflokkar (Nested)"`)
  console.log(`3. Sjáðu alla flokkana`)
  console.log(`4. Búðu til vörur og veldu viðeigandi flokka`)
}

function getDepth(id) {
  const cat = categories.find(c => c._id === id)
  if (!cat || !cat.parent) return 0
  return 1 + getDepth(cat.parent._ref)
}

seedCategories()
