// create-rulluplast-product.mjs
// Býr til vöru "Rúlluplast" undir rulluplast flokkinn í Sanity

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'fs'
import https from 'https'
import http from 'http'
import path from 'path'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'atu6hs4h',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)
    const protocol = url.startsWith('https') ? https : http
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close()
        fs.unlinkSync(filepath)
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject)
        return
      }
      response.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', (err) => {
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
      reject(err)
    })
  })
}

async function main() {
  console.log('🌿 Bý til Rúlluplast vöru...\n')

  // Find rulluplast category
  const cat = await client.fetch(
    `*[_type == "categoryNested" && slug.current == "rulluplast"][0]{ _id, title }`
  )
  if (!cat) {
    console.log('❌ Rúlluplast flokkur ekki fundinn!')
    return
  }
  console.log(`✅ Flokkur fundinn: ${cat._id}`)

  // Download product image (brochure from eco-garden.is)
  const imageUrl = 'https://static.wixstatic.com/media/25a8ec_7bef0b83767a4a9598ca36d4a0afb3a5~mv2.jpg'
  const tmpFile = 'tmp-rulluplast-product.jpg'
  
  console.log('📸 Sæki mynd af rúlluplasti...')
  await downloadImage(imageUrl, tmpFile)
  
  const fileBuffer = fs.readFileSync(tmpFile)
  console.log(`   Mynd: ${fileBuffer.length} bytes`)
  
  const asset = await client.assets.upload('image', fileBuffer, {
    filename: 'rulluplast-einblodungur.jpg',
    contentType: 'image/jpeg',
  })
  fs.unlinkSync(tmpFile)
  console.log(`✅ Mynd hlaðin upp: ${asset._id}`)

  // Check if product with this slug already exists
  const existing = await client.fetch(
    `*[_type == "product" && slug.current == "rulluplast"][0]{ _id }`
  )
  if (existing) {
    console.log(`⚠️  Vara með slug "rulluplast" er þegar til (${existing._id})`)
    console.log('   Uppfæri mynd og flokk...')
    await client.patch(existing._id)
      .set({
        image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
        categories: [{ _type: 'reference', _ref: cat._id, _key: 'rulluplast-cat' }],
      })
      .commit()
    console.log('✅ Vara uppfærð!')
    return
  }

  // Create new product
  const product = await client.create({
    _type: 'product',
    title: 'Rúlluplast',
    slug: { _type: 'slug', current: 'rulluplast' },
    description: 'Rúlluplast frá Eco Garden er sérhannað plastþvara fyrir heyrúllur. Plastet er þrílaga með UV-vernd og veður frábæran gæðaplast sem tryggir bestu mögulegu geymslu á silage. Ásamt langan líftíma og endingargóðum efni er Rúlluplast Eco Garden frábær lausn fyrir íslenska bændur. Fáanlegt í hvítum og svörtum lit, 500mm x 1800m.',
    categories: [
      { _type: 'reference', _ref: cat._id, _key: 'rulluplast-cat' }
    ],
    image: {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id }
    },
    features: [
      'Þrílaga uppbygging með UV-vernd',
      'Framúrskarandi togþol og teygjanleiki',
      'Fáanlegt í hvítum og svörtum lit',
      'Stærð: 500mm x 1800m',
      'Hentar fyrir allar gerðir rúllupressa',
      'Íslenska veðrið í huga',
    ],
    specifications: [
      { _key: 's1', key: 'Breidd',    value: '500 mm' },
      { _key: 's2', key: 'Lengd',     value: '1800 m' },
      { _key: 's3', key: 'Þykkt',     value: '25 µm' },
      { _key: 's4', key: 'Litir',     value: 'Hvítur, Svartur' },
      { _key: 's5', key: 'UV-vernd',  value: 'Já' },
      { _key: 's6', key: 'Lag',       value: '3 lög' },
    ],
    status: 'published',
  })

  console.log(`\n✅ Vara búin til!`)
  console.log(`   _id: ${product._id}`)
  console.log(`   Slóð: /products/rulluplast`)
}

main().catch(console.error)
