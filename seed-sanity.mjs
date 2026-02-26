/**
 * SANITY SEED SCRIPT
 * Keyrir: node seed-sanity.mjs
 *
 * Setur alla núverandi hardcoded texta og myndir inn í Sanity
 * svo þú getir edit-að allt frá Studio.
 */

import { createClient } from '@sanity/client';
import https from 'https';
import http from 'http';

const client = createClient({
  projectId: 'atu6hs4h',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || '',
  useCdn: false,
});

// ── Upload mynd frá URL ───────────────────────────────────────
async function uploadImageFromUrl(url, filename) {
  console.log(`  📸 Hleð upp mynd: ${filename}...`);
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', async () => {
        const buffer = Buffer.concat(chunks);
        try {
          const asset = await client.assets.upload('image', buffer, {
            filename,
            contentType: res.headers['content-type'] || 'image/jpeg',
          });
          console.log(`     ✓ ${filename} → ${asset._id}`);
          resolve({ _type: 'image', asset: { _type: 'reference', _ref: asset._id } });
        } catch (e) {
          console.warn(`     ⚠ Tókst ekki að hlaða upp ${filename}:`, e.message);
          resolve(null);
        }
      });
      res.on('error', (e) => {
        console.warn(`     ⚠ Tókst ekki að sækja ${filename}:`, e.message);
        resolve(null);
      });
    }).on('error', (e) => {
      console.warn(`     ⚠ ${filename}:`, e.message);
      resolve(null);
    });
  });
}

// ── Eyða gömlu document ef til ───────────────────────────────
async function deleteIfExists(id) {
  try { await client.delete(id); } catch {}
}

// ─────────────────────────────────────────────────────────────
console.log('\n🌿 EcoGarden Sanity Seed Script\n');

// ── 1. MYNDIR ────────────────────────────────────────────────
console.log('1️⃣  Hleð upp myndir...');
const [heroImg, aboutImg, contactImg, cat1Img, cat2Img, cat3Img, person1Img, person2Img] = await Promise.all([
  uploadImageFromUrl(
    'https://static.wixstatic.com/media/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg/v1/fill/w_1960,h_1040,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg',
    'hero-forsida.jpg'
  ),
  uploadImageFromUrl(
    'https://static.wixstatic.com/media/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg/v1/fill/w_1960,h_1040,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg',
    'hero-um-okkur.jpg'
  ),
  uploadImageFromUrl(
    'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1920&q=80',
    'hero-samband.jpg'
  ),
  uploadImageFromUrl(
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
    'flokkur-gardyrkjubaendur.jpg'
  ),
  uploadImageFromUrl(
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    'flokkur-landbunadur.jpg'
  ),
  uploadImageFromUrl(
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    'flokkur-gardyrkjuvorur.jpg'
  ),
  uploadImageFromUrl(
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
    'gudmundur.jpg'
  ),
  uploadImageFromUrl(
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    'olafur.jpg'
  ),
]);

