'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const languages = [
  { code: 'is', label: '🇮🇸 IS' },
  { code: 'en', label: '🇬🇧 EN' },
  { code: 'de', label: '🇩🇪 DE' },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  
  // Extract current locale from pathname
  const currentLocale = pathname.split('/')[1] || 'is';

  return (
    <div className="flex gap-2" role="navigation" aria-label="Language switcher">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={`/${lang.code}${pathname.replace(/^\/[a-z]{2}/, '')}`}
          locale={lang.code}
          className={`px-3 py-1 rounded text-sm transition ${
            currentLocale === lang.code
              ? 'bg-blue-600 text-white font-semibold'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label={`Switch to ${lang.label}`}
          aria-current={currentLocale === lang.code ? 'true' : undefined}
        >
          {lang.label}
        </Link>
      ))}
    </div>
  );
}
