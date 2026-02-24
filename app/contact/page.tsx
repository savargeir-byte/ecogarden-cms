'use client';

import Image from 'next/image';
import { useState } from 'react';
import EditBadge from '@/components/EditBadge';

// ============================================================
// HAFA SAMBAND SÍÐA (Contact page)
// ============================================================
// YFIRLIT — Hvar er hægt að breyta hvað:
//   Hero mynd   → src= í næstu Image component (Background Image)
//   Hero texti  → <h1> og <p> í hero section
//   Heimilisfang → "Heimilisfang" kafli hér að neðan
//   Sími         → <a href="tel:..."> og texti
//   Netfang      → <a href="mailto:..."> og texti
//   Facebook/IG  → href="#" í "Fylgdu okkur" hluta
//   Google map   → src= í <iframe> neðst
// ============================================================

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', phone: '', email: '', company: '', message: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative h-[300px] sm:h-[400px] overflow-hidden">
        {/* [46] SAMBAND — Hero bakgrunnsmynd (src=) */}
        <EditBadge n={46} />
        <Image
          src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1920&q=80"
          alt="Hafa samband"
          fill
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-start max-w-7xl mx-auto px-4 sm:px-6">
          {/* [47] SAMBAND — Hero titill */}
          <div style={{ position: 'relative' }}>
            <EditBadge n={47} />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl animate-fade-in">
              Við eigum lausnina fyrir þg
            </h1>
          </div>
          {/* [48] SAMBAND — Hero undirtexti */}
          <div style={{ position: 'relative' }}>
            <EditBadge n={48} />
            <p className="text-xl sm:text-2xl text-white/90 drop-shadow-lg animate-fade-in">
              Hringdu eða sendu okkur línu!
            </p>
          </div>
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
                  {/* ── HEIMILISFANG ────────────────────────────── */}
                  <div style={{ position: 'relative' }}>
                    <EditBadge n={49} />
                    <h3 className="font-semibold text-gray-900 mb-2">Heimilisfang</h3>
                    <p className="text-gray-600">
                      Lambhagavegur 9<br />
                      110 Reykjavík
                    </p>
                  </div>

                  {/* ── SÍMI ────────────────────────────────────── */}
                  <div style={{ position: 'relative' }}>
                    <EditBadge n={50} />
                    <h3 className="font-semibold text-gray-900 mb-2">Sími</h3>
                    <a href="tel:4878910" className="text-green-600 hover:text-green-700 font-medium">
                      487-8910
                    </a>
                  </div>

                  {/* ── NETFANG ─────────────────────────────────── */}
                  <div style={{ position: 'relative' }}>
                    <EditBadge n={51} />
                    <h3 className="font-semibold text-gray-900 mb-2">Netfang</h3>
                    <a href="mailto:oli@eco-garden.is" className="text-green-600 hover:text-green-700 font-medium break-all">
                      oli@eco-garden.is
                    </a>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Fylgdu okkur</h3>
                  {/* [52] SAMBAND — Facebook slóð (breyttu href="#") */}
                  {/* [53] SAMBAND — Instagram/LinkedIn slóð (breyttu href="#") */}
                  <div className="flex gap-4">
                    <div style={{ position: 'relative' }}>
                      <EditBadge n={52} />
                      <a href="https://www.facebook.com/Eco-Garden-104951408186641" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#1877F2] hover:bg-[#0e63d0] rounded-full flex items-center justify-center transition-colors">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <EditBadge n={53} />
                      <a href="https://www.linkedin.com/company/eco-garden-island" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-[#0A66C2] hover:bg-[#0855a0] rounded-full flex items-center justify-center transition-colors">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
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

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Fyrirtæki
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                        placeholder="Fyrirtækið þitt"
                      />
                    </div>
                  </div>

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
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* [54] SAMBAND — Google Maps (breyttu src= í iframe hér að neðan) */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white" style={{ position: 'relative' }}>
        <EditBadge n={54} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8">
            Staðsetning
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1742.8324567890123!2d-21.9!3d64.14!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNjTCsDA4JzI0LjAiTiAyMcKwNTQnMDAuMCJX!5e0!3m2!1sen!2sis!4v1234567890123!5m2!1sen!2sis"
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
