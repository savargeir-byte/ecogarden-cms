/**
 * Uppfærir hero mynd Stálgrindarhús í Sanity
 * Keyrðu: node update-stalgrindarhus-hero.mjs
 */

import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
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

async function run() {
  const filePath = path.join(__dirname, 'public', 'stalgrindarhus', 'Walls-structural-systems.jpg')
  console.log('📤 Hleð upp Walls-structural-systems.jpg...')
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename: 'Walls-structural-systems.jpg',
    contentType: 'image/jpeg',
  })
  console.log('✅ Mynd hlóðst upp:', asset._id)

  await client
    .patch('cat-stalgrindarhus')
    .set({
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      },
    })
    .commit()

  console.log('✅ Hero mynd Stálgrindarhús uppfærð!')
}

run()
