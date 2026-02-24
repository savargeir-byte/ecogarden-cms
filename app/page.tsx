import ProductsSection from '@/components/sections/ProductsSection';
import StatsSection from '@/components/sections/StatsSection';
import MissionSection from '@/components/sections/MissionSection';
import Hero from '@/components/sections/Hero';
import { getFeaturedProducts } from '@/lib/products';
import EditBadge from '@/components/EditBadge';

// ============================================================
// FORSÍÐA (Home page)
// ============================================================
// Hér eru ALLAR breytingar á forsíðunni:
//   - Hero texti og mynd  → heroData hér að neðan
//   - Útvaldar vörur      → lib/products.ts  (getFeaturedProducts)
//   - Mission texti       → lib/i18n.ts  (missionHeading / missionText / missionDesc)
//   - Stats tölur         → components/sections/StatsSection.tsx  (NumberCounter)
// ============================================================

export default function Home() {
  const products = getFeaturedProducts();

  const heroData = {
    title:     'Garðlausnir sem endast',          // [1]  FORSÍÐA — Hero titill (IS)
    title_en:  'Garden Solutions That Last',       // [2]  FORSÍÐA — Hero titill (EN)

    subtitle:    'Við hönnum og segjum lausnir fyrir íslenskar aðstæður – með 50+ ára reynslu.', // [3] FORSÍÐA — Hero undirtexti (IS)
    subtitle_en: 'We design and supply solutions for Icelandic conditions – with 50+ years of experience.', // [4] FORSÍÐA — Hero undirtexti (EN)

    // [5] FORSÍÐA — Hero bakgrunnsmynd (skiptu út URL)
    image: 'https://static.wixstatic.com/media/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg/v1/fill/w_1960,h_1040,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg',
    imageAlt:    'Eco Garden – Sjálfbær garðyrkja',
    imageAlt_en: 'Eco Garden – Sustainable Horticulture',

    ctaText:    'Sjá vörur',       // [6]  FORSÍÐA — CTA hnappur texti (IS)
    ctaText_en: 'View Products',   // [7]  FORSÍÐA — CTA hnappur texti (EN)
    ctaLink:    '/products',       // [8]  FORSÍÐA — CTA hnappur slóð (href)
  };

  return (
    <div className="min-h-screen">
      {/* [1]titill [2]titill-EN [3]undirtexti [4]undirtexti-EN [5]mynd [6]hnappur [7]hnappur-EN [8]hnappur-slóð */}
      <div style={{ position: 'relative' }}>
        <EditBadge n="1–8 (hero)" />
        <Hero data={heroData} />
      </div>
      <ProductsSection products={products} />
      {/* [11]fyrirsögn [12]meginmál [13]lýsing */}
      <div style={{ position: 'relative' }}>
        <EditBadge n="11–13 (mission)" />
        <MissionSection />
      </div>
      {/* [14]tala1 [15]tala2 [16]tala3 */}
      <div style={{ position: 'relative' }}>
        <EditBadge n="14–16 (stats)" />
        <StatsSection />
      </div>
    </div>
  );
}
