'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ContactClientProps {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  facebookUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  mapEmbedSrc: string;
}

export default function ContactClient({
  heroImage,
  heroTitle,
  heroSubtitle,
  address,
  phone,
  email,
  openingHours,
  facebookUrl,
  linkedinUrl,
  instagramUrl,
  mapEmbedSrc,
}: ContactClientProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Contact error:', data.error);
        setStatus('error');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', address: '', service: '', message: '' });
    } catch (err) {
      console.error('Contact fetch error:', err);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative h-[300px] sm:h-[400px] overflow-hidden">
        <Image
          src={heroImage}
          alt="Hafa samband"
          fill
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-start max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl animate-fade-in">
            {heroTitle}
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 drop-shadow-lg animate-fade-in">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Contact Info + Form Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Left Column - Contact Info */}
            <div className="animate-slide-up">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg mb-6">
                <Image
                  src="/logo.png"
                  alt="Eco Garden"
                  width={200}
                  height={80}
                  className="mb-6"
                />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Heimilisfang</h3>
                    <p className="text-gray-600 whitespace-pre-line">{address}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Sími</h3>
                    <a
                      href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      {phone}
                    </a>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Netfang</h3>
                    <a
                      href={`mailto:${email}`}
                      className="text-green-600 hover:text-green-700 font-medium break-all"
                    >
                      {email}
                    </a>
                  </div>

                  {openingHours && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Opnunartímar</h3>
                      <p className="text-gray-600">{openingHours}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Fylgdu okkur</h3>
                  <div className="flex gap-4">
                    {facebookUrl && (
                      <a
                        href={facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#1877F2] hover:bg-[#0e63d0] rounded-full flex items-center justify-center transition-colors"
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    )}
                    {linkedinUrl && (
                      <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#0A66C2] hover:bg-[#0855a0] rounded-full flex items-center justify-center transition-colors"
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {instagramUrl && (
                      <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] hover:opacity-80 rounded-full flex items-center justify-center transition-opacity"
                      >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  Fylltu út formið hér:
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Nafn */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nafn *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      placeholder="Fullt nafn"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Netfang *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      placeholder="netfang@example.is"
                    />
                  </div>

                  {/* Sími */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Sími
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      placeholder="Símanúmer"
                    />
                  </div>

                  {/* Heimilisfang */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Heimilisfang
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      placeholder="Gata, póstnúmer, staður"
                    />
                  </div>

                  {/* Þjónusta */}
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Þjónusta
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all bg-white text-gray-700"
                    >
                      <option value="">Veldu þjónustu...</option>
                      <option value="Gróðurhús">Gróðurhús</option>
                      <option value="Varmastýring">Varmastýring</option>
                      <option value="Ræktunarlausnir">Ræktunarlausnir</option>
                      <option value="Vökvunarkerfi">Vökvunarkerfi</option>
                      <option value="LED ljósabúnaður">LED ljósabúnaður</option>
                      <option value="Landbúnaðarvörur">Landbúnaðarvörur</option>
                      <option value="Garðverkfæri og vörur">Garðverkfæri og vörur</option>
                      <option value="Ráðgjöf">Ráðgjöf</option>
                      <option value="Annað">Annað</option>
                    </select>
                  </div>

                  {/* Skilaboð */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Skilaboð
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all resize-none"
                      placeholder="Segðu okkur frá þínu verkefni..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-102 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {status === 'sending' ? 'Sendir...' : 'Senda'}
                  </button>

                  {status === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center animate-fade-in">
                      ✓ Takk fyrir að hafa samband! Við munum svara þér fljótlega.
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center animate-fade-in">
                      ✗ Eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur eða hringdu í {phone}.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8">
            Staðsetning
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src={mapEmbedSrc}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Staðsetning Eco Garden"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
