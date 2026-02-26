import HomeCategoriesSection from '@/components/sections/HomeCategoriesSection';
import StatsSection from '@/components/sections/StatsSection';
import MissionSection from '@/components/sections/MissionSection';
import Hero from '@/components/sections/Hero';
import EditBadge from '@/components/EditBadge';
import { client } from '@/sanity/lib/client';
import { homePageQuery, allCategoriesQuery } from '@/sanity/lib/queries';

export default async function Home() {
  // Fetch frá Sanity — fallback í hardcoded ef tómt
  const [sanityHome, sanityCategories] = await Promise.all([
    client.fetch(homePageQuery).catch(() => null),
    client.fetch(allCategoriesQuery).catch(() => null),
  ]);

  const heroData = {
    title:     sanityHome?.title_is    ?? 'Garðlausnir sem endast',
    title_en:  sanityHome?.title_en    ?? 'Garden Solutions That Last',
    subtitle:    sanityHome?.subtitle_is ?? 'Við hönnum og segjum lausnir fyrir íslenskar aðstæður – með 50+ ára reynslu.',
    subtitle_en: sanityHome?.subtitle_en ?? 'We design and supply solutions for Icelandic conditions – with 50+ years of experience.',
    image:    sanityHome?.heroImage
      ?? 'https://static.wixstatic.com/media/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg/v1/fill/w_1960,h_1040,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg',
    imageAlt:    sanityHome?.imageAlt_is ?? 'Eco Garden – Sjálfbær garðyrkja',
    imageAlt_en: sanityHome?.imageAlt_en ?? 'Eco Garden – Sustainable Horticulture',
    ctaText:    sanityHome?.ctaText_is ?? 'Sjá vörur',
    ctaText_en: sanityHome?.ctaText_en ?? 'View Products',
    ctaLink:    sanityHome?.ctaLink    ?? '/products',
  };

  return (
    <div className="min-h-screen">
      {/* [1]titill [2]titill-EN [3]undirtexti [4]undirtexti-EN [5]mynd [6]hnappur [7]hnappur-EN [8]hnappur-slóð */}
      <div style={{ position: 'relative' }}>
        <EditBadge n="1–8 (hero)" />
        <Hero data={heroData} />
      </div>
      <HomeCategoriesSection categories={sanityCategories ?? undefined} />
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
