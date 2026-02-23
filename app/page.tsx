import ProductsSection from '@/components/sections/ProductsSection';
import StatsSection from '@/components/sections/StatsSection';
import MissionSection from '@/components/sections/MissionSection';
import Hero from '@/components/sections/Hero';
import { getFeaturedProducts } from '@/lib/products';

export default function Home() {
  const products = getFeaturedProducts();

  const heroData = {
    title: 'Garðlausnir sem endast',
    title_en: 'Garden Solutions That Last',
    subtitle: 'Við hönnum og segjum lausnir fyrir íslenskar aðstæður – með 50+ ára reynslu.',
    subtitle_en: 'We design and supply solutions for Icelandic conditions – with 50+ years of experience.',
    image: 'https://static.wixstatic.com/media/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg/v1/fill/w_1960,h_1040,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg',
    imageAlt: 'Eco Garden – Sjálfbær garðyrkja',
    imageAlt_en: 'Eco Garden – Sustainable Horticulture',
    ctaText: 'Sjá vörur',
    ctaText_en: 'View Products',
    ctaLink: '/products',
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
