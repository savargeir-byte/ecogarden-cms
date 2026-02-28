// fix-missing-images.mjs - Lagar þær myndir sem mistókust í fyrri keyrslu

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

// Aðeins þeir flokkar sem mistókust - með öðrum Unsplash myndum
const FIX_IMAGES = {
  // Vatnsmottur / drinking areas - use dairy barn photo
  'vatnsmottur':          'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=80',
  'drykkjaskaalar-hlifar':'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=80',
  'brynningar':           'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=80',
  
  // Welfare floor / floor improvement
  'velferdargolf-flor':   'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80',
  'florbitar':            'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80',
  
  // Metal fixtures / fastenings
  'festingar':            'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
  'festingar-fjos':       'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
  'hannanir-husum':       'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
  
  // Silage plastic / covers
  'staeduyfirbreidslur':  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
  'staeduplast':          'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200&q=80',
  'iblondunarefni-staedu':'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200&q=80',
  
  // Sawdust bedding
  'sag':                  'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200&q=80',
  
  // Farm hygiene / Stalosan
  'stalosan':             'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1200&q=80',
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)
    const protocol = url.startsWith('https') ? https : http
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
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

async function updateCategoryImage(slug, imageUrl) {
  const category = await client.fetch(
    `*[_type == "categoryNested" && slug.current == $slug][0]`,
    { slug }
  )
  if (!category) {
    console.log(`  ⚠️  Ekki fundinn: ${slug}`)
    return
  }

  const tmpDir = 'tmp-imgs'
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir)
  const tmpFile = path.join(tmpDir, `${slug}.jpg`)

  try {
    await downloadImage(imageUrl, tmpFile)
    const fileBuffer = fs.readFileSync(tmpFile)
    
    // Check file size - if too small it's probably an error page
    if (fileBuffer.length < 5000) {
      console.log(`  ❌ ${slug}: myndin of lítil (${fileBuffer.length} bytes) - líklega villa`)
      fs.unlinkSync(tmpFile)
      return
    }

    const asset = await client.assets.upload('image', fileBuffer, {
      filename: `${slug}.jpg`,
      contentType: 'image/jpeg',
    })
    fs.unlinkSync(tmpFile)

    await client.patch(category._id)
      .set({
        image: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id }
        }
      })
      .commit()

    console.log(`  ✅ ${slug} (${category.title?.is || category.title}): mynd uppfærð`)
  } catch (err) {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile)
    console.log(`  ❌ ${slug}: ${err.message}`)
  }
}

async function main() {
  console.log('🔧 Laga myndir sem mistókust...\n')
  for (const [slug, url] of Object.entries(FIX_IMAGES)) {
    await updateCategoryImage(slug, url)
    await new Promise(r => setTimeout(r, 400))
  }
  if (fs.existsSync('tmp-imgs')) fs.rmSync('tmp-imgs', { recursive: true })
  console.log('\n✅ Lokið!')
}

main().catch(console.error)
