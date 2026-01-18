'use client';

import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

interface Announcement {
  id: string;
  message: string;
  message_en?: string;
  type: 'info' | 'warning' | 'success' | 'error';
  active: boolean;
  start_date?: string;
  end_date?: string;
}

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      // IMPORTANT: Default to 'is' (Icelandic), only use 'en' if explicitly set
      return (saved === 'en') ? 'en' : 'is';
    }
    return 'is';
  });

  useEffect(() => {
    loadAnnouncement();

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

  async function loadAnnouncement() {
    const { data } = await supabase
      .from('announcements')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(1);

    if (data && data.length > 0) {
      const announcement = data[0];
      // Check if within date range
      const now = new Date();
      const startDate = announcement.start_date ? new Date(announcement.start_date) : null;
      const endDate = announcement.end_date ? new Date(announcement.end_date) : null;

      if ((!startDate || now >= startDate) && (!endDate || now <= endDate)) {
        setAnnouncement(announcement);
      }
    }
  }

  if (!announcement || dismissed) return null;

  const colors = {
    info: 'bg-blue-600 text-white',
    warning: 'bg-yellow-500 text-gray-900',
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
  };

  // FIX: Logic was backwards! Default to Icelandic (message), only show English if language === 'en'
  const displayMessage = (language === 'en' && announcement.message_en) 
    ? announcement.message_en  // Show English only if explicitly 'en' and translation exists
    : announcement.message;     // Always show Icelandic otherwise

  // Debug logging
  if (typeof window !== 'undefined') {
    console.log('🗣️ AnnouncementBanner Debug:', {
      language,
      localStorageLang: localStorage.getItem('language'),
      messageIS: announcement.message,
      messageEN: announcement.message_en,
      displayMessage,
      willShowEnglish: language === 'en' && announcement.message_en
    });
  }

  return (
    <div className={`${colors[announcement.type]} px-4 py-3 relative`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-sm font-medium flex-1 text-center">
          {displayMessage}
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="ml-4 text-white hover:text-gray-200"
          aria-label="Close announcement"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
