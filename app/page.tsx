import PageRenderer from '@/components/PageRenderer';
import CTA from "@/components/sections/CTA";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import { getPage } from '@/lib/cms';
import { supabase } from '@/lib/supabase';

export default async function Home({ searchParams }: any) {
  const params = await searchParams;
  const preview = params?.preview === "true";
  const status = preview ? "draft" : "published";

  // Use getPage helper
  const page = await getPage('home', preview);

  // Fetch featured products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'published')
    .limit(6)
    .order('created_at', { ascending: false });

  // Render CMS content if available
  if (page && page.sections && page.sections.length > 0) {
    // Separate hero and imageGrid from other sections
    const heroSection = page.sections.find((s: any) => s.type === 'hero');
    const imageGridSection = page.sections.find((s: any) => s.type === 'imageGrid');
    const otherSections = page.sections.filter((s: any) => s.type !== 'hero' && s.type !== 'imageGrid');

    return (
      <div className="min-h-screen">
        {preview && (
          <div className="bg-yellow-100 border-b-2 border-yellow-400 text-yellow-800 px-4 py-2 text-center text-sm font-medium">
            👀 Preview Mode - Showing draft content
          </div>
        )}
        
        {/* Hero first */}
        {heroSection && <PageRenderer sections={[heroSection]} mode="public" />}
        
        {/* Category tiles (ImageGrid) */}
        {imageGridSection && <PageRenderer sections={[imageGridSection]} mode="public" />}
        
        {/* Featured Products Section - After categories */}
        {products && products.length > 0 && (
          <section className="py-20 sm:py-28 lg:py-32 bg-gradient-to-b from-white to-gray-50 relative z-10 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.03),transparent_70%)]" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
              <div className="mb-12 lg:mb-16 text-center animate-fade-in">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                  Vörur sem virka í <span className="text-green-600 relative">
                    íslenskum görðum
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-green-400/30 -mb-2"></span>
                  </span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Lausnir og efni sem við notum sjálf í verkefnum okkar.
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-6 rounded-full" />
              </div>

              <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {products.slice(0, 6).map((product: any, idx: number) => (
                  <a
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="group relative h-[420px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slide-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <img
                      src={product.image || 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80'}
                      alt={product.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-700"
                    />

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-500" />

                    {/* Glowing ring on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 rounded-3xl ring-2 ring-green-400/50" />
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-white transform group-hover:-translate-y-2 transition-transform duration-500">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 drop-shadow-lg group-hover:text-green-400 group-hover:drop-shadow-[0_0_10px_rgba(74,222,128,0.5)] transition-all duration-300">
                        {product.title}
                      </h3>
                      <p className="text-sm sm:text-base text-white/80 group-hover:text-white line-clamp-2 transition-colors duration-300 leading-relaxed">
                        {product.description || 'Lausnir sem þola íslenskt veður'}
                      </p>
                    </div>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-12 lg:mt-16 text-center">
                <a
                  href="/products"
                  className="group inline-flex items-center gap-3 text-green-600 hover:text-green-700 font-bold text-lg px-8 py-4 rounded-xl bg-green-50 hover:bg-green-100 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <span>Skoða allar lausnir</span>
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </section>
        )}
        
        {/* Mission Statement - Full width like tiles - BETWEEN products and features */}
        <section className="py-20 sm:py-28 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.06),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(34,197,94,0.06),transparent_50%)]" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto animate-fade-in">
              {/* Heading with green accent bars */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-green-500 rounded-full" />
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Garðlausnir sem endast í{' '}
                  <span className="text-green-600 relative">
                    íslenskum aðstæðum
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-green-400/30 rounded-full" />
                  </span>
                </h2>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-green-500 rounded-full" />
              </div>
              
              {/* Body text */}
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8">
                Við hönnum og veljum lausnir sem standast <span className="font-semibold text-gray-900">veður, tíma og raunverulega notkun</span>.
              </p>
              
              {/* Additional descriptive text */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Hvort sem um er að ræða heildarlausnir fyrir garða, ræktun eða sérhæfðar vörur, þá byggjum við á reynslu, 
                þekkingu og gæðum sem endast. Öll vörumerki og verkfæri eru valin af fagfólki með áratuga reynslu 
                í íslenskri garðyrkju og landbúnaði.
              </p>
            </div>
          </div>
        </section>
        
        {/* Rest of CMS sections (Features, CTA, etc) */}
        {otherSections.length > 0 && <PageRenderer sections={otherSections} mode="public" />}
      </div>
    );
  }

  // Fallback: Static homepage (if no CMS content)
  return (
    <>
      <Hero
        data={{
          heading: "Garðlausnir sem endast í íslenskum aðstæðum",
          text: "Hannað fyrir íslenskt veður. Valið af fagfólki.",
          image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1920&q=80",
          imageAlt: "Fallegur garður",
          ctaText: "Skoða vörur",
          ctaLink: "/products",
        }}
      />

      {/* Featured Products Section */}
      {products && products.length > 0 && (
        <section className="py-20 sm:py-28 lg:py-32 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="mb-12 lg:mb-16 text-center animate-fade-in">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Vörur sem virka í íslenskum görðum
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                Lausnir og efni sem við notum sjálf í verkefnum okkar.
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map((product: any) => (
                <a
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group relative h-[420px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80'}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-white">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 drop-shadow-lg">{product.title}</h3>
                    <p className="text-sm sm:text-base text-white/90 line-clamp-2">
                      {product.description || 'Lausnir sem þola íslenskt veður'}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a
                href="/products"
                className="inline-block text-green-600 hover:text-green-700 font-semibold text-lg group"
              >
                Skoða allar lausnir 
                <span className="inline-block group-hover:translate-x-2 transition-transform duration-300 ml-2">→</span>
              </a>
            </div>
          </div>
        </section>
      )}
      <Features
        data={{
          heading: "Þjónusta okkar",
          features: [
            {
              icon: "🎨",
              title: "Hönnun sem virkar",
              text: "Sérsniðin garðhönnun fyrir íslenskar aðstæður",
            },
            {
              icon: "🌱",
              title: "Lausnir sem endast",
              text: "Frá jarðvegi til uppsköru - allt á einum stað",
            },
            {
              icon: "🛠️",
              title: "Valið af fagfólki",
              text: "Verkfæri og búnaður sem þolir íslenskt veður",
            },
          ],
        }}
      />
      <CTA
        data={{
          heading: "Tilbúinn að byrja?",
          description: "Fáðu ókeypis ráðgjöf frá fagfólki",
          buttonText: "Fá tillögu að lausn",
          buttonLink: "/contact",
        }}
      />
    </>
  );
}

