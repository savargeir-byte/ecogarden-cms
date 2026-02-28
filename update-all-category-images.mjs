// update-all-category-images.mjs
// Uppfærir myndir á öllum undirflokkum með viðeigandi Unsplash myndum

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

// Mapping: category slug -> Unsplash photo URL
// Valdar myndir sem passa hvert flokk
const CATEGORY_IMAGES = {
  // ═══════════════════════════════════════════════
  // SÁÐVÖRUR undirflokkar
  // ═══════════════════════════════════════════════
  'byggfre': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80',
  // Barley/grain field - builds/barley
  
  'lupina': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  // Lupine flowers in field
  
  'graenfodur': 'https://images.unsplash.com/photo-1542223616-9de9adb5e3e8?w=1200&q=80',
  // Clover/green fodder crops
  
  'rofur': 'https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?w=1200&q=80',
  // Root vegetables / turnips / beets

  // ═══════════════════════════════════════════════
  // VÉLAR OG TÆKI undirflokkar
  // ═══════════════════════════════════════════════
  'plastpressur': 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80',
  // Round baler / plastic wrap bales
  
  'gjafaskoflur': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80',
  // Farm machinery/equipment
  
  'heilfodur': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80',
  // TMR mixer wagon / farm machinery
  
  'haughraerur': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
  // Manure / slurry agitator - farm landscape
  
  'udadaelur': 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=1200&q=80',
  // Milking machine / dairy equipment

  // ═══════════════════════════════════════════════
  // MYKJULÓN & TANKAR undirflokkar
  // ═══════════════════════════════════════════════
  'mykjulon': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
  // Slurry lagoon / farm pond
  
  'mykjutankar': 'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=1200&q=80',
  // Large storage tanks
  
  'vatnstankar': 'https://images.unsplash.com/photo-1562016600-ece13e8ba570?w=1200&q=80',
  // Water storage tanks

  // ═══════════════════════════════════════════════
  // INNRÉTTINGAR - yfirflokkur og undirflokkar
  // ═══════════════════════════════════════════════
  'innr-fjos': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80',
  // Modern dairy barn interior
  
  'innr-nautahus': 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=80',
  // Cattle house / beef barn interior
  
  'innr-kalfa': 'https://images.unsplash.com/photo-1593179357196-ea11a2e7c119?w=1200&q=80',
  // Calves in barn / calf housing
  
  'innr-saud-hestar': 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=1200&q=80',
  // Sheep in barn

  // ═══════════════════════════════════════════════
  // BÁSAMOTTUR / MOTTTUR undirflokkar
  // ═══════════════════════════════════════════════
  'basamottur': 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=80',
  // Stall mats - cow lying area
  
  'vatnsmottur': 'https://images.unsplash.com/photo-1551888191-5d0d08f4c35e?w=1200&q=80',
  // Water mat / cattle drinking area
  
  'svampmottur': 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=80',
  // Sponge foam mats
  
  'mottur-golf': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80',
  // Rubber floor matting in barn aisle
  
  'mottur-golf-kalfa': 'https://images.unsplash.com/photo-1593179357196-ea11a2e7c119?w=1200&q=80',
  // Calf floor mats
  
  'mottur-saud': 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=1200&q=80',
  // Sheep stall mats
  
  'golfefni': 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=1200&q=80',
  // Floor material for sheep/horses
  
  'velferdargolf': 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=80',
  // Welfare floor - dairy cattle
  
  'velferdargolf-flor': 'https://images.unsplash.com/photo-1616695060788-85b72566b47a?w=1200&q=80',
  // Welfare floor on florbitar

  // ═══════════════════════════════════════════════
  // LEGUBÁSAR undirflokkar
  // ═══════════════════════════════════════════════
  'legubasar': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80',
  // Cubicle / lying area system
  
  'legubasar-plast': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80',
  // Plastic cubicle dividers
  
  'legubasar-stal': 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=80',
  // Steel cubicle dividers

  // ═══════════════════════════════════════════════
  // ÚTGRINDUR / LŒSIGRINDUR undirflokkar
  // ═══════════════════════════════════════════════
  'atgrindur-fjos': 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80',
  // Farm gate / exit gate
  
  'atgrindur': 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80',
  // Cattle house exit gate
  
  'atgrindur-kalfa': 'https://images.unsplash.com/photo-1593179357196-ea11a2e7c119?w=1200&q=80',
  // Calf gate / pen divider
  
  'atgrindur-saud': 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=1200&q=80',
  // Sheep gate / sorting gate
  
  'laesigrindur': 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=80',
  // Head locks / cattle yokes
  
  'laesigrindur-fjos': 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=80',
  // Head locks in dairy barn
  
  'milligrindur': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80',
  // Partition gates between stalls
  
  'milligerdi': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80',
  // Barn partition walls/panels
  
  'hlid': 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80',
  // Farm door/gate

  // ═══════════════════════════════════════════════
  // DRYKKJASKÁLAR undirflokkar
  // ═══════════════════════════════════════════════
  'drykkjaskaalar-hlifar': 'https://images.unsplash.com/photo-1551888191-5d0d08f4c35e?w=1200&q=80',
  // Drinking bowls with covers
  
  'drykkjaskaalar-kalfa': 'https://images.unsplash.com/photo-1593179357196-ea11a2e7c119?w=1200&q=80',
  // Calf drinking equipment
  
  'drykkjaskaalar-saud': 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=1200&q=80',
  // Sheep drinkers/troughs
  
  'brynningar': 'https://images.unsplash.com/photo-1551888191-5d0d08f4c35e?w=1200&q=80',
  // Cattle watering/drinking stations

  // ═══════════════════════════════════════════════
  // HEYGRINDUR / FESTINGAR undirflokkar
  // ═══════════════════════════════════════════════
  'heygrindur-kalfa': 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80',
  // Hay rack for calves
  
  'festingar': 'https://images.unsplash.com/photo-1581094480765-18994bc2d278?w=1200&q=80',
  // Metal fixtures / fastenings
  
  'festingar-fjos': 'https://images.unsplash.com/photo-1581094480765-18994bc2d278?w=1200&q=80',
  // Barn metal fastenings
  
  'hannanir-husum': 'https://images.unsplash.com/photo-1581094480765-18994bc2d278?w=1200&q=80',
  // Animal barn building fittings
  
  'stiur-kalfa': 'https://images.unsplash.com/photo-1593179357196-ea11a2e7c119?w=1200&q=80',
  // Calf stall / calf pen
  
  'stiur-saud': 'https://images.unsplash.com/photo-1518877593221-1f28583780b4?w=1200&q=80',
  // Sheep pen / sorting pen
  
  'medhondlunarbunadur': 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1200&q=80',
  // Cattle handling equipment / cattle crush

  // ═══════════════════════════════════════════════
  // HEYSKAPUR undirflokkar
  // ═══════════════════════════════════════════════
  'rullugerd': 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80',
  // Round bale making / baling
  
  'iblondunarefni-rullu': 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80',
  // Bale wrap / net / twine
  
  'staedugerd': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
  // Silage clamp / bunker
  
  'staeduyfirbreidslur': 'https://images.unsplash.com/photo-1547593897-db422dc8f89c?w=1200&q=80',
  // Silage cover / plastic sheeting on clamp
  
  'staeduveggir': 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
  // Concrete silage walls / retaining walls
  
  'staeduplast': 'https://images.unsplash.com/photo-1547593897-db422dc8f89c?w=1200&q=80',
  // Silage plastic film
  
  'iblondunarefni-staedu': 'https://images.unsplash.com/photo-1547593897-db422dc8f89c?w=1200&q=80',
  // Silage clamp additives / inoculants

  // ═══════════════════════════════════════════════
  // KJARNFÓÐUR undirflokkar
  // ═══════════════════════════════════════════════
  'fyrir-nautin': 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1200&q=80',
  // Bulls / beef cattle
  
  'fyrir-kyrnar': 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=1200&q=80',
  // Dairy cows eating concentrate
  
  'fyrir-kalfana': 'https://images.unsplash.com/photo-1593179357196-ea11a2e7c119?w=1200&q=80',
  // Calves eating feed
  
  'fyrir-hrossin': 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1200&q=80',
  // Horses eating grain/feed

  // ═══════════════════════════════════════════════
  // REKSTRARVÖRUR undirflokkar
  // ═══════════════════════════════════════════════
  'sag': 'https://images.unsplash.com/photo-1535083783855-aaab7f9a2fb7?w=1200&q=80',
  // Wood shavings / sawdust bedding
  
  'mjolkurduft': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&q=80',
  // Milk powder / dairy
  
  'florbitar': 'https://images.unsplash.com/photo-1616695060788-85b72566b47a?w=1200&q=80',
  // Barn floor / floor improvement
  
  'stalosan': 'https://images.unsplash.com/photo-1583744946564-b52d9fd13863?w=1200&q=80',
  // Farm hygiene / disinfectant
  
  'rekstrarvorur': 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1200&q=80',

  // ═══════════════════════════════════════════════
  // STÁLGRINDARH ÚS undirflokkar
  // ═══════════════════════════════════════════════
  'thakgrindar': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
  // Roof structure / steel rafters
  
  'burdarvirki': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
  // Load-bearing steel structure
  
  'samsetning': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
  // Steel building assembly
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
      file.on('finish', () => {
        file.close()
        resolve()
      })
    }).on('error', (err) => {
      fs.unlinkSync(filepath)
      reject(err)
    })
  })
}

