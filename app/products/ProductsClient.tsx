'use client';

import ProductCard from '@/components/ProductCard';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  slug: string;
  category?: string;
  subcategory?: string;
}

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const { t, language } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('gardyrkjubaendur');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [showSubcategoryTiles, setShowSubcategoryTiles] = useState(true);

  // Category definitions with translations
  const categories = [
    { 
      id: 'gardyrkjubaendur', 
      name: 'Garðyrkjubændur',
      name_en: 'Horticulture Farmers',
      color: 'green' 
    },
    { 
      id: 'landbunadur', 
      name: 'Landbúnaður',
      name_en: 'Agriculture',
      color: 'teal' 
    },
    { 
      id: 'almennar-gardyrkjuvorur', 
      name: 'Almennar Garðyrkjuvörur',
      name_en: 'General Garden Products',
      color: 'emerald' 
    },
  ];

  // Subcategories with translations
  const subcategories: Record<string, Array<{ id: string; name: string; name_en: string }>> = {
    'gardyrkjubaendur': [
      { id: 'grodur hus', name: 'Gróðurhús', name_en: 'Greenhouses' },
      { id: 'varmast yring', name: 'Varmastýring', name_en: 'Climate Control' },
      { id: 'raektunarkassar', name: 'Ræktunarkassar', name_en: 'Growing Systems' },
      { id: 'vokvunarkerfi', name: 'Vökvunarkerfi', name_en: 'Irrigation Systems' },
      { id: 'led-ljosabunadur', name: 'LED ljósabúnaður', name_en: 'LED Grow Lights' },
      { id: 'hitastigar-og-maelar', name: 'Hitastigar og mælar', name_en: 'Sensors & Meters' },
    ],
    'landbunadur': [
      { id: 'gardyrkjuvelar', name: 'Garðyrkjuvélar', name_en: 'Garden Machinery' },
      { id: 'slatturvelar', name: 'Slátturvélar', name_en: 'Lawn Mowers' },
      { id: 'saningabunadur', name: 'Sáningabúnaður', name_en: 'Seeding Equipment' },
      { id: 'heyvinnsla', name: 'Heyvinnsla', name_en: 'Hay Processing' },
      { id: 'girdingaefni', name: 'Girðingaefni', name_en: 'Fencing Materials' },
      { id: 'hladabunadur', name: 'Hlaðabúnaður', name_en: 'Barn Equipment' },
    ],
    'almennar-gardyrkjuvorur': [
      { id: 'gardverkfaeri', name: 'Garðverkfæri', name_en: 'Garden Tools' },
      { id: 'gardhusgo gn', name: 'Garðhúsgögn', name_en: 'Garden Furniture' },
      { id: 'pottaplantur', name: 'Pottaplöntur', name_en: 'Potted Plants' },
      { id: 'jardvegur-aburur', name: 'Jarðvegur og áburður', name_en: 'Soil & Fertilizer' },
      { id: 'girdingar-skreyting', name: 'Girðingar og skreyting', name_en: 'Fences & Decorations' },
      { id: 'vatnsslongur', name: 'Vatnsslöngur', name_en: 'Hoses' },
    ],
  };

  const subcategoryImages: Record<string, string> = {
    'grodur hus': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
    'varmast yring': 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
    'raektunarkassar': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    'vokvunarkerfi': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    'led-ljosabunadur': 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80',
    'hitastigar-og-maelar': 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=800&q=80',
    'gardyrkjuvelar': 'https://images.unsplash.com/photo-1625246286509-bc46934c3a9f?w=800&q=80',
    'slatturvelar': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    'saningabunadur': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
    'heyvinnsla': 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&q=80',
    'girdingaefni': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
    'hladabunadur': 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80',
    'gardverkfaeri': 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=800&q=80',
    'gardhusgo gn': 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
    'pottaplantur': 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80',
    'jardvegur-aburur': 'https://images.unsplash.com/photo-1625246286509-bc46934c3a9f?w=800&q=80',
    'girdingar-skreyting': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
    'vatnsslongur': 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80',
  };

  // Read category from URL on mount
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [searchParams]);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, selectedSubcategory]);

  async function loadProducts() {
    if (!selectedSubcategory) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('category', selectedCategory)
      .eq('subcategory', selectedSubcategory)
      .order('title');
    
    if (data) setProducts(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative h-[400px] bg-gradient-to-r from-green-600 via-green-700 to-green-800 overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=1920&q=80"
          alt="Garden supplies"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center z-10">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            {language === 'en' ? 'Products' : 'Vörur'}
          </h1>
          <p className="text-xl text-white/95 max-w-2xl drop-shadow-lg leading-relaxed">
            {language === 'en' 
              ? 'Everything for horticulture and agriculture - Selected by professionals'
              : 'Allt fyrir garðyrkju og landbúnað - Valið af fagfólki'
            }
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

      {/* Subcategory Tiles Grid */}
      {showSubcategoryTiles && !selectedSubcategory && (
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {language === 'en' ? 'Choose subcategory' : 'Veldu undirflokk'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategories[selectedCategory]?.map((sub) => {
              const displayName = language === 'en' ? sub.name_en : sub.name;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubcategory(sub.id);
                    setShowSubcategoryTiles(false);
                  }}
                  className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 z-10"
                >
                  {/* Background Image */}
                  <img 
                    src={subcategoryImages[sub.id] || subcategoryImages['vatnsslongur']}
                    alt={displayName}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/70 group-hover:via-black/40 transition-colors"></div>
                  
                  {/* Content */}
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
              );
            })}
          </div>
        </div>
      )}

      {/* Back button when viewing products */}
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
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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
                  {categories.find(c => c.id === selectedCategory)?.[language === 'en' ? 'name_en' : 'name']} → {subcategories[selectedCategory]?.find(s => s.id === selectedSubcategory)?.[language === 'en' ? 'name_en' : 'name']}
                </h2>
                <p className="text-gray-600">
                  <span className="font-semibold text-green-600">{products.length}</span> {
                    language === 'en' 
                      ? (products.length === 1 ? 'product' : 'products')
                      : (products.length === 1 ? 'vara' : 'vörur')
                  }
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
