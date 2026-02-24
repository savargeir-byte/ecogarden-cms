'use client';

import Image from 'next/image';
import EditBadge from '@/components/EditBadge';

// ============================================================
// UM OKKUR SÍÐA (About page)
// ============================================================
// YFIRLIT — Hvar er hægt að breyta hvað:
//   Hero mynd/texti  → hér að neðan (src= og <h1>/<p> í glass card)
//   Traust-ræma      → 4 ✔ textar undir hero
//   Af hverju kortið → 3 kort með emoji, fyrirsögn, lýsing
//   Okkar lausnir    → 3 kort með emoji, fyrirsögn, lýsing
//   Teymið okkar     → Guðmundur / Ólafur — myndir, nöfn, titlar, tilvitnanir
//   CTA neðst        → Fyrirsögn, undirtexti, sambandsupplýsingar
// ============================================================

export default function AboutPage() {
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
            src="https://static.wixstatic.com/media/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg/v1/fill/w_1960,h_1040,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg"
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
              Garðlausnir sem endast
            </h1>
            
            {/* [19] UM OKKUR — Hero undirtexti */}
            <EditBadge n={19} />
            <p className="border-l-4 border-green-600 pl-4 text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              Við hönnum lausnir fyrir íslenskar aðstæður. 50+ ára reynsla í garðyrkju og fagleg ráðgjöf frá upphafi.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* [20] UM OKKUR — Hnappur 1 texti */}
              <EditBadge n={20} />
              <a 
                href="/contact" 
                className="inline-block text-center bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-102"
              >
                Fá ókeypis ráðgjöf
              </a>
              {/* [21] UM OKKUR — Hnappur 2 texti */}
              <EditBadge n={21} />
              <a 
                href="/products" 
                className="inline-block text-center bg-white hover:bg-gray-50 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 border-2 border-gray-200 hover:border-green-600 hover:scale-102"
              >
                Skoða vörur
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
              <span className="text-sm sm:text-base text-gray-700">{/* [22] */}50+ ára reynsla</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-green-600 font-bold text-lg">✔</span>
              <span className="text-sm sm:text-base text-gray-700">{/* [23] */}Vistvæn efni</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-green-600 font-bold text-lg">✔</span>
              <span className="text-sm sm:text-base text-gray-700">{/* [24] */}Lausnir fyrir heimili & fyrirtæki</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-green-600 font-bold text-lg">✔</span>
              <span className="text-sm sm:text-base text-gray-700">{/* [25] */}Þjónusta um allt land</span>
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
              Af hverju Eco Garden?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {/* [27] UM OKKUR — Af hverju kort 1: emoji 🌿, titill, texti */}
            <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up">
              <EditBadge n={27} />
              <div className="text-5xl sm:text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">🌿</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Vistvæn nálgun</h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                Allar lausnir eru þróaðar með umhverfið í huga.
              </p>
            </div>

            {/* [28] UM OKKUR — Af hverju kort 2: emoji 🏆, titill, texti */}
            <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <EditBadge n={28} />
              <div className="text-5xl sm:text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">🏆</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Reynsla sem skiptir máli</h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                Yfir 50 ára samsett reynsla í garðyrkju og rekstri.
              </p>
            </div>

            {/* [29] UM OKKUR — Af hverju kort 3: emoji 💼, titill, texti */}
            <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <EditBadge n={29} />
              <div className="text-5xl sm:text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">💼</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Lausnir sem endast</h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                Við veljum efni og vörur sem standast íslenskar aðstæður.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions - Updated Copy with Preview Hover */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* [30] UM OKKUR — "Okkar lausnir" fyrirsögn */}
          <EditBadge n={30} />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-10 lg:mb-14 animate-fade-in">
            Okkar lausnir
          </h2>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {/* [31] UM OKKUR — Lausn kort 1: emoji 🎨, titill, texti */}
            <div className="group relative bg-gradient-to-br from-green-50 to-teal-50 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-slide-up">
              <EditBadge n={31} />
              <div className="relative z-10">
                <div className="text-5xl sm:text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">🎨</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Hönnun sem virkar</h3>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-4">
                  Sérsniðin garðhönnun fyrir íslenskar aðstæður.
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-green-600 font-semibold text-sm sm:text-base flex items-center gap-2">
                    Sjá nánar →
                  </span>
                </div>
              </div>
            </div>

            {/* [32] UM OKKUR — Lausn kort 2: emoji 🌱, titill, texti */}
            <div className="group relative bg-gradient-to-br from-green-50 to-teal-50 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-slide-up" style={{ animationDelay: '100ms' }}>
              <EditBadge n={32} />
              <div className="relative z-10">
                <div className="text-5xl sm:text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">🌱</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Ræktunarlausnir</h3>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-4">
                  Snjallar lausnir fyrir ræktun í garði, gróðurhúsi eða atvinnuskyni.
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-green-600 font-semibold text-sm sm:text-base flex items-center gap-2">
                    Sjá nánar →
                  </span>
                </div>
              </div>
            </div>

            {/* [33] UM OKKUR — Lausn kort 3: emoji 🛠️, titill, texti */}
            <div className="group relative bg-gradient-to-br from-green-50 to-teal-50 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-slide-up" style={{ animationDelay: '200ms' }}>
              <EditBadge n={33} />
              <div className="relative z-10">
                <div className="text-5xl sm:text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">🛠️</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Garðvörur</h3>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-4">
                  Vandaðar garðvörur sem standast íslenskar aðstæður.
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-green-600 font-semibold text-sm sm:text-base flex items-center gap-2">
                    Sjá nánar →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Personalized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-50/30 to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* [34] UM OKKUR — Teymi fyrirsögn */}
          <EditBadge n="34–35" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-3 sm:mb-4 animate-fade-in">
            Teymið okkar
          </h2>
          {/* [35] UM OKKUR — Teymi undirtexti */}
          <p className="text-center text-gray-600 mb-10 lg:mb-14 max-w-2xl mx-auto text-base sm:text-lg">
            Reynslumiklir sérfræðingar með brennandi áhuga á garðyrkju
          </p>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* ══ MAÐUR 1 ══════════════════════════════════════ */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border-2 border-green-100 hover:border-green-300 animate-slide-up">
              <EditBadge n="36–40" />
              <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-200">
                {/* [36] UM OKKUR — Maður 1: mynd (src=) */}
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                  alt="Guðmundur"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-8">
                {/* [37] UM OKKUR — Maður 1: nafn */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Guðmundur</h3>
                {/* [38] UM OKKUR — Maður 1: titill */}
                <p className="text-green-600 font-semibold mb-4 text-base sm:text-lg">Sérfræðingur í garðyrkju</p>
                
                <div className="mb-6 p-4 bg-green-50 rounded-xl border-l-4 border-green-600">
                  {/* [39] UM OKKUR — Maður 1: tilvitnun */}
                  <p className="text-gray-700 italic text-sm sm:text-base">
                    "Ég trúi því að góð garðyrkja byrji á réttum lausnum."
                  </p>
                </div>
                
                {/* [40] UM OKKUR — Maður 1: lýsing */}
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Með áratuga reynslu og brennandi áhuga hjálpar hann viðskiptavinum að ná árangri.
                </p>
              </div>
            </div>

            {/* ══ MAÐUR 2 ══════════════════════════════════════ */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border-2 border-green-100 hover:border-green-300 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <EditBadge n="41–45" />
              <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-200">
                {/* [41] UM OKKUR — Maður 2: mynd (src=) */}
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80"
                  alt="Ólafur"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 sm:p-8">
                {/* [42] UM OKKUR — Maður 2: nafn */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Ólafur</h3>
                {/* [43] UM OKKUR — Maður 2: titill */}
                <p className="text-green-600 font-semibold mb-4 text-base sm:text-lg">Þjónustustjóri</p>
                
                <div className="mb-6 p-4 bg-green-50 rounded-xl border-l-4 border-green-600">
                  {/* [44] UM OKKUR — Maður 2: tilvitnun */}
                  <p className="text-gray-700 italic text-sm sm:text-base">
                    "Með reynslu og þekkingu hjálpum við viðskiptavinum að velja rétt."
                  </p>
                </div>
                
                {/* [45] UM OKKUR — Maður 2: lýsing */}
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Áhersla á persónulega þjónustu og að finna réttu lausnina fyrir hvern og einn.
                </p>
              </div>
            </div>
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
            {/* [64] UM OKKUR — CTA fyrirsögn neðst */}
            <EditBadge n={64} />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Tilbúin(n) að bæta garðinn?
            </h2>
            {/* [65] UM OKKUR — CTA undirtexti neðst */}
            <EditBadge n={65} />
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
              Hafðu samband og fáðu persónulega ráðgjöf eða ókeypis tilboð.
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
            {/* ── SAMBANDSUPPLÝSINGAR NEÐST ────────────────────────
                Breyttu heimilisfangi og síma/netfangi hér */}
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 text-white">
              <div>
                <p className="text-xs sm:text-sm font-semibold">Lambhagavegur 9, 110 Reykjavík</p>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold">Sími: 487-8910 | oli@eco-garden.is</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