async function uploadImageToSanity(imageUrl, categorySlug) {
  const tmpFile = path.join('tmp-imgs', `${categorySlug}.jpg`)
  if (!fs.existsSync('tmp-imgs')) fs.mkdirSync('tmp-imgs')
  
  try {
    await downloadImage(imageUrl, tmpFile)
    const fileBuffer = fs.readFileSync(tmpFile)
    const asset = await client.assets.upload('image', fileBuffer, {
      filename: `${categorySlug}.jpg`,
      contentType: 'image/jpeg',
    })
    fs.unlinkSync(tmpFile)
    return asset._id
  } catch (err) {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile)
    throw err
  }
}

async function updateCategoryImage(slug, imageUrl) {
  // Find category by slug
  const category = await client.fetch(
    `*[_type == "categoryNested" && slug.current == $slug][0]`,
    { slug }
  )
  
  if (!category) {
    console.log(`  ⚠️  Flokkur ekki fundinn: ${slug}`)
    return false
  }

  // Check if category already has a real image (not placeholder)
  // We'll skip categories that already have custom images by checking image asset
  // Placeholder hashes we know: fda12e9507d, 71bda789eb2, a166ed47996, fda12e9507d
  const PLACEHOLDER_PREFIXES = [
    'fda12e9507d',
    '71bda789eb2', 
    'a166ed47996',
  ]
  
  if (category.image?.asset?._ref) {
    const ref = category.image.asset._ref
    // Check if it's a known placeholder
    const isPlaceholder = PLACEHOLDER_PREFIXES.some(p => ref.includes(p))
    if (!isPlaceholder) {
      // Already has a real custom image - skip
      // console.log(`  ⏭️  ${slug}: þegar með sérstaka mynd, sleppum`)
      // Actually update anyway to ensure best possible images
    }
  }

  try {
    console.log(`  📸 Hleð upp mynd fyrir: ${slug} (${category.title?.is || category.title})`)
    const assetId = await uploadImageToSanity(imageUrl, slug)
    
    await client.patch(category._id)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetId,
          }
        }
      })
      .commit()
    
    console.log(`  ✅ ${slug}: mynd uppfærð`)
    return true
  } catch (err) {
    console.log(`  ❌ ${slug}: villa - ${err.message}`)
    return false
  }
}

async function main() {
  console.log('🌿 Uppfæri myndir á öllum undirflokkum...\n')
  
  const slugs = Object.keys(CATEGORY_IMAGES)
  let success = 0
  let failed = 0
  let notFound = 0

  for (const slug of slugs) {
    const imageUrl = CATEGORY_IMAGES[slug]
    const result = await updateCategoryImage(slug, imageUrl)
    if (result === true) success++
    else if (result === false) notFound++
    else failed++
    
    // Small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 300))
  }
  
  // Cleanup tmp folder
  if (fs.existsSync('tmp-imgs')) {
    fs.rmdirSync('tmp-imgs', { recursive: true })
  }
  
  console.log(`\n📊 Niðurstaða:`)
  console.log(`  ✅ ${success} undirflokkar uppfærðir`)
  console.log(`  ⚠️  ${notFound} flokkar ekki fundnir`)
  console.log(`  ❌ ${failed} villur`)
}

main().catch(console.error)
