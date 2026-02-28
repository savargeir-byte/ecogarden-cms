'use client';

import ProductCard from '@/components/ProductCard';
import { products as allProducts } from '@/lib/products';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import EditBadge from '@/components/EditBadge';
import TiltCard from '@/components/TiltCard';

interface SanitySubcategory {
  _key: string;
  title_is: string;
  title_en?: string;
  slug: string;
  description_is?: string;
  description_en?: string;
  image?: string;
  images?: string[];
}

interface SanityCategory {
  _id: string;
  title_is: string;
  title_en?: string;
  slug: string;
  image?: string;
  subcategories?: SanitySubcategory[];
}

interface Props {
  sanityCategories: SanityCategory[];
  heroImage?: string | null;
  heroTitle_is?: string | null;
  heroTitle_en?: string | null;
  heroSubtitle_is?: string | null;
  heroSubtitle_en?: string | null;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price?: number;
  image: string;
  slug: string;
  category?: string;
  subcategory?: string;
}

// ── Hardcoded fallbacks (ef Sanity er tómt) ──────────────────
const FALLBACK_CATEGORIES = [
  { id: 'gardyrkjubaendur', name: 'Garðyrkjubændur', name_en: 'Horticulture Farmers' },
  { id: 'landbunadur',      name: 'Landbúnaður',      name_en: 'Agriculture' },
  { id: 'almennar-gardyrkjuvorur', name: 'Almennar Garðyrkjuvörur', name_en: 'General Garden Products' },
];

