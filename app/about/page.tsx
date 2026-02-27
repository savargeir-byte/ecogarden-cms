import Image from 'next/image';
import EditBadge from '@/components/EditBadge';
import { client } from '@/sanity/lib/client';
import { aboutPageQuery, contactPageQuery } from '@/sanity/lib/queries';

const DEFAULTS = {
  heroTitle: 'Garðlausnir sem endast',
  heroSubtitle: 'Við hönnum lausnir fyrir íslenskar aðstæður. 50+ ára reynsla í garðyrkju og fagleg ráðgjöf frá upphafi.',
  heroImage: 'https://static.wixstatic.com/media/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg/v1/fill/w_1960,h_1040,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg',
  heroBtn1: 'Fá ókeypis ráðgjöf',
  heroBtn2: 'Skoða vörur',
  trustBadges: ['50+ ára reynsla', 'Vistvæn efni', 'Lausnir fyrir heimili & fyrirtæki', 'Þjónusta um allt land'],
  whyHeading: 'Af hverju Eco Garden?',
  whyCards: [
    { emoji: '🌿', title: 'Vistvæn nálgun',       text: 'Allar lausnir eru þróaðar með umhverfið í huga.' },
    { emoji: '🏆', title: 'Reynsla sem skiptir máli', text: 'Yfir 50 ára samsett reynsla í garðyrkju og rekstri.' },
    { emoji: '💼', title: 'Lausnir sem endast',    text: 'Við veljum efni og vörur sem standast íslenskar aðstæður.' },
  ],
  solutionsHeading: 'Okkar lausnir',
  solutionCards: [
    { emoji: '🎨', title: 'Hönnun sem virkar',   text: 'Sérsniðin garðhönnun fyrir íslenskar aðstæður.' },
    { emoji: '🌱', title: 'Ræktunarlausnir',     text: 'Snjallar lausnir fyrir ræktun í garði, gróðurhúsi eða atvinnuskyni.' },
    { emoji: '🛠️', title: 'Garðvörur',           text: 'Vandaðar garðvörur sem standast íslenskar aðstæður.' },
  ],
  teamHeading: 'Teymið okkar',
  teamSubtitle: 'Reynslumiklir sérfræðingar með brennandi áhuga á garðyrkju',
  teamMembers: [
    {
      name: 'Guðmundur Karl Eiríksson',
      jobTitle: 'Sölustjóri',
      phone: '848-1468',
      quote: '',
      description: 'Reynsla, þekking og kunnátta Guðmundar sem hann hefur hlotið af garðyrkjustörfum skiptir sköpum hjá Eco Garden. Hann hefur starfað við garðyrkju í yfir 13 ár og þekkir því vel til verka.\n\nGuðmundur hefur einnig starfað hjá Sölufélagi garðyrkjumanna og var Sölumaður hjá Sláturfélagi suðurlands.\n\nGuðmundur er fæddur og uppalinn á Flúðum, Hrunamannahreppi og kemur af landbúnaðarætt.',
      image: 'https://cdn.sanity.io/images/atu6hs4h/production/beb6bf2f2228fe288bd6f122d35e1f240efc7932-705x745.png',
    },
    {
      name: 'Ólafur E Ólafsson',
      jobTitle: 'Markaðsstjóri',
      phone: '659-8108',
      quote: '',
      description: 'Ólafur hefur áratuga reynslu í rekstri og sölu á garðyrkjuvörum. Hann starfaði í mörg ár sem sölustjóri og síðar framkvæmdastjóri hjá Frjó Umbúðasölunni og síðar sem framkvæmdastjóri hjá Kassagerð Reykjavíkur.\n\nÓlafur er uppalinn undir Eyjafjöllum í Rángárvallasýslu og starfaði þar við hefðbundin landbúnaðarstörf og ræktun á grænmeti.',
      image: 'https://cdn.sanity.io/images/atu6hs4h/production/c14d4e83770278ec1e7f0c222f6d13dbb3c8c3c0-732x801.png',
    },
  ],
  ctaHeading: 'Tilbúin(n) að bæta garðinn?',
  ctaText: 'Hafðu samband og fáðu persónulega ráðgjöf eða ókeypis tilboð.',
};

