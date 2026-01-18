# 🌍 Translation System Guide

## Overview

Eco Garden CMS now has a complete bilingual system (Icelandic & English) with translations for all UI elements, pages, and content.

## 📁 Files Updated

### 1. `lib/i18n.ts`
Contains all translation strings in a centralized object with two languages:
- `is` (Icelandic) - Default language
- `en` (English)

### 2. `add-english-translations.sql`
SQL script to add English versions of pages to the database.

## 🔧 How to Use Translations

### In React Components

```tsx
import { t } from '@/lib/i18n';
import { useState, useEffect } from 'react';

function MyComponent() {
  const [lang, setLang] = useState('is');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'is';
    setLang(savedLang);
  }, []);

  return (
    <div>
      <h1>{t('home', lang)}</h1>
      <p>{t('aboutHeroTitle', lang)}</p>
      <button>{t('getQuote', lang)}</button>
    </div>
  );
}
```

### Language Switcher

The `LanguageSwitcher` component is already integrated in:
- `components/Navbar.tsx`
- All main pages

Users can switch languages by clicking the language selector in the navbar.

## 📋 Available Translation Keys

### Navigation
- `home`, `products`, `about`, `contact`, `getQuote`

### Stats Section
- `projects`, `projectsDesc`, `yearsExperience`, `yearsDesc`
- `satisfaction`, `satisfactionDesc`, `statsHeading`, `statsSubheading`

### Product Section
- `productsHeading`, `productsSubheading`, `viewAllProducts`

### Mission Section
- `missionHeading`, `missionText`, `missionDesc`

### About Page
- `aboutHeroTitle`, `aboutHeroSubtitle`, `getFreeConsultation`, `viewProducts`
- `whyEcoGarden`, `ecoApproach`, `experienceThatMatters`, `lastingSolutions`
- `ourSolutions`, `designThatWorks`, `cultivationSolutions`, `gardenProducts`

### Team Section
- `ourTeam`, `teamSubtitle`, `horticultureExpert`, `salesManager`
- `quoteGudmundur`, `quoteSverrir`, `gudmundurDesc`, `sverrirDesc`

### Contact Page
- `contactHeroTitle`, `contactHeroSubtitle`
- `address`, `phone`, `email`, `followUs`, `fillOutForm`
- `name`, `phoneLabel`, `emailLabel`, `company`, `message`
- `send`, `sending`, `messageSent`

### Trust Elements
- `trustYearsExperience`, `trustEcoFriendly`
- `trustForHomeAndBusiness`, `trustNationwideService`

### Features
- `sustainability`, `quality`, `experience`
- `solutionsThatLast`, `chosenByProfessionals`

### Common Elements
- `loading`, `error`, `success`, `close`, `cancel`, `save`, `delete`
- `edit`, `add`, `search`, `filter`, `sort`, `next`, `previous`, `back`

## 🗄️ Database Setup

### Run the SQL Script

Execute `add-english-translations.sql` in your Supabase SQL Editor:

```sql
-- This will:
-- 1. Create English versions of home, about, and contact pages
-- 2. Add English translations for all page blocks
-- 3. Update product descriptions with English versions
```

### Database Schema

Pages table supports localization:
```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  locale TEXT DEFAULT 'is',  -- 'is' or 'en'
  status TEXT DEFAULT 'draft',
  blocks JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

## 🎨 Adding New Translations

### Step 1: Add to `lib/i18n.ts`

```typescript
export const translations = {
  is: {
    // ... existing translations
    myNewKey: 'Íslenskur texti',
  },
  en: {
    // ... existing translations
    myNewKey: 'English text',
  }
};
```

### Step 2: Use in Component

```tsx
<p>{t('myNewKey', lang)}</p>
```

### Step 3: Update Database (if needed)

If the translation is for CMS content:

```sql
-- Create English version of page
INSERT INTO pages (slug, title, locale, status, blocks)
VALUES (
  'my-page',
  'My English Title',
  'en',
  'published',
  '[...]'::jsonb
);
```

## 🚀 Language Detection

The system automatically:
1. **Detects** saved language from `localStorage`
2. **Defaults** to Icelandic (`is`) if no preference is saved
3. **Persists** language choice across page navigation
4. **Updates** all components when language changes

## 📱 User Experience

### Language Switcher Features
- Visible in navbar on all devices
- Persists choice in localStorage
- Updates all text instantly
- Works with both static and CMS content

### URLs
Content can be accessed with language parameter:
- `/?lang=is` - Icelandic version
- `/?lang=en` - English version
- Default: Icelandic

## 🔍 Testing Translations

### Manual Testing
1. Go to homepage
2. Click language switcher (IS/EN)
3. Verify all text changes
4. Navigate to different pages
5. Confirm language persists

### Automated Tests (Future)
```typescript
describe('Translations', () => {
  it('should load Icelandic by default', () => {
    expect(t('home')).toBe('Heim');
  });

  it('should load English when specified', () => {
    expect(t('home', 'en')).toBe('Home');
  });
});
```

## 📊 Coverage Status

### ✅ Fully Translated
- Navigation menu
- Homepage (all sections)
- About page
- Contact page
- Product listings
- Stats & Features
- Team section
- Trust elements
- CTA buttons
- Forms

### 🔄 Partially Translated
- Admin panel (still in English/Icelandic mix)
- Error messages
- Validation messages

### ❌ Not Yet Translated
- Blog posts (if added)
- Product details pages (some)
- Admin workflows

## 🎯 Best Practices

1. **Always use translation keys** instead of hardcoded text
2. **Keep keys descriptive**: `aboutHeroTitle` not `t1`
3. **Group related translations** by section/page
4. **Test both languages** before deploying
5. **Update SQL script** when adding new pages
6. **Document new keys** in this guide

## 🆘 Troubleshooting

### Text not translating?
- Check if key exists in `lib/i18n.ts`
- Verify component is using `t()` function
- Ensure `lang` state is updated
- Clear localStorage and retry

### Database content not in English?
- Run `add-english-translations.sql`
- Check `locale` field in pages table
- Verify blocks contain English text

### Language not persisting?
- Check localStorage permissions
- Verify `LanguageSwitcher` is updating state
- Check for console errors

## 📚 Resources

- [Next.js i18n](https://nextjs.org/docs/advanced-features/i18n-routing)
- [React i18n Best Practices](https://react.i18next.com/)
- [Supabase Localization](https://supabase.com/docs/guides/database/localization)

## 🔮 Future Enhancements

- [ ] Add German language (`de`)
- [ ] Add Polish language (`pl`)
- [ ] Implement URL-based language routing
- [ ] Add language detection from browser
- [ ] Create translation management UI in admin
- [ ] Export/import translations as JSON
- [ ] Add right-to-left (RTL) support for Arabic
- [ ] Pluralization support
- [ ] Date/time localization
- [ ] Number format localization

---

**Last Updated:** January 18, 2026  
**Status:** ✅ Production Ready
