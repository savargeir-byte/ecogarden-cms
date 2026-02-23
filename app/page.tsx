import ProductsSection from '@/components/sections/ProductsSection';
import StatsSection from '@/components/sections/StatsSection';
import MissionSection from '@/components/sections/MissionSection';
import Hero from '@/components/sections/Hero';
import { getFeaturedProducts } from '@/lib/products';

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
    // ── HERO TITILL ─────────────────────────────────────────
    title: 'Garðlausnir sem endast',          // Titillinn á íslensku
    title_en: 'Garden Solutions That Last',   // Titillinn á ensku

    // ── HERO TEXTI UNDIR TITLI ───────────────────────────────
    subtitle: 'Við hönnum og segjum lausnir fyrir íslenskar aðstæður – með 50+ ára reynslu.',
    subtitle_en: 'We design and supply solutions for Icelandic conditions – with 50+ years of experience.',

    // ── HERO BAKGRUNNSMYND ───────────────────────────────────
    // Skiptu út URL-inu hér til að breyta myndinni á forsíðunni.
    // Nota má Unsplash, eigin mynd á /public/... eða Wix CDN.
    image: 'https://static.wixstatic.com/media/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg/v1/fill/w_1960,h_1040,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg',
    imageAlt: 'Eco Garden – Sjálfbær garðyrkja',
    imageAlt_en: 'Eco Garden – Sustainable Horticulture',

    // ── HNAPPUR (Call to Action) ─────────────────────────────
    ctaText: 'Sjá vörur',       // Texti á hnappinum á íslensku
    ctaText_en: 'View Products', // Texti á hnappinum á ensku
    ctaLink: '/products',        // Hvert hnappur vísar
  };

  return (
    <div className="min-h-screen">
      <Hero data={heroData} />
      <ProductsSection products={products} />
      <MissionSection />
      <StatsSection />
    </div>
  );
}
