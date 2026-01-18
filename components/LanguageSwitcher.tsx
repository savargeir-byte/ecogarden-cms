'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const languages = [
  { code: 'is', label: 'IS', flag: '🇮🇸' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
];

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState('is');
  const router = useRouter();

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'is';
    setLanguage(savedLang);
  }, []);

  const switchLanguage = (code: string) => {
    setLanguage(code);
    localStorage.setItem('language', code);
    router.refresh();
  };

  return (
    <div className="flex gap-2 items-center" role="navigation" aria-label="Language switcher">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLanguage(lang.code)}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 ${
            language === lang.code
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-white/10 text-gray-700 hover:bg-green-50 border border-green-600/20'
          }`}
          aria-label={`Switch to ${lang.flag} ${lang.label}`}
          aria-current={language === lang.code ? 'true' : undefined}
        >
          <span>{lang.flag}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
}
