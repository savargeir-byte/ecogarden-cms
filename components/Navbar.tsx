'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';
import EditBadge from '@/components/EditBadge';

// ============================================================
// NAVBAR
// ============================================================
// YFIRLIT — Hvar er hægt að breyta hvað:
//   Logo texti       → "Eco<span>Garden</span>" hér að neðan
//   Valmynd liðir    → Texti kemur úr lib/i18n.ts (home, products, about, contact)
//   "Fá tilboð" hnappur → Texti kemur úr lib/i18n.ts (getQuote)
//                         href= er '/contact'
// ============================================================

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

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
              <div className={`flex items-center gap-3 transition-all duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}>
                {/* ── ECOGARDEN LOGO ─────────────────────────────────
                    Logo mynd kemur úr /public/logo.png
                    Breyttu myndinni með því að skipta út /public/logo.png */}
                {/* [73] NAVBAR — Logo mynd */}
                <EditBadge n={73} />
                <div className="relative">
                  <Image
                    src="/logo.svg"
                    alt="EcoGarden Logo"
                    width={scrolled ? 140 : 180}
                    height={scrolled ? 40 : 50}
                    className="transition-all duration-300 object-contain"
                    priority
                  />
                </div>
              </div>
            </Link>

            {/* Desktop Menu - Center */}
            {/* [74] NAVBAR — Valmynd liðir texti → lib/i18n.ts → home/products/about/contact */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors uppercase text-sm">
                {t('home')}
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-green-600 font-medium transition-colors uppercase text-sm">
                {t('products')}
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-green-600 font-medium transition-colors uppercase text-sm">
                {t('about')}
              </Link>
              <Link href="/news" className="text-gray-700 hover:text-green-600 font-medium transition-colors uppercase text-sm">
                {t('news')}
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600 font-medium transition-colors uppercase text-sm">
                {t('contact')}
              </Link>
            </div>

            {/* Right Side - Language + CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>
              
              {/* [75] NAVBAR — "Fá tilboð" hnappur texti → lib/i18n.ts → getQuote */}
              <EditBadge n={75} />
              <Link 
                href="/contact" 
                className="hidden lg:inline-block px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-102 uppercase text-sm"
              >
                {t('getQuote')}
              </Link>
              
              {/* Hamburger - More transparent with site green color */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`p-2 rounded-lg backdrop-blur-sm transition-all duration-300 relative z-50 flex items-center justify-center shadow-md hover:scale-110 border ${
                  menuOpen 
                    ? 'bg-green-600/15 hover:bg-green-600/25 border-green-600/30 w-12 h-12' 
                    : scrolled 
                      ? 'bg-green-600/20 hover:bg-green-600/30 border-green-600/30 w-10 h-10 sm:w-11 sm:h-11' 
                      : 'bg-green-600/15 hover:bg-green-600/25 border-green-600/25 w-11 h-11 sm:w-12 sm:h-12'
                }`}
                aria-label="Toggle menu"
              >
                <div className={`flex flex-col justify-between transition-all duration-300 ${
                  menuOpen ? 'w-6 h-5' : scrolled ? 'w-5 h-4' : 'w-6 h-5'
                }`}>
                  <span className={`block w-full transition-all duration-300 ${
                    menuOpen 
                      ? 'rotate-45 translate-y-2 h-0.5 bg-green-600' 
                      : scrolled 
                        ? 'h-0.5 bg-green-700' 
                        : 'h-[3px] bg-green-600'
                  }`} />
                  <span className={`block w-full transition-all duration-300 ${
                    menuOpen 
                      ? 'opacity-0 h-0.5 bg-green-600' 
                      : scrolled 
                        ? 'h-0.5 bg-green-700' 
                        : 'h-[3px] bg-green-600'
                  }`} />
                  <span className={`block w-full transition-all duration-300 ${
                    menuOpen 
                      ? '-rotate-45 -translate-y-2 h-0.5 bg-green-600' 
                      : scrolled 
                        ? 'h-0.5 bg-green-700' 
                        : 'h-[3px] bg-green-600'
                  }`} />
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
              <span className="text-2xl">🏡</span>
              <span>{t('home')}</span>
            </Link>
            <Link 
              href="/products" 
              onClick={() => setMenuOpen(false)}
              className={`text-white hover:text-gray-200 transition-all flex items-center gap-3 text-lg font-medium ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
              style={{ transitionDelay: menuOpen ? '150ms' : '0ms' }}
            >
              <span className="text-2xl">🌱</span>
              <span>{t('products')}</span>
            </Link>
            <Link 
              href="/about" 
              onClick={() => setMenuOpen(false)}
              className={`text-white hover:text-gray-200 transition-all flex items-center gap-3 text-lg font-medium ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
              style={{ transitionDelay: menuOpen ? '200ms' : '0ms' }}
            >
              <span className="text-2xl">ℹ️</span>
              <span>{t('about')}</span>
            </Link>
            <Link 
              href="/news" 
              onClick={() => setMenuOpen(false)}
              className={`text-white hover:text-gray-200 transition-all flex items-center gap-3 text-lg font-medium ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
              style={{ transitionDelay: menuOpen ? '250ms' : '0ms' }}
            >
              <span className="text-2xl">📰</span>
              <span>{t('news')}</span>
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setMenuOpen(false)}
              className={`text-white hover:text-gray-200 transition-all flex items-center gap-3 text-lg font-medium ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
              style={{ transitionDelay: menuOpen ? '300ms' : '0ms' }}
            >
              <span className="text-2xl">📞</span>
              <span>{t('contact')}</span>
            </Link>
          </div>
          
          {/* Language Switcher in mobile menu */}
          <div className="mt-8 pt-8 border-t border-white/20 md:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
