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
            {/* Logo → fer á forsíðu */}
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
                    width={180}
                    height={50}
                    className={`transition-all duration-300 object-contain ${scrolled ? 'w-[140px]' : 'w-[180px]'}`}
                    style={{ height: 'auto' }}
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
              <Link href="/video" className="text-gray-700 hover:text-green-600 font-medium transition-colors uppercase text-sm">
                {t('video')}
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
                className="hidden lg:inline-flex items-center gap-1.5 relative px-5 py-2 rounded-lg font-semibold text-white text-xs uppercase tracking-wide bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105 hover:shadow-green-400/50 hover:brightness-110 active:scale-95 overflow-hidden"
              >
                {/* animated glow ring */}
                <span className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 blur-sm group-hover:opacity-60 transition duration-300" />
                <span className="absolute inset-0 rounded-lg bg-white/10 opacity-0 hover:opacity-100 transition duration-300" />
                <span className="relative z-10">{t('getQuote')}</span>
                <svg className="relative z-10 w-3.5 h-3.5 -mr-0.5 transition-transform duration-300 hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              {/* Hamburger - More transparent with site green color */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`p-2 rounded-lg backdrop-blur-sm transition-all duration-300 relative z-50 flex items-center justify-center shadow-md hover:scale-110 border ${
                  menuOpen 
                    ? 'bg-green-600/15 hover:bg-green-600/25 border-green-600/30 w-8 h-8' 
                    : scrolled 
                      ? 'bg-green-600/20 hover:bg-green-600/30 border-green-600/30 w-8 h-8' 
                      : 'bg-green-600/15 hover:bg-green-600/25 border-green-600/25 w-9 h-9'
                }`}
                aria-label="Toggle menu"
              >
                <div className={`flex flex-col justify-between transition-all duration-300 ${
                  menuOpen ? 'w-4 h-3.5' : scrolled ? 'w-4 h-3' : 'w-4 h-3.5'
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

      {/* Glassmorphism Backdrop */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Glassmorphism Side Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[85%] max-w-sm z-50 backdrop-blur-xl bg-white/10 border-l border-white/20 shadow-2xl transform transition-transform duration-500 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Gradient glow layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-emerald-500/10 to-transparent pointer-events-none" />

        <div className="relative flex flex-col h-full p-8 text-white">
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="self-end mb-8 text-white/80 hover:text-white transition-colors duration-200"
            aria-label="Close menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Menu Links with stagger animation */}
          <div className="flex flex-col space-y-1">
            {[
              { href: '/',         emoji: '🏡', label: t('home'),     delay: '100ms' },
              { href: '/products', emoji: '🌱', label: t('products'), delay: '150ms' },
              { href: '/about',    emoji: 'ℹ️',  label: t('about'),    delay: '200ms' },
              { href: '/news',     emoji: '📰', label: t('news'),     delay: '250ms' },
              { href: '/video',    emoji: '🎬', label: t('video'),    delay: '270ms' },
              { href: '/contact',  emoji: '📞', label: t('contact'),  delay: '300ms' },
            ].map(({ href, emoji, label, delay }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium
                  transition-all duration-300
                  hover:bg-white/10 hover:translate-x-1
                  ${menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
                style={{ transitionDelay: menuOpen ? delay : '0ms' }}
              >
                <span className="text-2xl">{emoji}</span>
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Language Switcher in mobile menu */}
          <div className="mt-auto pt-8 border-t border-white/20 md:hidden">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
