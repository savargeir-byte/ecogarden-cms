import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config({ path: '.env.local' })
const client = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2024-01-01', token: process.env.SANITY_API_TOKEN, useCdn: false })

// Hlaða upp myndunum
console.log('Hleð upp gudmundur.png...')
const gudAsset = await client.assets.upload('image', fs.createReadStream('gudmundur.png'), { filename: 'gudmundur.png' })
console.log('Guðmundur asset:', gudAsset._id)

console.log('Hleð upp olafur.png...')
const olafAsset = await client.assets.upload('image', fs.createReadStream('olafur.png'), { filename: 'olafur.png' })
console.log('Ólafur asset:', olafAsset._id)

// Uppfæra teamMembers með nýjum myndum
await client.patch('aboutPage').set({
  teamMembers: [
    {
      _key: 'gudmundur',
      name: 'Guðmundur Karl Eiríksson',
      jobTitle_is: 'Sölustjóri',
      jobTitle_en: 'Sales Manager',
      phone: '848-1468',
      quote_is: '',
      quote_en: '',
      description_is: 'Reynsla, þekking og kunnátta Guðmundar sem hann hefur hlotið af garðyrkjustörfum skiptir sköpum hjá Eco Garden. Hann hefur starfað við garðyrkju í yfir 13 ár og þekkir því vel til verka.\n\nGuðmundur hefur einnig starfað hjá Sölufélagi garðyrkjumanna og var Sölumaður hjá Sláturfélagi suðurlands.\n\nGuðmundur er fæddur og uppalinn á Flúðum, Hrunamannahreppi og kemur af landbúnaðarætt.',
      description_en: '',
      image: { _type: 'image', asset: { _type: 'reference', _ref: gudAsset._id } },
    },
    {
      _key: 'olafur',
      name: 'Ólafur E Ólafsson',
      jobTitle_is: 'Markaðsstjóri',
      jobTitle_en: 'Marketing Manager',
      phone: '659-8108',
      quote_is: '',
      quote_en: '',
      description_is: 'Ólafur hefur áratuga reynslu í rekstri og sölu á garðyrkjuvörum. Hann starfaði í mörg ár sem sölustjóri og síðar framkvæmdastjóri hjá Frjó Umbúðasölunni og síðar sem framkvæmdastjóri hjá Kassagerð Reykjavíkur.\n\nÓlafur er uppalinn undir Eyjafjöllum í Rángárvallasýslu og starfaði þar við hefðbundin landbúnaðarstörf og ræktun á grænmeti.',
      description_en: '',
      image: { _type: 'image', asset: { _type: 'reference', _ref: olafAsset._id } },
    },
  ]
}).commit()
console.log('✅ Sanity aboutPage teamMembers uppfærðir með nýjum myndum!')


