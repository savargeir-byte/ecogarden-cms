'use client';

import { useTranslation } from '@/hooks/useTranslation';

const subcategories = [
  {
    id: 'grodur hus',
    name: 'Gróðurhús',
    name_en: 'Greenhouses',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
  },
  {
    id: 'varmast yring',
    name: 'Varmastýring',
    name_en: 'Climate Control',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
  },
  {
    id: 'raektunarkassar',
    name: 'Ræktunarkassar',
    name_en: 'Growing Systems',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
  },
  {
    id: 'vokvunarkerfi',
    name: 'Vökvunarkerfi',
    name_en: 'Irrigation Systems',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
  },
  {
    id: 'led-ljosabunadur',
    name: 'LED ljósabúnaður',
    name_en: 'LED Grow Lights',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80',
  },
  {
    id: 'hitastigar-og-maelar',
    name: 'Hitastigar og mælar',
    name_en: 'Sensors & Meters',
    image: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=800&q=80',
  },
];

export default function HomeCategoriesSection() {
  const { t, language } = useTranslation();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('productsHeading')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('productsSubheading')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subcategories.map((sub) => {
            const name = language === 'en' ? sub.name_en : sub.name;
            return (
              <a
                key={sub.id}
                href={`/products?category=gardyrkjubaendur&sub=${sub.id}`}
                className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={sub.image}
                  alt={name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/70 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:scale-110 transition-transform drop-shadow-lg">
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
