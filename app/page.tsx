import HomeCategoriesSection from '@/components/sections/HomeCategoriesSection';
import StatsSection from '@/components/sections/StatsSection';
import MissionSection from '@/components/sections/MissionSection';
import Hero from '@/components/sections/Hero';
import { client } from '@/sanity/lib/client';
import { homePageQuery, allCategoriesQuery, latestNewsQuery } from '@/sanity/lib/queries';
import Link from 'next/link';

export default async function Home() {
  // Fetch frá Sanity — fallback í hardcoded ef tómt
  const [sanityHome, sanityCategories, latestNews] = await Promise.all([
    client.fetch(homePageQuery).catch(() => null),
    client.fetch(allCategoriesQuery).catch(() => null),
    client.fetch(latestNewsQuery).catch(() => []),
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

      {/* Nýjustu fréttir */}
      {latestNews && latestNews.length > 0 && (
        <section className="bg-gray-50 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-4xl font-bold text-gray-900">Nýjustu fréttir</h2>
                <p className="text-gray-500 mt-2">Fréttir og tilkynningar frá Eco Garden</p>
              </div>
              <Link
                href="/news"
                className="hidden sm:inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold text-sm"
              >
                Sjá allar fréttir
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestNews.map((item: { _id: string; title: string; slug: string; publishedAt: string | null; mainImage: string | null }) => (
                <Link
                  key={item._id}
                  href={`/news/${item.slug}`}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative h-52 bg-gray-100 overflow-hidden">
                    {item.mainImage ? (
                      <img
                        src={item.mainImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl">📰</div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    {item.publishedAt && (
                      <p className="text-sm text-green-600 font-medium mb-2">
                        {new Date(item.publishedAt).toLocaleDateString('is-IS', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    )}
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <div className="mt-auto pt-4 flex items-center gap-1 text-green-600 font-semibold text-sm">
                      Lesa meira
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center sm:hidden">
              <Link href="/news" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold">
                Sjá allar fréttir
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
