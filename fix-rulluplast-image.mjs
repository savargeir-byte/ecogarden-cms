import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: 'atu6hs4h',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const imagePath = path.join(__dirname, 'public', 'landbunadur', 'plastrullurengi.jpg')

console.log('📤 Hleð upp plastrullurengi.jpg í Sanity...')

const asset = await client.assets.upload('image', createReadStream(imagePath), {
  filename: 'plastrullurengi.jpg',
  contentType: 'image/jpeg',
})

console.log('✅ Mynd hlaðin upp:', asset._id)

// Find rulluplast category
const cat = await client.fetch(`*[_type == "categoryNested" && slug.current == "rulluplast"][0]{ _id, title_is }`)

if (!cat) {
  console.error('❌ Rulluplast flokkur fannst ekki')
  process.exit(1)
}

console.log(`📂 Uppfæri flokk: ${cat.title_is} (${cat._id})`)

await client.patch(cat._id).set({
  image: {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id }
  }
}).commit()

console.log('✅ Mynd uppfærð á rulluplast flokk!')
