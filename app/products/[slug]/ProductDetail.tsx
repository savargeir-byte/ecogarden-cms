'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Spec {
  key: string;
  value: string;
}

interface Props {
  product: {
    title: string;
    description?: string;
    features?: string[];
    specifications?: Spec[];
    videoUrl?: string;
    mainImageUrl?: string;
    galleryUrls?: string[];
    categories?: { title_is: string; slug: string }[];
  };
}

type Tab = 'lysing' | 'eiginleikar' | 'myndbond';

export default function ProductDetail({ product }: Props) {
  const allImages = [
    ...(product.mainImageUrl ? [product.mainImageUrl] : []),
    ...(product.galleryUrls ?? []),
  ];

  const [activeImg, setActiveImg] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>('lysing');
  const [showForm, setShowForm] = useState(false);

  const tabs: { id: Tab; label: string; show: boolean }[] = [
    { id: 'lysing'      as Tab, label: 'Lýsing',      show: !!(product.description || (product.features && product.features.length > 0)) },
    { id: 'eiginleikar' as Tab, label: 'Eiginleikar', show: !!(product.specifications && product.specifications.length > 0) },
    { id: 'myndbond'    as Tab, label: 'Myndband',     show: !!product.videoUrl },
  ].filter(t => t.show);

  function embedUrl(url: string) {
    // Handle youtube.com/watch?v= and youtu.be/ formats
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    return url;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600 transition">Heim</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-green-600 transition">Vörur</Link>
          {product.categories?.[0] && (
            <>
              <span>›</span>
              <Link href={`/flokkar/${product.categories[0].slug}`} className="hover:text-green-600 transition">
                {product.categories[0].title_is}
              </Link>
            </>
          )}
          <span>›</span>
          <span className="text-gray-900 font-medium">{product.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20">

          {/* ── LEFT: Image Gallery ── */}
          <div>
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4 shadow-lg">
              {allImages.length > 0 ? (
                <img
                  src={allImages[activeImg]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-8xl">📦</div>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImg === i ? 'border-green-500 shadow-md scale-105' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt={`Mynd ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Info + CTA ── */}
          <div className="flex flex-col gap-6">

            {/* Title */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {product.title}
              </h1>
              {product.categories && product.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.categories.map(cat => (
                    <Link
                      key={cat.slug}
                      href={`/flokkar/${cat.slug}`}
                      className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-green-100 transition"
                    >
                      {cat.title_is}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Tabs */}
            {tabs.length > 0 && (
              <div>
                <div className="flex border-b border-gray-200 gap-1">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-5 py-3 text-sm font-semibold rounded-t-lg transition-all duration-200 -mb-px ${
                        activeTab === tab.id
                          ? 'bg-white border border-b-white border-gray-200 text-green-700'
                          : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="pt-6">
                  {/* Lýsing tab */}
                  {activeTab === 'lysing' && (
                    <div className="space-y-4">
                      {product.description && (
                        <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                          {product.description}
                        </p>
                      )}
                      {product.features && product.features.length > 0 && (
                        <ul className="space-y-2 mt-4">
                          {product.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">✓</span>
                              <span className="text-gray-700">{f}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Eiginleikar tab */}
                  {activeTab === 'eiginleikar' && product.specifications && (
                    <div className="rounded-xl overflow-hidden border border-gray-200">
                      {product.specifications.map((s, i) => (
                        <div
                          key={i}
                          className={`flex justify-between px-4 py-3 text-sm ${
                            i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                          }`}
                        >
                          <span className="text-gray-600 font-medium">{s.key}</span>
                          <span className="text-gray-900 font-semibold">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Myndband tab */}
                  {activeTab === 'myndbond' && product.videoUrl && (
                    <div className="rounded-xl overflow-hidden aspect-video shadow-lg">
                      <iframe
                        width="100%"
                        height="100%"
                        src={embedUrl(product.videoUrl)}
                        title={product.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sticky CTA box */}
            <div className="lg:sticky lg:top-24 mt-4 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-green-700 font-semibold mb-1 uppercase tracking-wide">Hafðu samband</p>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fáðu tilboð í {product.title}</h3>

              {!showForm ? (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowForm(true)}
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 py-4 text-lg font-bold uppercase tracking-wide text-white shadow-xl shadow-green-500/30 transition-all duration-300 hover:scale-[1.02] hover:brightness-110 hover:shadow-green-400/50 active:scale-[0.98] active:shadow-none"
                  >
                    {/* glow layer */}
                    <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 blur-md group-hover:opacity-40 transition-opacity duration-300" />
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Fá tilboð
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                  <Link
                    href="/contact"
                    className="w-full block text-center border-2 border-green-600 text-green-700 font-semibold py-3 rounded-xl hover:bg-green-50 transition"
                  >
                    Hafa samband
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={e => { e.preventDefault(); alert('Sending á leið!'); setShowForm(false); }}
                  className="space-y-3"
                >
                  <input
                    required
                    type="text"
                    placeholder="Nafn þitt"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Netfang"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="tel"
                    placeholder="Símanúmer"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <textarea
                    rows={3}
                    placeholder={`Spurning um ${product.title}...`}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition"
                  >
                    Senda fyrirspurn
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="w-full text-sm text-gray-500 hover:text-gray-700"
                  >
                    Hætta við
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
