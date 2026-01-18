'use client';

import { useState, useEffect } from 'react';
import { translations } from '@/lib/i18n';

export function useTranslation() {
  const [language, setLanguage] = useState('is');

  useEffect(() => {
    // Get initial language - ONLY use 'en' if explicitly set, default to 'is'
    const savedLang = localStorage.getItem('language');
    const initialLang = (savedLang === 'en') ? 'en' : 'is';
    setLanguage(initialLang);
    
    // Make sure localStorage has the right value
    if (savedLang !== 'is' && savedLang !== 'en') {
      localStorage.setItem('language', 'is');
    }

    // Listen for language changes
    const handleLanguageChange = () => {
      const newLang = localStorage.getItem('language') || 'is';
      setLanguage(newLang);
    };

    window.addEventListener('languagechange', handleLanguageChange);
    window.addEventListener('storage', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t, language };
}
