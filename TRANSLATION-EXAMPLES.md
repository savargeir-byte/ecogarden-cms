# 🔧 Using Translations - Examples

This file shows practical examples of how to use the translation system in your components.

## Basic Usage

### Simple Text Translation

```tsx
import { t } from "@/lib/i18n";
import { useState, useEffect } from "react";

export default function MyComponent() {
  const [lang, setLang] = useState("is");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "is";
    setLang(savedLang);
  }, []);

  return (
    <div>
      <h1>{t("home", lang)}</h1>
      <p>{t("welcome", lang)}</p>
    </div>
  );
}
```

## Listening to Language Changes

### Using Storage Events

```tsx
"use client";

import { t } from "@/lib/i18n";
import { useState, useEffect } from "react";

export default function ReactiveComponent() {
  const [lang, setLang] = useState("is");

  useEffect(() => {
    // Initial load
    const savedLang = localStorage.getItem("language") || "is";
    setLang(savedLang);

    // Listen for changes
    const handleLanguageChange = () => {
      const newLang = localStorage.getItem("language") || "is";
      setLang(newLang);
    };

    window.addEventListener("storage", handleLanguageChange);

    // Custom event for same-tab changes
    window.addEventListener("languageChange", handleLanguageChange);

    return () => {
      window.removeEventListener("storage", handleLanguageChange);
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);

  return (
    <div>
      <h1>{t("title", lang)}</h1>
      <p>{t("description", lang)}</p>
    </div>
  );
}
```

## Navigation Example

```tsx
import Link from "next/link";
import { t } from "@/lib/i18n";

export default function Navigation({ lang }: { lang: string }) {
  return (
    <nav>
      <Link href="/">{t("home", lang)}</Link>
      <Link href="/products">{t("products", lang)}</Link>
      <Link href="/about">{t("about", lang)}</Link>
      <Link href="/contact">{t("contact", lang)}</Link>
    </nav>
  );
}
```

## Form Example

```tsx
import { t } from "@/lib/i18n";

export default function ContactForm({ lang }: { lang: string }) {
  return (
    <form>
      <label htmlFor="name">
        {t("name", lang)} {t("required", lang)}
      </label>
      <input id="name" type="text" placeholder={t("fullName", lang)} />

      <label htmlFor="email">
        {t("emailLabel", lang)} {t("required", lang)}
      </label>
      <input id="email" type="email" placeholder={t("yourEmail", lang)} />

      <label htmlFor="message">
        {t("message", lang)} {t("required", lang)}
      </label>
      <textarea id="message" placeholder={t("yourMessage", lang)} />

      <button type="submit">{t("send", lang)}</button>
    </form>
  );
}
```

## Button Variants

```tsx
import { t } from "@/lib/i18n";

export default function Buttons({ lang }: { lang: string }) {
  return (
    <>
      {/* Primary CTA */}
      <button className="btn-primary">{t("getQuote", lang)}</button>

      {/* Secondary */}
      <button className="btn-secondary">{t("learnMore", lang)}</button>

      {/* Action buttons */}
      <button>{t("save", lang)}</button>
      <button>{t("cancel", lang)}</button>
      <button>{t("delete", lang)}</button>
    </>
  );
}
```

## Stats Section

```tsx
import { t } from "@/lib/i18n";
import NumberCounter from "@/components/NumberCounter";

export default function Stats({ lang }: { lang: string }) {
  return (
    <section>
      <h2>{t("statsHeading", lang)}</h2>
      <p>{t("statsSubheading", lang)}</p>

      <div className="stats-grid">
        <div className="stat">
          <NumberCounter end={500} />
          <h3>{t("projects", lang)}</h3>
          <p>{t("projectsDesc", lang)}</p>
        </div>

        <div className="stat">
          <NumberCounter end={20} />
          <h3>{t("yearsExperience", lang)}</h3>
          <p>{t("yearsDesc", lang)}</p>
        </div>

        <div className="stat">
          <NumberCounter end={95} suffix="%" />
          <h3>{t("satisfaction", lang)}</h3>
          <p>{t("satisfactionDesc", lang)}</p>
        </div>
      </div>
    </section>
  );
}
```

## Features Grid

```tsx
import { t } from "@/lib/i18n";

export default function Features({ lang }: { lang: string }) {
  const features = [
    {
      icon: "🌱",
      titleKey: "ecoApproach",
      descKey: "ecoApproachDesc",
    },
    {
      icon: "🏆",
      titleKey: "experienceThatMatters",
      descKey: "experienceDesc",
    },
    {
      icon: "💼",
      titleKey: "lastingSolutions",
      descKey: "lastingSolutionsDesc",
    },
  ];

  return (
    <section>
      <h2>{t("whyEcoGarden", lang)}</h2>

      <div className="features-grid">
        {features.map((feature, idx) => (
          <div key={idx} className="feature-card">
            <div className="icon">{feature.icon}</div>
            <h3>{t(feature.titleKey, lang)}</h3>
            <p>{t(feature.descKey, lang)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

## Dynamic Content with Fallback

```tsx
import { t } from "@/lib/i18n";