// ── 2. FORSÍÐA ───────────────────────────────────────────────
console.log('\n2️⃣  Forsíða...');
await deleteIfExists('homePage');
await client.createOrReplace({
  _id: 'homePage',
  _type: 'homePage',
  // Hero
  title_is: 'Garðlausnir sem endast',
  title_en: 'Garden Solutions That Last',
  subtitle_is: 'Við hönnum og segjum lausnir fyrir íslenskar aðstæður – með 50+ ára reynslu.',
  subtitle_en: 'We design and supply solutions for Icelandic conditions – with 50+ years of experience.',
  ...(heroImg && { image: heroImg }),
  imageAlt_is: 'Eco Garden – Sjálfbær garðyrkja',
  imageAlt_en: 'Eco Garden – Sustainable Horticulture',
  ctaText_is: 'Sjá vörur',
  ctaText_en: 'View Products',
  ctaLink: '/products',
  // Mission
  missionHeading_is: 'Garðlausnir sem endast í íslenskum aðstæðum',
  missionHeading_en: 'Garden Solutions Built for Icelandic Conditions',
  missionText_is: 'Við hönnum og veljum lausnir sem standast veður, tíma og raunverulega notkun.',
  missionText_en: 'We design and select solutions that withstand weather, time, and real-world use.',
  missionDesc_is: 'Hvort sem um er að ræða heildarlausnir fyrir garða, ræktun eða sérhæfðar vörur, þá byggjum við á reynslu, þekkingu og gæðum sem endast. Öll vörumerki og verkfæri eru valin af fagfólki með áratuga reynslu í íslenskri garðyrkju og landbúnaði.',
  missionDesc_en: 'Whether complete garden solutions, cultivation, or specialist products – we build on experience, knowledge, and lasting quality. All brands and tools are selected by professionals with decades of experience.',
  // Stats
  statsHeading_is: 'Reynsla sem skiptir máli',
  statsHeading_en: 'Experience That Matters',
  statsSubheading_is: 'Tölur sem segja söguna',
  statsSubheading_en: 'Numbers that tell the story',
  stat1Value: 200,
  stat1Suffix: '+',
  stat1Label_is: 'Verkefni',
  stat1Label_en: 'Projects',
  stat1Desc_is: 'Fullunnin garðverkefni síðan 2004',
  stat1Desc_en: 'Completed garden projects since 2004',
  stat2Value: 50,
  stat2Suffix: '+',
  stat2Label_is: 'Ára reynsla',
  stat2Label_en: 'Years of Experience',
  stat2Desc_is: 'Í íslenskri garðyrkju',
  stat2Desc_en: 'In Icelandic horticulture',
  stat3Value: 95,
  stat3Suffix: '%',
  stat3Label_is: 'Ánægðir viðskiptavinir',
  stat3Label_en: 'Satisfied Customers',
  stat3Desc_is: 'Endurtaka viðskipti við okkur',
  stat3Desc_en: 'Return for repeat business',
});
console.log('   ✓ Forsíða');

