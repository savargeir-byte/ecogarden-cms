'use client';

import { useEffect, useState } from 'react';
import { translations } from '@/lib/i18n';

export default function TranslatedText({ 
  is: isText, 
  en: enText 
}: { 
  is: string; 
  en: string;
}) {
  const [language, setLanguage] = useState('is');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'is';
    setLanguage(savedLang);

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

  return <>{language === 'is' ? isText : enText}</>;
}
