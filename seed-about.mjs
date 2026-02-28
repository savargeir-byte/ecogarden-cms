/**
 * Fyllir Um okkur síðu með sjálfgefnum gögnum í Sanity.
 * Keyrir: node seed-about.mjs
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'atu6hs4h',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || '',
  useCdn: false,
});

console.log('🌿 Fyll Um okkur síðu...\n');

await client.createOrReplace({
  _id: 'aboutPage',
  _type: 'aboutPage',

  // ── Hero ──────────────────────────────────────────────────
  heroTitle_is: 'Garðlausnir sem endast',
  heroTitle_en: 'Garden Solutions That Last',
  heroSubtitle_is: 'Við hönnum lausnir fyrir íslenskar aðstæður. 50+ ára reynsla í garðyrkju og fagleg ráðgjöf frá upphafi.',
  heroSubtitle_en: 'We design solutions for Icelandic conditions. 50+ years of horticultural experience and professional guidance.',
  heroBtn1_is: 'Fá ókeypis ráðgjöf',
  heroBtn1_en: 'Get free advice',
  heroBtn2_is: 'Skoða vörur',
  heroBtn2_en: 'Browse products',

  // ── Traust-ræma ───────────────────────────────────────────
  trustBadges: [
    { _key: 'tb1', text_is: '50+ ára reynsla',                       text_en: '50+ years of experience' },
    { _key: 'tb2', text_is: 'Vistvæn efni',                          text_en: 'Eco-friendly materials' },
    { _key: 'tb3', text_is: 'Lausnir fyrir heimili & fyrirtæki',      text_en: 'Solutions for homes & businesses' },
    { _key: 'tb4', text_is: 'Þjónusta um allt land',                  text_en: 'Nationwide service' },
  ],

  // ── Af hverju ─────────────────────────────────────────────
  whyHeading_is: 'Af hverju Eco Garden?',
  whyHeading_en: 'Why Eco Garden?',
  whyCards: [
    {
      _key: 'why1',
      emoji: '🌿',
      title_is: 'Vistvæn nálgun',
      title_en: 'Eco-friendly approach',
      text_is: 'Allar lausnir eru þróaðar með umhverfið í huga.',
      text_en: 'All solutions are developed with the environment in mind.',
    },
    {
      _key: 'why2',
      emoji: '🏆',
      title_is: 'Reynsla sem skiptir máli',
      title_en: 'Experience that matters',
      text_is: 'Yfir 50 ára samsett reynsla í garðyrkju og rekstri.',
      text_en: 'Over 50 years of combined experience in horticulture and business.',
    },
    {
      _key: 'why3',
      emoji: '💼',
      title_is: 'Lausnir sem endast',
      title_en: 'Solutions that last',
      text_is: 'Við veljum efni og vörur sem standast íslenskar aðstæður.',
      text_en: 'We choose materials and products that withstand Icelandic conditions.',
    },
  ],

  // ── Lausnir ───────────────────────────────────────────────
  solutionsHeading_is: 'Okkar lausnir',
  solutionsHeading_en: 'Our solutions',
  solutionCards: [
    {
      _key: 'sol1',
      emoji: '🎨',
      title_is: 'Hönnun sem virkar',
      title_en: 'Design that works',
      text_is: 'Sérsniðin garðhönnun fyrir íslenskar aðstæður.',
      text_en: 'Custom garden design for Icelandic conditions.',
    },
    {
      _key: 'sol2',
      emoji: '🌱',
      title_is: 'Ræktunarlausnir',
      title_en: 'Growing solutions',
      text_is: 'Snjallar lausnir fyrir ræktun í garði, gróðurhúsi eða atvinnuskyni.',
      text_en: 'Smart solutions for gardening, greenhouse or commercial growing.',
    },
    {
      _key: 'sol3',
      emoji: '🛠️',
      title_is: 'Garðvörur',
      title_en: 'Garden products',
      text_is: 'Vandaðar garðvörur sem standast íslenskar aðstæður.',
      text_en: 'Quality garden products that withstand Icelandic conditions.',
    },
  ],

  // ── Teymið ────────────────────────────────────────────────
  teamHeading_is: 'Teymið okkar',
  teamHeading_en: 'Our team',
  teamSubtitle_is: 'Reynslumiklir sérfræðingar með brennandi áhuga á garðyrkju',
  teamSubtitle_en: 'Experienced experts with a passion for horticulture',
  teamMembers: [
    {
      _key: 'tm1',
      name: 'Guðmundur Karl Eiríksson',
      jobTitle_is: 'Sölustjóri',
      jobTitle_en: 'Sales Manager',
      phone: '848-1468',
      quote_is: '',
      quote_en: '',
      description_is: 'Reynsla, þekking og kunnátta Guðmundar sem hann hefur hlotið af garðyrkjustörfum skiptir sköpum hjá Eco Garden. Hann hefur starfað við garðyrkju í yfir 13 ár og þekkir því vel til verka.\n\nGuðmundur hefur einnig starfað hjá Sölufélagi garðyrkjumanna og var Sölumaður hjá Sláturfélagi suðurlands.\n\nGuðmundur er fæddur og uppalinn á Flúðum, Hrunamannahreppi og kemur af landbúnaðarætt.',
      description_en: 'Guðmundur\'s experience and expertise gained through horticultural work is invaluable at Eco Garden. He has worked in horticulture for over 13 years.\n\nGuðmundur has also worked at the Horticultural Growers Association and was a salesman at the South Iceland Slaughterhouse.\n\nGuðmundur was born and raised in Flúðir, Hrunamannahreppur and comes from a farming family.',
    },
    {
      _key: 'tm2',
      name: 'Ólafur E Ólafsson',
      jobTitle_is: 'Markaðsstjóri',
      jobTitle_en: 'Marketing Manager',
      phone: '659-8108',
      quote_is: '',
      quote_en: '',
      description_is: 'Ólafur hefur áratuga reynslu í rekstri og sölu á garðyrkjuvörum. Hann starfaði í mörg ár sem sölustjóri og síðar framkvæmdastjóri hjá Frjó Umbúðasölunni og síðar sem framkvæmdastjóri hjá Kassagerð Reykjavíkur.\n\nÓlafur er uppalinn undir Eyjafjöllum í Rángárvallasýslu og starfaði þar við hefðbundin landbúnaðarstörf og ræktun á grænmeti.',
      description_en: 'Ólafur has decades of experience in operating and selling horticultural products. He worked for many years as sales manager and later CEO at Frjó Umbúðasalan and later as CEO at Kassagerð Reykjavíkur.\n\nÓlafur was raised under the Eyjafjöll mountains in Rangárvallasýsla and worked there in traditional farming and vegetable growing.',
    },
  ],

  // ── CTA ───────────────────────────────────────────────────
  ctaHeading_is: 'Tilbúin(n) að bæta garðinn?',
  ctaHeading_en: 'Ready to improve your garden?',
  ctaText_is: 'Hafðu samband og fáðu persónulega ráðgjöf eða ókeypis tilboð.',
  ctaText_en: 'Get in touch and receive personal advice or a free quote.',
});

console.log('✅ Um okkur síða uppfærð í Sanity!\n');
