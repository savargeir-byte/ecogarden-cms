'use client';

import { useTranslation } from '@/hooks/useTranslation';
import EditBadge from '@/components/EditBadge';

const categories = [
  {
    id: 'gardyrkjubaendur',
    badge: 69,
    name: 'Garðyrkjubændur',
    name_en: 'Horticulture Farmers',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
  },
  {
    id: 'landbunadur',
    badge: 70,
    name: 'Landbúnaður',
    name_en: 'Agriculture',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
  },
  {
    id: 'almennar-gardyrkjuvorur',
    badge: 71,
    name: 'Almennar Garðyrkjuvörur',
    name_en: 'General Garden Products',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
  },
];

export default function HomeCategoriesSection() {
  const { t, language } = useTranslation();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          {/* [67] FORSÍÐA — Vörur hluti fyrirsögn → lib/i18n.ts → productsHeading */}
          <EditBadge n={67} />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('productsHeading')}
          </h2>
          {/* [68] FORSÍÐA — Vörur hluti undirtexti → lib/i18n.ts → productsSubheading */}
          <EditBadge n={68} />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('productsSubheading')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const name = language === 'en' ? cat.name_en : cat.name;
            return (
              <a
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* [69/70/71] Tile: mynd (src=) og nafn (name/name_en í categories array) */}
                <EditBadge n={cat.badge} />
                <img
                  src={cat.image}
                  alt={name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/70 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:scale-110 transition-transform drop-shadow-lg text-center">
                    {name}
                  </h3>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 mt-4">
                    <span className="text-sm font-semibold">
                      {language === 'en' ? 'View products' : 'Skoða vörur'}
                    </span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="text-center mt-12">
          {/* [72] FORSÍÐA — "Skoða allar lausnir" hnappur texti → lib/i18n.ts → viewAllProducts */}
          <EditBadge n={72} />
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
