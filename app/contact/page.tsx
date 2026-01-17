'use client';

import Image from 'next/image';
import { useState } from 'react';

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
      {/* Hero Section with Background Image */}
      <section className="relative h-[300px] sm:h-[400px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1920&q=80"
          alt="Hafa samband"
          fill
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center items-start max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl animate-fade-in">
            Við eigum lausnina fyrir þig
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 drop-shadow-lg animate-fade-in">
            Hringdu eða sendu okkur línu!
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
                    <p className="text-gray-600">
                      Laugarásvegi 9<br />
                      110 Reykjavík
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Sími</h3>
                    <a href="tel:4874870" className="text-green-600 hover:text-green-700 font-medium">
                      487 4870
                    </a>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Netfang</h3>
                    <a href="mailto:ecogarden@ecogarden.is" className="text-green-600 hover:text-green-700 font-medium break-all">
                      ecogarden@ecogarden.is
                    </a>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Fylgdu okkur</h3>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors group">
                      <span className="text-gray-600 group-hover:text-white">f</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors group">
                      <span className="text-gray-600 group-hover:text-white">in</span>
                    </a>
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

      {/* Map Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
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
