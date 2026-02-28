import { createClient } from '@sanity/client';
import { config } from 'dotenv';
config({ path: '.env.local' });

const client = createClient({
  projectId: 'atu6hs4h',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

const landbunadur = await client.fetch(`*[_type=="categoryNested" && slug.current=="landbunadur"][0]{_id}`);
console.log('Landbúnaður _id:', landbunadur._id);

await client.patch('cat-rullu-rulluplast')
  .set({ parent: { _type: 'reference', _ref: landbunadur._id } })
  .commit();

console.log('✅ Rúlluplast flutt beint undir Landbúnaður');
console.log('   Slóð: /flokkar/rulluplast');
