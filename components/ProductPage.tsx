'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductPageProps {
  product: {
    id: string;
    title: string;
    slug: string;
    description?: string;
    price?: number;
    images?: string[];
    features?: string[];
    specifications?: Record<string, string>;
    gallery?: string[];
  };
}

export default function ProductPage({ product }: ProductPageProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'features'>('overview');
  const [selectedImage, setSelectedImage] = useState(0);

  const images = product.images || product.gallery || [];
  const mainImage = images[selectedImage] || '/placeholder.jpg';

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="text-sm text-gray-600">
            <a href="/" className="hover:text-green-600">Home</a>
            <span className="mx-2">/</span>
            <a href="/products" className="hover:text-green-600">Products</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={mainImage}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? 'border-green-600 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-green-400'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            {product.price && (
              <div className="text-3xl font-bold text-green-600 mb-6">
                {product.price.toLocaleString('is-IS')} kr.
              </div>
            )}

            {product.description && (
              <div className="prose prose-lg mb-8 text-gray-700 leading-relaxed">
                <p>{product.description}</p>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-4 mb-8">
              <button className="flex-1 bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl">
                🛒 Add to Cart
              </button>
              <button className="px-6 py-4 border-2 border-green-600 text-green-600 rounded-lg font-bold hover:bg-green-50 transition-colors">
                ❤️
              </button>
            </div>

            {/* Quick Features */}
            {product.features && product.features.length > 0 && (
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="font-bold text-lg mb-4 text-gray-900">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex gap-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-4 px-2 font-semibold text-lg transition-colors border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-4 px-2 font-semibold text-lg transition-colors border-b-2 ${
                  activeTab === 'specs'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`pb-4 px-2 font-semibold text-lg transition-colors border-b-2 ${
                  activeTab === 'features'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Features & Benefits
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-12">
            {activeTab === 'overview' && (
              <div className="prose prose-lg max-w-none">
                <h2>Product Overview</h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.description || 'No overview available.'}
                </p>
              </div>
            )}

            {activeTab === 'specs' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                    <table className="w-full">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value], idx) => (
                          <tr
                            key={idx}
                            className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                          >
                            <td className="px-6 py-4 font-semibold text-gray-900 border-b border-gray-200">
                              {key}
                            </td>
                            <td className="px-6 py-4 text-gray-700 border-b border-gray-200">
                              {value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">No specifications available.</p>
                )}
              </div>
            )}

            {activeTab === 'features' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Features & Benefits</h2>
                {product.features && product.features.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {product.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 p-6 bg-white border border-gray-200 rounded-xl hover:border-green-400 hover:shadow-lg transition-all"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                          ✓
                        </div>
                        <div>
                          <p className="text-gray-900 font-medium">{feature}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No features listed.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products / CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Áhugasamur?</h2>
          <p className="text-xl mb-8 text-green-100">
            Hafðu samband við okkur fyrir frekari upplýsingar og tilboð
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-white text-green-600 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors shadow-lg"
            >
              📧 Hafa samband
            </a>
            <a
              href="/products"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-green-600 transition-colors"
            >
              Skoða fleiri vörur
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
