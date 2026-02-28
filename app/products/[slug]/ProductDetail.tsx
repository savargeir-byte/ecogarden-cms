'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Spec {
  key: string;
  value: string;
}

interface Props {
  product: {
    slug: string;
    title: string;
    description?: string;
    features?: string[];
    specifications?: Spec[];
    videoUrl?: string;
    pdfUrl?: string;
    pdfLabel?: string;
    mainImageUrl?: string;
    galleryUrls?: string[];
    categories?: { title_is: string; slug: string }[];
  };
}

function embedUrl(url: string) {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

export default function ProductDetail({ product }: Props) {
  const allImages = [
    ...(product.mainImageUrl ? [product.mainImageUrl] : []),
    ...(product.galleryUrls ?? []),
  ];

  const [activeImg, setActiveImg] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const hasDescription = !!product.description;
  const hasFeatures    = !!(product.features && product.features.length > 0);
  const hasSpecs       = !!(product.specifications && product.specifications.length > 0);
  const hasVideo       = !!product.videoUrl;
  const hasPdf         = !!product.pdfUrl;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, subject: `Tilboðsbeiðni: ${product.title}` }),
      });
    } catch {}
    setSubmitted(true);
    setShowForm(false);
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-500 flex-wrap">
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

      {/* == ABOVE THE FOLD: 2-col == */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">

          {/* LEFT: sticky image gallery */}
          <div className="lg:sticky lg:top-24">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-xl">
              {allImages.length > 0 ? (
                <img src={allImages[activeImg]} alt={product.title}
                  className="w-full h-full object-cover transition-all duration-300" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-200 text-9xl select-none">📦</div>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
                {allImages.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImg === i ? 'border-green-500 shadow-md scale-105' : 'border-gray-200 hover:border-gray-400'
                    }`}>
                    <img src={img} alt={`Mynd ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: info + CTA */}
          <div className="flex flex-col gap-6">

            {product.categories && product.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.categories.map(cat => (
                  <Link key={cat.slug} href={`/flokkar/${cat.slug}`}
                    className="inline-block bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-green-100 transition border border-green-100">
                    {cat.title_is}
                  </Link>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
              {product.title}
            </h1>

            {hasDescription && (
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description!.split('\n')[0]}
              </p>
            )}

            {hasFeatures && (
              <ul className="space-y-2.5">
                {product.features!.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">✓</span>
                    <span className="text-gray-700 text-base">{f}</span>
                  </li>
                ))}
              </ul>
            )}

            {hasPdf && (
              <a href={product.pdfUrl!} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition">
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                {product.pdfLabel ?? 'Sækja gagnablað (PDF)'}
              </a>
            )}

            {/* CTA box */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-sm mt-2">
              <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Hagstæð verð</p>
              <h3 className="text-xl font-bold text-gray-900 mb-5">Fáðu tilboð í {product.title}</h3>

              {submitted ? (
                <div className="text-center py-4 text-green-700 font-semibold">
                  ✅ Takk! Við höfum samband við þig fljótlega.
                </div>
              ) : !showForm ? (
                <div className="space-y-3">
                  <button onClick={() => setShowForm(true)}
                    className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 py-4 text-base font-bold uppercase tracking-wide text-white shadow-xl shadow-green-500/30 transition-all duration-300 hover:scale-[1.02] hover:brightness-110 hover:shadow-green-400/50 active:scale-[0.98]">
                    <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 blur-md group-hover:opacity-40 transition-opacity duration-300" />
                    <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Fá tilboð
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                  <Link href="/contact"
                    className="w-full block text-center border-2 border-green-200 text-green-700 font-semibold py-3 rounded-xl hover:bg-green-50 transition text-sm">
                    Hafa samband →
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input required name="name" type="text" placeholder="Nafn þitt"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" />
                  <input required name="email" type="email" placeholder="Netfang"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" />
                  <input name="phone" type="tel" placeholder="Símanúmer (valfrjálst)"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white" />
                  <textarea rows={3} name="message" placeholder={`Spurning um ${product.title}...`}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none bg-white" />
                  <button type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:brightness-110 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-green-500/20">
                    Senda fyrirspurn
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}
                    className="w-full text-sm text-gray-400 hover:text-gray-600 transition">
                    Hætta við
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* == BELOW THE FOLD: full-width sections == */}

      {/* Lýsing */}
      {hasDescription && (
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1 h-7 rounded-full bg-green-500 inline-block" />
              Lýsing
            </h2>
            {product.description!.split('\n').filter(Boolean).map((para, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-4 text-base">{para}</p>
            ))}
          </div>
        </section>
      )}

      {/* Tæknilegar upplýsingar */}
      {hasSpecs && (
        <section className="border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1 h-7 rounded-full bg-green-500 inline-block" />
              Tæknilegar upplýsingar
            </h2>
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              {product.specifications!.map((s, i) => (
                <div key={i}
                  className={`flex justify-between items-center px-6 py-4 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${i !== 0 ? 'border-t border-gray-100' : ''}`}>
                  <span className="text-gray-500 font-medium">{s.key}</span>
                  <span className="text-gray-900 font-bold">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PDF download */}
      {hasPdf && (
        <section className="border-t border-gray-100 bg-red-50">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-white border border-red-100 rounded-2xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center shrink-0 text-3xl">📄</div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{product.pdfLabel ?? `Gagnablað – ${product.title}`}</h3>
                <p className="text-sm text-gray-500">Sæktu tæknilegar upplýsingar og leiðbeiningar á PDF formi.</p>
              </div>
              <a href={product.pdfUrl!} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Sækja PDF
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Myndband */}
      {hasVideo && (
        <section className="border-t border-gray-100 bg-gray-900">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1 h-7 rounded-full bg-green-500 inline-block" />
              Myndband
            </h2>
            <div className="rounded-2xl overflow-hidden aspect-video shadow-2xl">
              <iframe width="100%" height="100%" src={embedUrl(product.videoUrl!)} title={product.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen className="w-full h-full" />
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA strip */}
      <section className="border-t border-gray-100 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
          <div>
            <h2 className="text-2xl font-bold mb-1">Áhugi á {product.title}?</h2>
            <p className="text-green-100 text-sm">Við gefum þér frítt tilboð án skuldbindingar.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setShowForm(true); }}
              className="px-6 py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-all duration-200 shadow-lg text-sm">
              Fá tilboð →
            </button>
            <Link href="/contact"
              className="px-6 py-3 border-2 border-white/40 text-white font-semibold rounded-xl hover:border-white hover:bg-white/10 transition-all duration-200 text-sm">
              Hafa samband
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
