'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] sm:h-[450px] lg:h-[500px] bg-gradient-to-br from-green-600 via-green-700 to-teal-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute top-10 right-10 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl">
            Hverjir erum við?
          </h1>
          <p className="text-xl sm:text-2xl text-white/95 max-w-3xl drop-shadow-lg">
            Til móts við nýja tíma, en reynslunni ríkari
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Sagan - stutta útgáfan
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>
                  Nærri 30 ára samanlögð reynsla í þjónustu og sölu á umbúðalausnum, 
                  rekstrarvörum fyrir bændur og garðvörum fyrir heimili.
                </p>
                <p>
                  Eco Garden byggir á þekkingu starfsmanna sem hafa unnið við garðyrkju 
                  og sölu á rekstrarvörum í áratugi. Samanlögð reynsla þeirra sem koma 
                  að fyrirtækinu er um 30 ár og hafa því gríðarmikla þekkingu og skilning 
                  á þörfum fjölbreyttra viðskiptavina.
                </p>
                <p>
                  Viðskiptavinir okkar kjósa í sífellt meira mæli umhverfisvænar lausnir 
                  og við erum stolت af því að geta boðið upp á vandaðar og sjálfbærar vörur.
                </p>
              </div>
            </div>
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://static.wixstatic.com/media/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg/v1/fill/w_1960,h_1040,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg"
                alt="Náttúra og sjálfbærni"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://static.wixstatic.com/media/0b0c6b_6fa1911629cb40a2b6221f7b65bc4431~mv2.png/v1/fill/w_472,h_501,al_c,lg_1,q_85,enc_avif,quality_auto/Capture_edited.png"
                alt="Framtíðarsýn"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Hvert stefnum við?
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p className="text-2xl font-semibold text-green-700 mb-4">
                  Framtíðin er björt - og græn
                </p>
                <p>
                  Framtíðin liggur í vistvænum lausnum. Mikil hugarfarsbreyting hefur 
                  orðið undanfarin ár, bæði hjá almenningi og fyrirtækjum, þar sem 
                  sjálfbærni og umhyggja fyrir náttúrunni er lykilatriði.
                </p>
                <p>
                  Við hjá Eco Garden skynjum vel þessar breytingar og viljum vera fyrsti 
                  valkostur þeirra sem kjósa vandaðar vörur sem sameina gæði og virðingu 
                  fyrir umhverfinu.
                </p>
                <p>
                  Við gerum það með því að vera sífellt vakandi fyrir þörfum markaðarins 
                  hér heima og sömuleiðis vöruþróun hjá okkar bestu birgjum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Teymið okkar
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Guðmundur */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="relative h-80">
                <Image
                  src="https://static.wixstatic.com/media/0b0c6b_af4b3be20d564fa689eb46d7c20c1219~mv2.png/v1/fill/w_492,h_536,al_c,lg_1,q_85,enc_avif,quality_auto/20200923_135803_edited.png"
                  alt="Guðmundur Karl Eiríksson"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Guðmundur Karl Eiríksson
                </h3>
                <p className="text-lg text-green-700 font-semibold mb-4">Sölustjóri</p>
                <p className="text-gray-600 mb-4">
                  Sími: <a href="tel:8481468" className="text-green-700 hover:underline">848-1468</a>
                </p>
                <div className="space-y-3 text-gray-700">
                  <p className="font-semibold text-gray-900">Reynsla og þekking</p>
                  <p>
                    Guðmundur hefur starfað við garðyrkju í yfir 13 ár og þekkir því vel til verka. 
                    Hann hefur einnig starfað hjá Sölufélagi garðyrkjumanna og var sölumaður hjá 
                    Sláturfélagi suðurlands.
                  </p>
                  <p>
                    Guðmundur er fæddur og uppalinn á Flúðum í Hrunamannahreppi og kemur af landbúnaðarætt.
                  </p>
                </div>
              </div>
            </div>

            {/* Ólafur */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="relative h-80">
                <Image
                  src="https://static.wixstatic.com/media/1a76e4_86be2579acb7461baaef8e596d32b3b9~mv2.png/v1/fill/w_526,h_544,al_c,lg_1,q_85,enc_avif,quality_auto/Untitled%2520design%2520(3)_edited.png"
                  alt="Ólafur E Ólafsson"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Ólafur E Ólafsson
                </h3>
                <p className="text-lg text-green-700 font-semibold mb-4">Markaðsstjóri</p>
                <p className="text-gray-600 mb-4">
                  Sími: <a href="tel:6598108" className="text-green-700 hover:underline">659-8108</a>
                </p>
                <div className="space-y-3 text-gray-700">
                  <p className="font-semibold text-gray-900">Áratuga reynsla</p>
                  <p>
                    Ólafur hefur áratuga reynslu í rekstri og sölu á garðyrkjuvörum. 
                    Hann starfaði í mörg ár sem sölustjóri og síðar framkvæmdastjóri hjá Frjó 
                    Umbúðasölunni og síðar sem framkvæmdastjóri hjá Kassagerð Reykjavíkur.
                  </p>
                  <p>
                    Ólafur er uppalinn undir Eyjafjöllum í Rángárvallasýslu og starfaði þar við 
                    hefðbundin landbúnaðarstörf og ræktun á grænmeti.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-green-600 via-green-700 to-teal-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            Við eigum lausnina fyrir þig
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8">
            Hringdu eða sendu okkur línu!
          </p>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 text-white">
              <div>
                <p className="text-base sm:text-lg font-semibold mb-2">Lambhagavegur 9</p>
                <p className="text-base sm:text-lg">110 Reykjavík</p>
              </div>
              <div>
                <p className="text-base sm:text-lg font-semibold mb-2">Sími: 487-8910</p>
                <p className="text-base sm:text-lg">
                  <a href="mailto:oli@eco-garden.is" className="hover:underline break-all">
                    oli@eco-garden.is
                  </a>
                </p>
              </div>
            </div>
          </div>

          <a 
            href="/products"
            className="inline-block bg-white text-green-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-100 transition-colors shadow-xl"
          >
            Skoða vörur
          </a>
        </div>
      </section>
    </div>
  );
}