// ── 3. UM OKKUR ──────────────────────────────────────────────
console.log('\n3️⃣  Um okkur...');
await deleteIfExists('aboutPage');
await client.createOrReplace({
  _id: 'aboutPage',
  _type: 'aboutPage',
  heroTitle_is: 'Garðlausnir sem endast',
  heroTitle_en: 'Garden Solutions That Last',
  heroSubtitle_is: 'Við hönnum lausnir fyrir íslenskar aðstæður. 50+ ára reynsla í garðyrkju og fagleg ráðgjöf frá upphafi.',
  heroSubtitle_en: 'We design solutions for Icelandic conditions. 50+ years of horticultural experience and professional guidance.',
  ...(aboutImg && { heroImage: aboutImg }),
  heroBtn1_is: 'Fá ókeypis ráðgjöf',
  heroBtn1_en: 'Get Free Consultation',
  heroBtn2_is: 'Skoða vörur',
  heroBtn2_en: 'View Products',
  trustBadges: [
    { _key: 'tb1', text_is: '50+ ára reynsla',                 text_en: '50+ years of experience' },
    { _key: 'tb2', text_is: 'Vistvæn efni',                    text_en: 'Eco-friendly materials' },
    { _key: 'tb3', text_is: 'Lausnir fyrir heimili & fyrirtæki', text_en: 'Solutions for homes & businesses' },
    { _key: 'tb4', text_is: 'Þjónusta um allt land',            text_en: 'Nationwide service' },
  ],
  whyHeading_is: 'Af hverju Eco Garden?',
  whyHeading_en: 'Why Eco Garden?',
  whyCards: [
    { _key: 'wc1', emoji: '🌿', title_is: 'Vistvæn nálgun',          title_en: 'Eco-friendly approach',       text_is: 'Allar lausnir eru þróaðar með umhverfið í huga.',              text_en: 'All solutions are developed with the environment in mind.' },
    { _key: 'wc2', emoji: '🏆', title_is: 'Reynsla sem skiptir máli', title_en: 'Experience that matters',      text_is: 'Yfir 50 ára samsett reynsla í garðyrkju og rekstri.',           text_en: 'Over 50 years of combined experience in horticulture and business.' },
    { _key: 'wc3', emoji: '💼', title_is: 'Lausnir sem endast',       title_en: 'Solutions that last',          text_is: 'Við veljum efni og vörur sem standast íslenskar aðstæður.',    text_en: 'We choose materials and products that withstand Icelandic conditions.' },
  ],
  solutionsHeading_is: 'Okkar lausnir',
  solutionsHeading_en: 'Our Solutions',
  solutionCards: [
    { _key: 'sc1', emoji: '🎨', title_is: 'Hönnun sem virkar',   title_en: 'Design that works',       text_is: 'Sérsniðin garðhönnun fyrir íslenskar aðstæður.',                             text_en: 'Custom garden design for Icelandic conditions.' },
    { _key: 'sc2', emoji: '🌱', title_is: 'Ræktunarlausnir',     title_en: 'Cultivation solutions',   text_is: 'Snjallar lausnir fyrir ræktun í garði, gróðurhúsi eða atvinnuskyni.',      text_en: 'Smart solutions for cultivation in gardens, greenhouses or commercial use.' },
    { _key: 'sc3', emoji: '🛠️', title_is: 'Garðvörur',           title_en: 'Garden products',         text_is: 'Vandaðar garðvörur sem standast íslenskar aðstæður.',                      text_en: 'Quality garden products built to withstand Icelandic conditions.' },
  ],
  teamHeading_is: 'Teymið okkar',
  teamHeading_en: 'Our Team',
  teamSubtitle_is: 'Reynslumiklir sérfræðingar með brennandi áhuga á garðyrkju',
  teamSubtitle_en: 'Experienced specialists with a passionate interest in horticulture',
  teamMembers: [
    {
      _key: 'tm1',
      name: 'Guðmundur',
      jobTitle_is: 'Sérfræðingur í garðyrkju',
      jobTitle_en: 'Horticulture Specialist',
      quote_is: 'Ég trúi því að góð garðyrkja byrji á réttum lausnum.',
      quote_en: 'I believe good horticulture starts with the right solutions.',
      description_is: 'Með áratuga reynslu og brennandi áhuga hjálpar hann viðskiptavinum að ná árangri.',
      description_en: 'With decades of experience and burning enthusiasm, he helps customers achieve success.',
      ...(person1Img && { image: person1Img }),
    },
    {
      _key: 'tm2',
      name: 'Ólafur',
      jobTitle_is: 'Þjónststjóri',
      jobTitle_en: 'Service Manager',
      quote_is: 'Með reynslu og þekkingu hjálpum við viðskiptavinum að velja rétt.',
      quote_en: 'With experience and knowledge we help customers make the right choice.',
      description_is: 'Áhersla á persónulega þjónustu og að finna réttu lausnina fyrir hvern og einn.',
      description_en: 'Focus on personal service and finding the right solution for each individual.',
      ...(person2Img && { image: person2Img }),
    },
  ],
  ctaHeading_is: 'Tilbúin(n) að bæta garðinn?',
  ctaHeading_en: 'Ready to improve your garden?',
  ctaText_is: 'Hafðu samband og fáðu persónulega ráðgjöf eða ókeypis tilboð.',
  ctaText_en: 'Get in touch and receive personalised advice or a free quote.',
});
console.log('   ✓ Um okkur');

// ── 4. HAFA SAMBAND ──────────────────────────────────────────
console.log('\n4️⃣  Hafa samband...');
await deleteIfExists('contactPage');
await client.createOrReplace({
  _id: 'contactPage',
  _type: 'contactPage',
  ...(contactImg && { heroImage: contactImg }),
  heroTitle_is: 'Við eigum lausnina fyrir þig',
  heroTitle_en: 'We Have the Solution for You',
  heroSubtitle_is: 'Hringdu eða sendu okkur línu!',
  heroSubtitle_en: 'Call or send us a message!',
  address: 'Lambhagavegur 9\n110 Reykjavík',
  phone: '487-8910',
  email: 'oli@eco-garden.is',
  openingHours_is: 'Mán–Fös: 8:00–17:00',
  openingHours_en: 'Mon–Fri: 8:00–17:00',
  facebookUrl: 'https://www.facebook.com/Eco-Garden-104951408186641',
  linkedinUrl: 'https://www.linkedin.com/company/eco-garden-island',
  instagramUrl: '',
  mapEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1742.8324567890123!2d-21.9!3d64.14!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjTCsDA4JzI0LjAiTiAyMcKwNTQnMDAuMCJX!5e0!3m2!1sen!2sis!4v1234567890123!5m2!1sen!2sis',
});
console.log('   ✓ Hafa samband');

