'use client';

import { useEffect, useRef, useState } from 'react';

const languages = [
  { code: 'is', label: 'Íslenska', short: 'IS', flag: '🇮🇸' },
  { code: 'en', label: 'English',  short: 'EN', flag: '🇬🇧' },
];

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState('is');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('language') || 'is';
    setLanguage(saved);
  }, []);

  // Loka dropdown þegar smellt er utan við
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (code: string) => {
    setLanguage(code);
    setOpen(false);
    localStorage.setItem('language', code);
    window.dispatchEvent(new Event('languagechange'));
    window.dispatchEvent(new Event('storage'));
  };

  const current = languages.find(l => l.code === language) ?? languages[0];

  return (
    <div ref={ref} className="relative" role="navigation" aria-label="Language switcher">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all duration-200 border border-transparent hover:border-green-200"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none">🌐</span>
        <span className="font-semibold">{current.short}</span>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-1.5 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-fade-in">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                language === lang.code
                  ? 'bg-green-50 text-green-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              role="option"
              aria-selected={language === lang.code}
            >
              <span className="text-lg leading-none">{lang.flag}</span>
              <span>{lang.label}</span>
              {language === lang.code && (
                <svg className="ml-auto w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