export default async function AboutPage() {
  const [s, contactData] = await Promise.all([
    client.fetch(aboutPageQuery).catch(() => null),
    client.fetch(contactPageQuery).catch(() => null),
  ]);

  const contactAddress = contactData?.address ?? 'Lambhagavegúr 9, 110 Reykjavík';
  const contactPhone   = contactData?.phone   ?? '487-8910';
  const contactEmail   = contactData?.email   ?? 'info@ecogarden.is';

  const heroTitle    = s?.heroTitle_is    ?? DEFAULTS.heroTitle;
  const heroSubtitle = s?.heroSubtitle_is ?? DEFAULTS.heroSubtitle;
  const heroImage    = s?.heroImage       ?? DEFAULTS.heroImage;
  const heroBtn1     = s?.heroBtn1_is     ?? DEFAULTS.heroBtn1;
  const heroBtn2     = s?.heroBtn2_is     ?? DEFAULTS.heroBtn2;
  const trustBadges  = (s?.trustBadges?.map((b: {text_is:string}) => b.text_is).filter(Boolean) ?? []).length > 0
    ? s.trustBadges.map((b: {text_is:string}) => b.text_is)
    : DEFAULTS.trustBadges;
  const whyHeading     = s?.whyHeading_is     ?? DEFAULTS.whyHeading;
  const whyCards       = (s?.whyCards?.length > 0 ? s.whyCards.map((c: {emoji:string;title_is:string;text_is:string}) => ({ emoji: c.emoji, title: c.title_is, text: c.text_is })) : null) ?? DEFAULTS.whyCards;
  const solutionsHeading = s?.solutionsHeading_is ?? DEFAULTS.solutionsHeading;
  const solutionCards  = (s?.solutionCards?.length > 0 ? s.solutionCards.map((c: {emoji:string;title_is:string;text_is:string}) => ({ emoji: c.emoji, title: c.title_is, text: c.text_is })) : null) ?? DEFAULTS.solutionCards;
  const teamHeading    = s?.teamHeading_is    ?? DEFAULTS.teamHeading;
  const teamSubtitle   = s?.teamSubtitle_is   ?? DEFAULTS.teamSubtitle;
  const teamMembers    = (s?.teamMembers?.length > 0 ? s.teamMembers.map((m: {name:string;jobTitle_is:string;phone?:string;quote_is:string;description_is:string;image?:string}, i: number) => ({
    name: m.name, jobTitle: m.jobTitle_is, phone: m.phone ?? '', quote: m.quote_is ?? '', description: m.description_is, image: m.image ?? DEFAULTS.teamMembers[i]?.image ?? DEFAULTS.teamMembers[0].image,
  })) : null) ?? DEFAULTS.teamMembers;
  const ctaHeading = s?.ctaHeading_is ?? DEFAULTS.ctaHeading;
  const ctaText    = s?.ctaText_is    ?? DEFAULTS.ctaText;
  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO BAKGRUNNSMYND ──────────────────────────────────
          Til að breyta hero mynd: skiptu út src= URL hér að neðan.
          Nota má /public/mynd.jpg eða ytri URL. */}
      {/* ──────────────────────────── */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: 'min(60vh, 520px)' }}>
        {/* [17] UM OKKUR — Hero bakgrunnsmynd (skiptu út src= URL) */}
        <div className="absolute inset-0">
          <EditBadge n={17} />
          <Image
            src={heroImage}
            alt="Eco Garden - Sjálfbær garðyrkja"
            fill
            unoptimized
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-12 sm:py-16">
          {/* Glass Card */}
          <div className="max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl animate-fade-in">
            {/* [18] UM OKKUR — Hero titill */}
            <EditBadge n={18} />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-5 leading-tight text-gray-900">
              {heroTitle}
            </h1>
            
            {/* [19] UM OKKUR — Hero undirtexti */}
            <EditBadge n={19} />
            <p className="border-l-4 border-green-600 pl-4 text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              {heroSubtitle}
            </p>

            {/* [20] UM OKKUR — Hnappur 1 texti / [21] Hnappur 2 texti */}
            <EditBadge n="20–21" />
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a 
                href="/contact" 
                className="inline-block text-center bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-102"
              >
                {heroBtn1}
              </a>
              <a 
                href="/products" 
                className="inline-block text-center bg-white hover:bg-gray-50 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 border-2 border-gray-200 hover:border-green-600 hover:scale-102"
              >
                {heroBtn2}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRAUST-RÆMA [22–25] ─────────────────────────────── */}
      <section className="bg-white border-b border-gray-200">
        <EditBadge n="22–25" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-green-600 font-bold text-lg">✔</span>
              <span className="text-sm sm:text-base text-gray-700">{trustBadges[0]}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-green-600 font-bold text-lg">✔</span>
              <span className="text-sm sm:text-base text-gray-700">{trustBadges[1]}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-green-600 font-bold text-lg">✔</span>
              <span className="text-sm sm:text-base text-gray-700">{trustBadges[2]}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-green-600 font-bold text-lg">✔</span>
              <span className="text-sm sm:text-base text-gray-700">{trustBadges[3]}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Eco Garden - 3 Benefits with Hover Effects */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-green-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 lg:mb-14 animate-fade-in">
            {/* [26] UM OKKUR — "Af hverju" fyrirsögn */}
            <EditBadge n={26} />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              {whyHeading}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {whyCards.map((card: {emoji:string;title:string;text:string}, i: number) => (
              <div key={i} className="group bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="text-5xl sm:text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">{card.emoji}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions - Updated Copy with Preview Hover */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* [30] UM OKKUR — "Okkar lausnir" fyrirsögn */}
          <EditBadge n={30} />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-10 lg:mb-14 animate-fade-in">
            {solutionsHeading}
          </h2>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {solutionCards.map((card: {emoji:string;title:string;text:string}, i: number) => (
              <div key={i} className="group relative bg-gradient-to-br from-green-50 to-teal-50 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="relative z-10">
                  <div className="text-5xl sm:text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">{card.emoji}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-4">{card.text}</p>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-green-600 font-semibold text-sm sm:text-base flex items-center gap-2">Sjá nánar →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HVERT STEFNUM VIÐ ───────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Vinstri hlið — fyrirsögn */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-4">
                Hvert stefnum við?
              </h2>
              <p className="text-xl text-gray-500 font-light">
                Framtíðin er björt - og græn
              </p>
            </div>

            {/* Hægri hlið — texti */}
            <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed">
              <p>
                Framtíðin liggur í vistvænum lausnum. Hún verður að vera það.
                Mikil hugarfarsbreyting hefur orðið undanfarin ár, bæði hjá almenningi
                og fyrirtækjum, þar sem sjálfbærni og umhyggja fyrir náttúrunni er
                lykilatriði. Þetta hefur flýtt fyrir alls kyns þróun á vistvænum
                lausnum, hvort sem er í umbúðum, áburði eða hreinsiefnum.
              </p>
              <p>
                Við hjá Eco Garden skynjum vel þessar breytingar og viljum vera fyrsti
                valkostur þeirra sem kjósa vandaðar vörur sem sameina gæði og virðingu
                fyrir umhverfinu. Það gerum við með því að vera sífellt vakandi fyrir
                þörfum markaðarins hér heima og sömuleiðis vöruþróun hjá okkar bestu
                birgjum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-50/30 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-3 sm:mb-4">
            {teamHeading}
          </h2>
          <p className="text-center text-gray-600 mb-10 lg:mb-14 max-w-2xl mx-auto text-base sm:text-lg">
            {teamSubtitle}
          </p>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {teamMembers.map((m: {name:string;jobTitle:string;phone?:string;quote:string;description:string;image:string}, i: number) => (
              <div key={i} className="group bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border border-green-100 hover:border-green-300">
                <div className="relative h-52 overflow-hidden bg-gray-200">
                  <Image
                    src={m.image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80'}
                    alt={m.name}
                    fill
                    unoptimized
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-0.5">{m.name}</h3>
                  <p className="text-green-600 font-semibold text-sm mb-1">{m.jobTitle}</p>
                  {m.phone && (
                    <a href={`tel:${m.phone.replace(/-/g, '')}`} className="inline-flex items-center gap-1 text-gray-500 text-xs mb-3 hover:text-green-600 transition-colors">
                      <span>📞</span> Sími {m.phone}
                    </a>
                  )}
                  {!m.phone && <div className="mb-3" />}
                  {m.quote && (
                    <div className="mb-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-600">
                      <p className="text-gray-700 italic text-xs">&quot;{m.quote}&quot;</p>
                    </div>
                  )}
                  <p className="text-gray-600 leading-relaxed text-xs whitespace-pre-line">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Kraftmikill with Scale Hover */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              {ctaHeading}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
              {ctaText}
            </p>
          </div>

          {/* [66] UM OKKUR — CTA 3 kort (Skoða vörur / Hafa samband / Fá ráðgjöf) */}
          <EditBadge n={66} />
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <a
              href="/products"
              className="group bg-white hover:bg-green-600 p-5 sm:p-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              <div className="text-3xl sm:text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">🌿</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">
                Skoða vörur
              </h3>
              <p className="text-gray-600 group-hover:text-white/90 text-xs sm:text-sm transition-colors">
                Skoðaðu úrvalið okkar af gæðavörum
              </p>
            </a>

            <a
              href="/contact"
              className="group bg-white hover:bg-green-600 p-5 sm:p-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              <div className="text-3xl sm:text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">📞</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">
                Hafa samband
              </h3>
              <p className="text-gray-600 group-hover:text-white/90 text-xs sm:text-sm transition-colors">
                Sendu okkur fyrirspurn eða hringdu
              </p>
            </a>

            <a
              href="/contact"
              className="group bg-white hover:bg-green-600 p-5 sm:p-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
            >
              <div className="text-3xl sm:text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">💡</div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">
                Fá ráðgjöf
              </h3>
              <p className="text-gray-600 group-hover:text-white/90 text-xs sm:text-sm transition-colors">
                Ókeypis ráðgjöf frá sérfræðingum
              </p>
            </a>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center">
            {/* [99] UM OKKUR — Sambandsupplýsingar neðst (heimilisfang + sími/netfang) */}
            <EditBadge n={99} />
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 text-white">
              <div>
                <p className="text-xs sm:text-sm font-semibold">{contactAddress}</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold">Sími: {contactPhone} | {contactEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