// ── 5. FLOKKAR ───────────────────────────────────────────────
console.log('\n5️⃣  Flokkar...');
const categories = [
  {
    _id: 'category-gardyrkjubaendur',
    _type: 'category',
    title_is: 'Garðyrkjubændur',
    title_en: 'Horticulture Farmers',
    slug: { _type: 'slug', current: 'gardyrkjubaendur' },
    ...(cat1Img && { image: cat1Img }),
    order: 1,
    subcategories: [
      { _key: 'sub1', title_is: 'Gróðurhús', title_en: 'Greenhouses', slug: 'grodarhus' },
      { _key: 'sub2', title_is: 'Varmastýring', title_en: 'Heating Systems', slug: 'varmastýring' },
      { _key: 'sub3', title_is: 'Vökvunarkerfi', title_en: 'Irrigation', slug: 'vokvunarkerfi' },
    ],
  },
  {
    _id: 'category-landbunadur',
    _type: 'category',
    title_is: 'Landbúnaður',
    title_en: 'Agriculture',
    slug: { _type: 'slug', current: 'landbunadur' },
    ...(cat2Img && { image: cat2Img }),
    order: 2,
    subcategories: [
      { _key: 'sub1', title_is: 'Landbúnaðarvörur', title_en: 'Agricultural Products', slug: 'landbunadurvorur' },
      { _key: 'sub2', title_is: 'Ræktunarlausnir', title_en: 'Cultivation Solutions', slug: 'raektunarlausnir' },
    ],
  },
  {
    _id: 'category-almennar-gardyrkjuvorur',
    _type: 'category',
    title_is: 'Almennar Garðyrkjuvörur',
    title_en: 'General Garden Products',
    slug: { _type: 'slug', current: 'almennar-gardyrkjuvorur' },
    ...(cat3Img && { image: cat3Img }),
    order: 3,
    subcategories: [
      { _key: 'sub1', title_is: 'Garðverkfæri', title_en: 'Garden Tools', slug: 'gardverkfaeri' },
      { _key: 'sub2', title_is: 'LED ljósabúnaður', title_en: 'LED Lighting', slug: 'led-ljosabunadur' },
      { _key: 'sub3', title_is: 'Jarðvegur & áburður', title_en: 'Soil & Fertiliser', slug: 'jardvegur-aburdur' },
    ],
  },
];

for (const cat of categories) {
  await deleteIfExists(cat._id);
  await client.createOrReplace(cat);
  console.log(`   ✓ ${cat.title_is}`);
}

// ── 6. STILLINGAR (siteSettings) ─────────────────────────────
console.log('\n6️⃣  Stillingar...');
await deleteIfExists('siteSettings');
await client.createOrReplace({
  _id: 'siteSettings',
  _type: 'siteSettings',
  // Um okkur hero
  aboutHeroTitle_is: 'Garðlausnir sem endast',
  aboutHeroTitle_en: 'Garden Solutions That Last',
  aboutHeroSubtitle_is: 'Við hönnum lausnir fyrir íslenskar aðstæður. 50+ ára reynsla í garðyrkju og fagleg ráðgjöf frá upphafi.',
  aboutHeroSubtitle_en: 'We design solutions for Icelandic conditions. 50+ years of horticultural experience and professional guidance.',
  // Hafa samband hero
  contactHeroTitle_is: 'Við eigum lausnina fyrir þig',
  contactHeroTitle_en: 'We Have the Solution for You',
  contactHeroSubtitle_is: 'Hringdu eða sendu okkur línu!',
  contactHeroSubtitle_en: 'Call or send us a message!',
  // Samskiptaupplýsingar
  phone: '487-8910',
  email: 'info@ecogarden.is',
  address: 'Lambhagavegur 9, 110 Reykjavík',
  openingHours_is: 'Mán–Fös: 8:00–17:00',
  openingHours_en: 'Mon–Fri: 8:00–17:00',
});
console.log('   ✓ Stillingar');

console.log('\n✅ Lokið! Farðu á Studio og skoðaðu efnið:\n   https://ecogarden-cms.vercel.app/studio\n');
