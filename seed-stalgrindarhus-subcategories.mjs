/**
 * Seed Script: Undirflokkar Stálgrindarhús
 *
 * Býr til 6 undirflokka undir cat-stalgrindarhus og hleður upp myndum.
 * Keyrðu: node seed-stalgrindarhus-subcategories.mjs
 */

import { createClient } from '@sanity/client'
import { createReadStream, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
})

// 6 undirflokkar — nafn, slug, mynd, lykkjulykill
const subcategories = [
  {
    _id: 'cat-stalgrindarhus-stalmontage',
    title_is: 'Stálmontage',
    title_en: 'Steel Mounting',
    slug: 'stalmontage',
    icon: '🔩',
    order: 1,
    imageFile: 'Bincx-Staalmontage-DC3-Harnaschpolder-Den-Hoorn.jpg',
  },
  {
    _id: 'cat-stalgrindarhus-stalgrindar',
    title_is: 'Stálgrindar',
    title_en: 'Steel Frames',
    slug: 'stalgrindar',
    icon: '🏗️',
    order: 2,
    imageFile: 'Boogaard-Alphen-stalen-gordingen-bincx.jpg',
  },
  {
    _id: 'cat-stalgrindarhus-veggjakerfi',
    title_is: 'Veggjakerfi',
    title_en: 'Wall Systems',
    slug: 'veggjakerfi',
    icon: '🧱',
    order: 3,
    imageFile: 'Walls-structural-systems.jpg',
  },
  {
    _id: 'cat-stalgrindarhus-thakgrindar',
    title_is: 'Þakgrindar',
    title_en: 'Roof Trusses',
    slug: 'thakgrindar',
    icon: '🏠',
    order: 4,
    imageFile: 'Boogaard-Alphen-staalmontage-bincx.jpg',
  },
  {
    _id: 'cat-stalgrindarhus-burdarvirki',
    title_is: 'Burðarvirki',
    title_en: 'Load-Bearing Structures',
    slug: 'burdarvirki',
    icon: '⚙️',
    order: 5,
    imageFile: '464219624_27274244518888179_7612179268258484497_n.jpg',
  },
  {
    _id: 'cat-stalgrindarhus-samsetning',
    title_is: 'Samsetning',
    title_en: 'Assembly',
    slug: 'samsetning',
    icon: '🔧',
    order: 6,
    imageFile: 'product_1658.jpg',
  },
]

async function uploadImage(filename) {
  const filePath = path.join(__dirname, 'public', 'stalgrindarhus', filename)
  if (!existsSync(filePath)) {
    console.warn(`  ⚠️  Mynd finnst ekki: ${filename}`)
    return null
  }
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename,
    contentType: filename.endsWith('.png') ? 'image/png' : 'image/jpeg',
  })
  return asset._id
}

async function seed() {
  console.log('🏗️  Undirflokkar Stálgrindarhús\n')
  console.log('Project:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production')
  console.log('')

  let done = 0

  for (const sub of subcategories) {
    console.log(`→ ${sub.icon} ${sub.title_is}`)

    // 1. Hlaða upp mynd
    process.stdout.write(`  📤 Hleð upp ${sub.imageFile}...`)
    const assetId = await uploadImage(sub.imageFile)
    if (assetId) {
      process.stdout.write(` ✅\n`)
    } else {
      process.stdout.write(` ⏭️  (sleppt)\n`)
    }

    // 2. Búa til flokk
    const doc = {
      _type: 'categoryNested',
      _id: sub._id,
      title_is: sub.title_is,
      title_en: sub.title_en,
      slug: { _type: 'slug', current: sub.slug },
      parent: { _type: 'reference', _ref: 'cat-stalgrindarhus' },
      icon: sub.icon,
      order: sub.order,
      showInMenu: true,
      featured: false,
      ...(assetId && {
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
        },
      }),
    }

    try {
      await client.createOrReplace(doc)
      console.log(`  ✅ Flokkur búinn til\n`)
      done++
    } catch (err) {
      console.error(`  ❌ Villa:`, err.message, '\n')
    }
  }

  console.log(`✨ Lokið! ${done}/${subcategories.length} flokkar búnir til.`)
  console.log(`\nOpnaðu Sanity Studio og farðu í Vöruflokkar til að sjá niðurstöður.`)
}

seed()
