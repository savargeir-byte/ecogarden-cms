import { createClient } from '@sanity/client';
const client = createClient({ projectId: 'atu6hs4h', dataset: 'production', apiVersion: '2024-01-01', useCdn: false });
const p = await client.fetch(`*[_type == "product" && slug.current == "rulluplast"][0] { _id, title, status, slug, "categories": categories[]->{ _id, title_is, "slug": slug.current } }`);
console.log(JSON.stringify(p, null, 2));
const cat = await client.fetch(`*[_type == "categoryNested" && slug.current == "rulluplast"][0] { _id, title_is, "slug": slug.current }`);
console.log("Category:", JSON.stringify(cat, null, 2));
