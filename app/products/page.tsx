'use client';

import ProductCard from '@/components/ProductCard';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('Garðyrkjubændur');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [showSubcategoryTiles, setShowSubcategoryTiles] = useState(true);

  const categories = [
    { name: 'Garðyrkjubændur', color: 'green' },
    { name: 'Landbúnaður', color: 'teal' },
    { name: 'Almennar garðyrkjuvörur', color: 'emerald' },
  ];

  const subcategories: Record<string, string[]> = {
    'Garðyrkjubændur': ['Fræ', 'Steinull', 'Mold', 'Varnarefni', 'Dúkar', 'Vélar og tæki'],
    'Landbúnaður': ['Áburður', 'Fóður', 'Fræ', 'Mottur', 'Innréttingar', 'Hús', 'Vélar og tæki'],
    'Almennar garðyrkjuvörur': ['Varnarefni', 'Grasfræ', 'Áburður', 'Næring', 'O.fl'],
  };

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
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-green-600 via-green-700 to-green-800 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            Vörur
          </h1>
          <p className="text-xl text-white/90 max-w-2xl drop-shadow-lg">
            Allt fyrir garðyrkju og landbúnað
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setSelectedSubcategory(null);
                  setShowSubcategoryTiles(true);
                }}
                className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subcategory Tiles Grid - Like Teemore */}
      {showSubcategoryTiles && !selectedSubcategory && (
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Veldu undirflokk
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategories[selectedCategory]?.map((sub) => (
              <button
                key={sub}
                onClick={() => {
                  setSelectedSubcategory(sub);
                  setShowSubcategoryTiles(false);
                }}
                className="group relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Background with category color */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 group-hover:scale-105 transition-transform duration-300"></div>
                
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                  <div className="text-5xl mb-4">📦</div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:scale-110 transition-transform">
                    {sub}
                  </h3>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 mt-4">
                    <span className="text-sm font-semibold">Skoða vörur</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
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
              Til baka í undirflokka
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
              <p className="mt-4 text-gray-600">Hleð vörur...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Engar vörur fundust</h3>
              <p className="text-gray-600 mb-6">Engar vörur í þessum flokki</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCategory} → {selectedSubcategory}
                </h2>
                <p className="text-gray-600">
                  <span className="font-semibold text-green-600">{products.length}</span> {products.length === 1 ? 'vara' : 'vörur'}
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
