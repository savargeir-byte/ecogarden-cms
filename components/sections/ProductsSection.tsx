'use client';

import { useTranslation } from '@/hooks/useTranslation';
import IntersectionAnimate from '@/components/IntersectionAnimate';
import TiltCard from '@/components/TiltCard';

export default function ProductsSection({ products }: { products: any[] }) {
  const { t } = useTranslation();

  if (!products || products.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50 relative z-10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.03),transparent_70%)] animate-pulse [animation-duration:5s]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 lg:mb-16 text-center animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            {t('productsHeading')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('productsSubheading')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product: any, idx: number) => (
            <IntersectionAnimate 
              key={product.id}
              animation="slide-up" 
              delay={idx * 100}
              duration={700}
            >
              <TiltCard maxTilt={8} scale={1.02}>
                <a
                  href={`/products/${product.slug}`}
                  className="group relative h-[420px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 block bg-gray-100"
                >
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80'}
                    alt={product.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 group-hover:rotate-1 transition-all duration-700"
                  />

                  {/* Animated gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-500" />

                  {/* Glowing ring on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute inset-0 rounded-3xl ring-2 ring-green-400/50 group-hover:ring-4 transition-all duration-500" />
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-white transform group-hover:-translate-y-2 transition-transform duration-500">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 drop-shadow-lg group-hover:text-green-400 group-hover:drop-shadow-[0_0_10px_rgba(74,222,128,0.5)] group-hover:translate-x-1 transition-all duration-300">
                      {product.title}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-gray-200 line-clamp-2 drop-shadow-md">
                        {product.description}
                      </p>
                    )}
                  </div>
                </a>
              </TiltCard>
            </IntersectionAnimate>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold text-lg group"
          >
            <span>{t('viewAllProducts')}</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
