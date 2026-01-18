'use client';

import { useState, useEffect } from 'react';
import { translations } from '@/lib/i18n';

export function useTranslation() {
  const [language, setLanguage] = useState('is');

  useEffect(() => {
    // Get initial language
    const savedLang = localStorage.getItem('language') || 'is';
    setLanguage(savedLang);

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