export default function ProductCard({
  product,
  lang,
}: {
  product: any;
  lang: string;
}) {
  // Use translated field if available, fallback to default
  const title =
    lang === "en" && product.title_en ? product.title_en : product.title;

  const description =
    lang === "en" && product.description_en
      ? product.description_en
      : product.description;

  return (
    <div className="product-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button>{t("learnMore", lang)}</button>
    </div>
  );
}
```

## Loading States

```tsx
import { t } from "@/lib/i18n";

export default function LoadingState({ lang }: { lang: string }) {
  return (
    <div className="loading">
      <div className="spinner" />
      <p>{t("loading", lang)}</p>
    </div>
  );
}
```

## Error States

```tsx
import { t } from "@/lib/i18n";

export default function ErrorState({
  lang,
  error,
}: {
  lang: string;
  error?: string;
}) {
  return (
    <div className="error">
      <h3>{t("error", lang)}</h3>
      <p>{error || t("somethingWentWrong", lang)}</p>
      <button>{t("tryAgain", lang)}</button>
    </div>
  );
}
```

## Hero Section

```tsx
import { t } from "@/lib/i18n";
import Image from "next/image";

export default function Hero({ lang }: { lang: string }) {
  return (
    <section className="hero">
      <Image
        src="/hero-bg.jpg"
        alt={t("aboutHeroTitle", lang)}
        fill
        className="hero-bg"
      />

      <div className="hero-content">
        <h1>{t("aboutHeroTitle", lang)}</h1>
        <p>{t("aboutHeroSubtitle", lang)}</p>

        <div className="hero-actions">
          <a href="/contact" className="btn-primary">
            {t("getFreeConsultation", lang)}
          </a>
          <a href="/products" className="btn-secondary">
            {t("viewProducts", lang)}
          </a>
        </div>
      </div>
    </section>
  );
}
```

## Custom Hook for Language

```tsx
// hooks/useLanguage.ts
import { useState, useEffect } from "react";

export function useLanguage() {
  const [lang, setLang] = useState("is");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "is";
    setLang(savedLang);

    const handleChange = () => {
      setLang(localStorage.getItem("language") || "is");
    };

    window.addEventListener("storage", handleChange);
    window.addEventListener("languageChange", handleChange);

    return () => {
      window.removeEventListener("storage", handleChange);
      window.removeEventListener("languageChange", handleChange);
    };
  }, []);

  const changeLanguage = (newLang: string) => {
    localStorage.setItem("language", newLang);
    setLang(newLang);
    window.dispatchEvent(new Event("languageChange"));
  };

  return { lang, changeLanguage };
}
```

### Using the Custom Hook

```tsx
import { t } from "@/lib/i18n";
import { useLanguage } from "@/hooks/useLanguage";

export default function MyComponent() {
  const { lang, changeLanguage } = useLanguage();

  return (
    <div>
      <h1>{t("home", lang)}</h1>

      <button onClick={() => changeLanguage("en")}>English</button>
      <button onClick={() => changeLanguage("is")}>Íslenska</button>
    </div>
  );
}
```

## Server Component Pattern

For server components, pass language as a prop:

```tsx
// app/page.tsx
import { t } from "@/lib/i18n";
import ClientComponent from "@/components/ClientComponent";

export default function Page({
  searchParams,
}: {
  searchParams: { lang?: string };
}) {
  const lang = searchParams.lang || "is";

  return (
    <div>
      <h1>{t("home", lang)}</h1>
      <ClientComponent lang={lang} />
    </div>
  );
}
```

## Complete Page Example

```tsx
"use client";

import { t } from "@/lib/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CTA from "@/components/CTA";

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <>
      <Navigation lang={lang} />
      <Hero lang={lang} />
      <Features lang={lang} />
      <CTA
        heading={t("readyToStart", lang)}
        description={t("freeConsultation", lang)}
        buttonText={t("getQuote", lang)}
        buttonLink="/contact"
      />
    </>
  );
}
```

## Tips & Best Practices

1. **Always extract language state at top level** - Don't repeat `useState` in every component
2. **Pass lang as prop** - Cleaner than reading localStorage in every component
3. **Use custom hook** - Encapsulate language logic for reusability
4. **Test both languages** - Check translations work before deploying
5. **Fallback to keys** - The `t()` function returns the key if translation is missing
6. **Keep keys consistent** - Use descriptive names like `aboutHeroTitle`

## Adding New Translations

1. Add to `lib/i18n.ts`:

```typescript
export const translations = {
  is: {
    myNewKey: "Íslenskur texti",
  },
  en: {
    myNewKey: "English text",
  },
};
```

2. Use in component:

```tsx
<p>{t("myNewKey", lang)}</p>
```

---

**Need help?** See [TRANSLATIONS.md](TRANSLATIONS.md) for full documentation.
