import PageRenderer from '@/components/PageRenderer';
import CTA from "@/components/sections/CTA";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import ProductCard from "@/components/ProductCard";
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
    const heroSection = page.sections.find(s => s.type === 'hero');
    const imageGridSection = page.sections.find(s => s.type === 'imageGrid');
    const otherSections = page.sections.filter(s => s.type !== 'hero' && s.type !== 'imageGrid');

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
        
        {/* Rest of CMS sections */}
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

      {/* Mission Statement */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Við byggjum garða sem endast
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
            Lausnir sem virka í íslenskum aðstæðum, ár eftir ár.
          </p>
        </div>
      </section>

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

