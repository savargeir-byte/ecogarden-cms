'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll(); // Check on mount
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`bg-white border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-14 sm:h-16' : 'h-20 sm:h-24'}`}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="https://static.wixstatic.com/media/1a76e4_1a35f097f8004778afeb69466c3787f2~mv2.png/v1/fill/w_552,h_256,al_c,lg_1,q_85,enc_avif,quality_auto/Untitled%2520design%2520(3)_edited.png"
                alt="Eco Garden Logo"
                className={`w-auto transition-all duration-300 ${scrolled ? 'h-8 sm:h-10' : 'h-12 sm:h-14 lg:h-16'}`}
              />
            </Link>

            {/* Desktop Menu - Center */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors uppercase text-sm">
                Heim
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-green-600 font-medium transition-colors uppercase text-sm">
                Vörur
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-green-600 font-medium transition-colors uppercase text-sm">
                Um okkur
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600 font-medium transition-colors uppercase text-sm">
                Hafa samband
              </Link>
            </div>

            {/* Right Side - CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <Link 
                href="/contact" 
                className="hidden lg:inline-block px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-102 uppercase text-sm"
              >
                Fá tilboð
              </Link>
              
              {/* Hamburger - Always visible with transparent green background */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg bg-green-600/90 hover:bg-green-700/90 backdrop-blur-sm transition-all duration-200 relative z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow-md hover:scale-105"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 sm:w-6 sm:h-5 flex flex-col justify-between">
                  <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5 sm:translate-y-2' : ''}`} />
                  <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5 sm:-translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Side Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Side Drawer Menu - Slides from right like Teemore */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-teal-600/80 backdrop-blur-md z-50 shadow-2xl transform transition-all duration-300 ease-out ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="flex flex-col h-full p-8 text-white">
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="self-end mb-8 text-white hover:text-gray-200 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Menu Links with stagger animation */}
          <div className="flex flex-col space-y-6">
            <Link 
              href="/" 
              onClick={() => setMenuOpen(false)}
              className={`text-white hover:text-gray-200 transition-all flex items-center gap-3 text-lg font-medium ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
              style={{ transitionDelay: menuOpen ? '100ms' : '0ms' }}
            >
              <span className="text-2xl">🎯</span>
              <span>3D Interactive Gallery</span>
            </Link>
            <Link 
              href="/products" 
              onClick={() => setMenuOpen(false)}
              className={`text-white hover:text-gray-200 transition-all flex items-center gap-3 text-lg font-medium ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
              style={{ transitionDelay: menuOpen ? '150ms' : '0ms' }}
            >
              <span className="text-2xl">📎</span>
              <span>Case Studies</span>
            </Link>
            <Link 
              href="/about" 
              onClick={() => setMenuOpen(false)}
              className={`text-white hover:text-gray-200 transition-all flex items-center gap-3 text-lg font-medium ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
              style={{ transitionDelay: menuOpen ? '200ms' : '0ms' }}
            >
              <span className="text-2xl">📢</span>
              <span>News & Events</span>
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setMenuOpen(false)}
              className={`text-white hover:text-gray-200 transition-all flex items-center gap-3 text-lg font-medium ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
              style={{ transitionDelay: menuOpen ? '250ms' : '0ms' }}
            >
              <span className="text-2xl">💼</span>
              <span>Careers</span>
            </Link>
            <Link 
              href="/about" 
              onClick={() => setMenuOpen(false)}
              className={`text-white hover:text-gray-200 transition-all flex items-center gap-3 text-lg font-medium ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
              style={{ transitionDelay: menuOpen ? '300ms' : '0ms' }}
            >
              <span className="text-2xl">ℹ️</span>
              <span>About Us</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
