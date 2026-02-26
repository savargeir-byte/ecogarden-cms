import HomeCategoriesSection from '@/components/sections/HomeCategoriesSection';
import StatsSection from '@/components/sections/StatsSection';
import MissionSection from '@/components/sections/MissionSection';
import Hero from '@/components/sections/Hero';
import { client } from '@/sanity/lib/client';
import { homePageQuery, allCategoriesQuery } from '@/sanity/lib/queries';

export default async function Home() {
  // Fetch frá Sanity — fallback í hardcoded ef tómt
  const [sanityHome, sanityCategories] = await Promise.all([
    client.fetch(homePageQuery).catch(() => null),
    client.fetch(allCategoriesQuery).catch(() => null),
  ]);

  const heroData = {
    title:       sanityHome?.title_is    ?? 'Garðlausnir sem endast',
    title_en:    sanityHome?.title_en    ?? 'Garden Solutions That Last',
    subtitle:    sanityHome?.subtitle_is ?? 'Við hönnum og segjum lausnir fyrir íslenskar aðstæður – með 50+ ára reynslu.',
    subtitle_en: sanityHome?.subtitle_en ?? 'We design and supply solutions for Icelandic conditions – with 50+ years of experience.',
    image:       sanityHome?.heroImage
      ?? 'https://static.wixstatic.com/media/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg/v1/fill/w_1960,h_1040,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg',
    imageAlt:    sanityHome?.imageAlt_is ?? 'Eco Garden – Sjálfbær garðyrkja',
    imageAlt_en: sanityHome?.imageAlt_en ?? 'Eco Garden – Sustainable Horticulture',
    ctaText:     sanityHome?.ctaText_is  ?? 'Sjá vörur',
    ctaText_en:  sanityHome?.ctaText_en  ?? 'View Products',
    ctaLink:     sanityHome?.ctaLink     ?? '/products',
  };

  // Mission
  const h = sanityHome;
  const missionHeading = h?.missionHeading_is ?? undefined;
  const missionText    = h?.missionText_is    ?? undefined;
  const missionDesc    = h?.missionDesc_is    ?? undefined;

  // Stats
  const statsHeading    = h?.statsHeading_is    ?? undefined;
  const statsSubheading = h?.statsSubheading_is ?? undefined;
  const sanityStats = (h?.stat1Value != null) ? [
    { value: h.stat1Value, suffix: h.stat1Suffix ?? '+', label: h.stat1Label_is ?? 'Verkefni',         desc: h.stat1Desc_is ?? 'Fullunnin garðverkefni síðan 2004' },
    { value: h.stat2Value, suffix: h.stat2Suffix ?? '+', label: h.stat2Label_is ?? 'Ára reynsla',      desc: h.stat2Desc_is ?? 'Í garðyrkjubransanum' },
    { value: h.stat3Value, suffix: h.stat3Suffix ?? '%', label: h.stat3Label_is ?? 'Ánægðir viðskiptavinir', desc: h.stat3Desc_is ?? 'Endurtaka viðskipti við okkur' },
  ] as [{ value: number; suffix: string; label: string; desc: string }, { value: number; suffix: string; label: string; desc: string }, { value: number; suffix: string; label: string; desc: string }] : undefined;

  return (
    <div className="min-h-screen">
      <Hero data={heroData} />
      <HomeCategoriesSection categories={sanityCategories ?? undefined} />
      <MissionSection heading={missionHeading} text={missionText} desc={missionDesc} />
      <StatsSection heading={statsHeading} subheading={statsSubheading} stats={sanityStats} />
    </div>
  );
}
