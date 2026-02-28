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

const docs = await client.fetch(`*[_type=="categoryNested"] | order(order asc) {
  _id,
  title_is,
  "slug": slug.current,
  "image": image.asset->url,
  "parent": parent->{"slug": slug.current, "title": title_is}
}`);

docs.forEach(c => {
  const prefix = c.parent ? '  └─ ' : '└─ ';
  const img = c.image ? '✅ ' + c.image.substring(0, 60) : '❌ engin mynd';
  console.log(`${prefix}${c.slug} | ${c.title_is} | parent:${c.parent?.slug ?? '-'}`);
  console.log(`      ${img}`);
});