const FALLBACK_SUBCATEGORIES: Record<string, Array<{ id: string; name: string; name_en: string; image: string }>> = {
  'gardyrkjubaendur': [
    { id: 'grodur hus',            name: 'Gróðurhús',         name_en: 'Greenhouses',       image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80' },
    { id: 'varmast yring',         name: 'Varmastýring',      name_en: 'Climate Control',   image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80' },
    { id: 'raektunarkassar',       name: 'Ræktunarkassar',    name_en: 'Growing Systems',   image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80' },
    { id: 'vokvunarkerfi',         name: 'Vökvunarkerfi',     name_en: 'Irrigation',        image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80' },
    { id: 'led-ljosabunadur',      name: 'LED ljósabúnaður',  name_en: 'LED Grow Lights',   image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80' },
    { id: 'hitastigar-og-maelar',  name: 'Hitastigar og mælar', name_en: 'Sensors & Meters', image: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=800&q=80' },
  ],
  'landbunadur': [
    { id: 'gardyrkjuvelar',  name: 'Garðyrkjuvélar',    name_en: 'Garden Machinery',    image: 'https://images.unsplash.com/photo-1625246286509-bc46934c3a9f?w=800&q=80' },
    { id: 'slatturvelar',    name: 'Slátturvélar',      name_en: 'Lawn Mowers',         image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80' },
    { id: 'saningabunadur',  name: 'Sáningabúnaður',    name_en: 'Seeding Equipment',   image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80' },
    { id: 'heyvinnsla',      name: 'Heyvinnsla',        name_en: 'Hay Processing',       image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&q=80' },
    { id: 'girdingaefni',    name: 'Girðingaefni',      name_en: 'Fencing Materials',   image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80' },
    { id: 'hladabunadur',    name: 'Hlaðabúnaður',      name_en: 'Barn Equipment',       image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80' },
  ],
  'almennar-gardyrkjuvorur': [
    { id: 'gardverkfaeri',        name: 'Garðverkfæri',          name_en: 'Garden Tools',       image: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=800&q=80' },
    { id: 'gardhusgo gn',         name: 'Garðhúsgögn',           name_en: 'Garden Furniture',   image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80' },
    { id: 'pottaplantur',         name: 'Pottaplöntur',          name_en: 'Potted Plants',      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80' },
    { id: 'jardvegur-aburur',     name: 'Jarðvegur og áburður',  name_en: 'Soil & Fertilizer',  image: 'https://images.unsplash.com/photo-1625246286509-bc46934c3a9f?w=800&q=80' },
    { id: 'girdingar-skreyting',  name: 'Girðingar og skreyting', name_en: 'Fences & Decorations', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80' },
    { id: 'vatnsslongur',         name: 'Vatnsslöngur',          name_en: 'Hoses',              image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80' },
  ],
};

const FALLBACK_HERO_IMG = 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1920&q=80';

export default function ProductsClient({
  sanityCategories,
  heroImage,
  heroTitle_is,
  heroTitle_en,
  heroSubtitle_is,
  heroSubtitle_en,
}: Props) {
  const searchParams = useSearchParams();
  const { t, language } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [showSubcategoryTiles, setShowSubcategoryTiles] = useState(true);

  // ── Build category + subcategory data from Sanity or fallback ──
  const useSanity = sanityCategories && sanityCategories.length > 0;

  const categories = useSanity
    ? sanityCategories.map(c => ({ id: c.slug, name: c.title_is, name_en: c.title_en ?? c.title_is }))
    : FALLBACK_CATEGORIES;

  const subcategoriesMap: Record<string, Array<{ id: string; name: string; name_en: string; image: string }>> = useSanity
    ? Object.fromEntries(
        sanityCategories.map(cat => [
          cat.slug,
          (cat.subcategories ?? []).map(sub => ({
            id: sub.slug,
            name: sub.title_is,
            name_en: sub.title_en ?? sub.title_is,
            image: sub.image ?? FALLBACK_SUBCATEGORIES[cat.slug]?.find(f => f.id === sub.slug)?.image ?? FALLBACK_HERO_IMG,
          })),
        ])
      )
    : FALLBACK_SUBCATEGORIES;

  // Set default selected category on mount
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      const urlCategory = searchParams.get('category');
      setSelectedCategory(urlCategory && categories.find(c => c.id === urlCategory) ? urlCategory : categories[0].id);
    }
    const urlSub = searchParams.get('sub');
    if (urlSub) {
      setSelectedSubcategory(urlSub);
      setShowSubcategoryTiles(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length]);

  useEffect(() => {
    if (!selectedCategory) return;
    loadProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedSubcategory]);

  function loadProducts() {
    if (!selectedSubcategory) {
      setProducts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const filtered = allProducts.filter(
      (p) => p.category === selectedCategory && p.subcategory === selectedSubcategory
    );
    setProducts(filtered);
    setLoading(false);
  }

  const heroImg   = heroImage ?? FALLBACK_HERO_IMG;
  const heroTitle = language === 'en' ? (heroTitle_en ?? heroTitle_is ?? 'Products') : (heroTitle_is ?? 'Vörur');
  const heroSub   = language === 'en' ? (heroSubtitle_en ?? heroSubtitle_is ?? 'Everything for horticulture and agriculture') : (heroSubtitle_is ?? 'Allt fyrir garðyrkju og landbúnað - Valið af fagfólki');

  const currentSubs = subcategoriesMap[selectedCategory] ?? [];
  const currentCatName = categories.find(c => c.id === selectedCategory)?.[language === 'en' ? 'name_en' : 'name'] ?? '';
  const currentSubName = currentSubs.find(s => s.id === selectedSubcategory)?.[language === 'en' ? 'name_en' : 'name'] ?? '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-green-600 via-green-700 to-green-800 overflow-hidden">
        <img
          src={heroImg}
          alt="Garden supplies"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center z-10">
          <EditBadge n="55" />
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            {heroTitle}
          </h1>
          <EditBadge n="56" />
          <p className="text-xl text-white/95 max-w-2xl drop-shadow-lg leading-relaxed">
            {heroSub}
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4">
            {categories.map((cat) => {
              const displayName = language === 'en' ? cat.name_en : cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedSubcategory(null);
                    setShowSubcategoryTiles(true);
                  }}
                  className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {displayName}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Partner Logos Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 text-center mb-5">
            {language === 'en' ? 'Our partners' : 'Samstarfsaðilar okkar'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {[
              { src: '/images/logo_samstarf/bioret logo.png',                                       alt: 'Bioret Agri',      href: 'https://www.bioret-agri.com' },
              { src: '/images/logo_samstarf/619b854585a3c96022ce386b_HATO_Logo_RGB.png',            alt: 'HATO Lighting',    href: 'https://www.hato.lighting' },
              { src: '/images/logo_samstarf/VAN-HESSCHE-BETON-logo-zonder-achtergrond-300x212.png', alt: 'Van Hessche Beton', href: 'https://www.vanhessche.be' },
              { src: '/images/logo_samstarf/Mollerup-Moelle.jpg',                                   alt: 'Mollerup Mølle',   href: 'https://www.mollerupmolle.dk' },
              { src: '/images/logo_samstarf/MTczMDM3NzI5MjY3MjM3NjRjNzkyNmQ=.png',                 alt: 'Partner',          href: '#' },
              { src: '/images/logo_samstarf/5eb2958f5b00004ba115f00c.webp',                         alt: 'Partner',          href: '#' },
            ].map((logo) => (
              <a
                key={logo.src}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-20 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-20 max-w-[180px] object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Subcategory Tiles Grid */}
      {showSubcategoryTiles && !selectedSubcategory && (
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {language === 'en' ? 'Choose subcategory' : 'Veldu undirflokk'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentSubs.map((sub) => {
              const displayName = language === 'en' ? sub.name_en : sub.name;
              return (
                <TiltCard key={sub.id} maxTilt={8} scale={1.03} glare={false}>
                  <button
                    onClick={() => {
                      setSelectedSubcategory(sub.id);
                      setShowSubcategoryTiles(false);
                    }}
                    className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 w-full block"
                  >
                    <img
                      src={sub.image || FALLBACK_HERO_IMG}
                      alt={displayName}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/70 group-hover:via-black/40 transition-colors" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                      <h3 className="text-2xl font-bold mb-2 group-hover:scale-110 transition-transform drop-shadow-lg">
                        {displayName}
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
                  </button>
                </TiltCard>
              );
            })}
          </div>
        </div>
      )}

      {/* Back button */}
      {selectedSubcategory && (
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <button
              onClick={() => {
                setSelectedSubcategory(null);
                setShowSubcategoryTiles(true);
              }}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {language === 'en' ? 'Back to subcategories' : 'Til baka í undirflokka'}
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {selectedSubcategory && (
        <div className="max-w-7xl mx-auto px-6 py-12">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
              <p className="mt-4 text-gray-600">
                {language === 'en' ? 'Loading products...' : 'Hleð vörur...'}
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {language === 'en' ? 'No products found' : 'Engar vörur fundust'}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'en' ? 'No products in this category' : 'Engar vörur í þessum flokki'}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentCatName} → {currentSubName}
                </h2>
                <p className="text-gray-600">
                  <span className="font-semibold text-green-600">{products.length}</span>{' '}
                  {language === 'en'
                    ? products.length === 1 ? 'product' : 'products'
                    : products.length === 1 ? 'vara' : 'vörur'}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
