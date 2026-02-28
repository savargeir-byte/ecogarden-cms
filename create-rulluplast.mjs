import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import https from 'https';
import fs from 'fs';

config({ path: '.env.local' });

const client = createClient({
  projectId: 'atu6hs4h',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

// Download image buffer from URL
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

console.log('🌿 Bý til Rúlluplast flokk...\n');

// 1. Finna landbunadur _id
const landbunadur = await client.fetch(`*[_type=="categoryNested" && slug.current=="landbunadur"][0]{_id, title_is}`);
if (!landbunadur) {
  console.error('❌ landbunadur flokkur ekki fundinn!');
  process.exit(1);
}
console.log(`✅ Foreldri: ${landbunadur.title_is} (${landbunadur._id})`);

// 2. Athuga hvort rullugerd er þegar til
const existing = await client.fetch(`*[_type=="categoryNested" && slug.current=="rulluplast"][0]{_id}`);
if (existing) {
  console.log(`⚠️  Rúlluplast er þegar til (${existing._id}) — uppfæri mynd`);
}

// 3. Hlaða upp mynd - heyrúllur í hvítum plastpoka á akri
console.log('\n📥 Hleð niður mynd af hvítum heyrúllum...');
const imgBuffer = await downloadImage(
  'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=85'
);

const asset = await client.assets.upload('image', imgBuffer, {
  filename: 'hay-bales-silage.jpg',
  contentType: 'image/jpeg',
});
console.log(`✅ Mynd hlaðin upp: ${asset._id}`);

const imageRef = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };

// 4. Búa til eða uppfæra flokkinn
if (existing) {
  await client.patch(existing._id).set({ image: imageRef }).commit();
  console.log(`✅ Mynd uppfærð á ${existing._id}`);
} else {
  const newCat = await client.create({
    _type: 'categoryNested',
    _id: 'cat-rulluplast',
    title_is: 'Rúlluplast',
    title_en: 'Silage Film',
    slug: { _type: 'slug', current: 'rulluplast' },
    description_is: 'Agrocrop Evolution rúlluplast – þróuð sérstaklega fyrir erfiðar aðstæður. Fáanlegt í ljósgrænum, dökkgrænum, hvítum og svörtum lit.',
    description_en: 'Agrocrop Evolution silage film – developed for tough conditions. Available in light green, dark green, white and black.',
    icon: '🎬',
    image: imageRef,
    parent: { _type: 'reference', _ref: landbunadur._id },
    order: 10,
    showInMenu: true,
    status: 'active',
  });
  console.log(`✅ Nýr flokkur búinn til: ${newCat._id}`);
}

console.log('\n✅ Lokið! Rúlluplast er nú undirflokkur undir Landbúnaður.');
console.log('   Slóð: /flokkar/rulluplast');
