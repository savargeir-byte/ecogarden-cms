import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

config({ path: '.env.local' });

const client = createClient({
  projectId: 'atu6hs4h',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

const DRIVE = 'G:/My Drive/ECO-GARDEN/drive-download-20260227T154159Z-1-001';

// Slug -> Drive filename mapping
const UPDATES = [
  { slug: 'sadvorur',         file: 'Turfline_Turbo_1080x1080.png',         mime: 'image/png'  },
  { slug: 'grasfre',          file: 'Turfline_Grass Fix_1080x1080.png',      mime: 'image/png'  },
  { slug: 'velar-taeki',      file: 'imupuhallusvalssi.jpg',                 mime: 'image/jpeg' },
  { slug: 'mykjulon-tankar',  file: 'mykjulon 3.jpg',                        mime: 'image/jpeg' },
  { slug: 'mykjulon',         file: 'mykjulon 3.jpg',                        mime: 'image/jpeg' },
  { slug: 'innrettingar',     file: 'teemoore básar.jpg',                    mime: 'image/jpeg' },
  { slug: 'heyskapur',        file: 'pressa stór.jpg',                       mime: 'image/jpeg' },
  { slug: 'rullugerd',        file: 'pressa stór.jpg',                       mime: 'image/jpeg' },
  { slug: 'kjarnfodur',       file: 'sykurrófa.webp',                        mime: 'image/webp' },
  { slug: 'gardyrkjubaendur', file: 'Turfline_Grass Fix_1080x1080.png',      mime: 'image/png'  },
  { slug: 'golf-fotbolti',    file: 'V12-verlegt-1920w.webp',                mime: 'image/webp' },
  { slug: 'landbunadur',      file: 'nytt-fjos-3.jpg',                       mime: 'image/jpeg' },
  { slug: 'stalgrindarhus',   file: 'Bincx-Staalmontage-DC3-Harnaschpolder-Den-Hoorn.jpg', mime: 'image/jpeg' },
];

// Upload image to Sanity and return asset reference
async function uploadImage(filePath, mime, label) {
  console.log(`  Hleð upp: ${label}...`);
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload('image', buffer, {
    filename: path.basename(filePath),
    contentType: mime,
  });
  console.log(`  ✅ Uploaded: ${asset._id}`);
  return asset._id;
}

// Find sanity doc by slug and update image
async function updateCategory(slug, assetId) {
  const docs = await client.fetch(
    `*[_type == "categoryNested" && slug.current == $slug]{_id}`,
    { slug }
  );
  if (docs.length === 0) {
    console.log(`  ⚠️  Flokkur ekki fundinn: ${slug}`);
    return;
  }
  for (const doc of docs) {
    await client.patch(doc._id).set({
      image: { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
    }).commit();
    console.log(`  ✅ Uppfærður: ${slug} (${doc._id})`);
  }
}

// Asset cache to avoid uploading same file twice
const assetCache = {};

for (const { slug, file, mime } of UPDATES) {
  const filePath = path.join(DRIVE, file);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Mynd ekki fundin: ${file}`);
    continue;
  }
  console.log(`\n📦 ${slug} ← ${file}`);

  if (!assetCache[file]) {
    assetCache[file] = await uploadImage(filePath, mime, file);
  }
  await updateCategory(slug, assetCache[file]);
}

console.log('\n✅ Lokið!');
