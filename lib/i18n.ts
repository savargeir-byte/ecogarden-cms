// Language helper to get current language from localStorage (client-side only)
export function getLanguage() {
  if (typeof window === 'undefined') return 'is';
  return localStorage.getItem('language') || 'is';
}

// Translations object
export const translations = {
  is: {
    // Navigation
    home: 'Heim',
    products: 'Vörur',
    about: 'Um okkur',
    contact: 'Hafa samband',
    getQuote: 'Fá tilboð',
    
    // Stats
    projects: 'Verkefni',
    projectsDesc: 'Fullunnin garðverkefni síðan 2004',
    yearsExperience: 'Ára reynsla',
    yearsDesc: 'Í íslenskri garðyrkju',
    satisfaction: 'Ánægðir viðskiptavinir',
    satisfactionDesc: 'Endurtaka viðskipti við okkur',
    statsHeading: 'Reynsla sem skiptir máli',
    statsSubheading: 'Tölur sem segja söguna',
    
    // Products
    productsHeading: 'Vörur sem virka í íslenskum görðum',
    productsSubheading: 'Lausnir og efni sem við notum sjálf í verkefnum okkar.',
    viewAllProducts: 'Skoða allar lausnir',
    
    // Mission
    missionHeading: 'Garðlausnir sem endast í íslenskum aðstæðum',
    missionText: 'Við hönnum og veljum lausnir sem standast veður, tíma og raunverulega notkun.',
    missionDesc: 'Hvort sem um er að ræða heildarlausnir fyrir garða, ræktun eða sérhæfðar vörur, þá byggjum við á reynslu, þekkingu og gæðum sem endast. Öll vörumerki og verkfæri eru valin af fagfólki með áratuga reynslu í íslenskri garðyrkju og landbúnaði.',
    
    // CTA
    readyToStart: 'Tilbúinn að byrja?',
    freeConsultation: 'Fáðu ókeypis ráðgjöf frá fagfólki',
  },
  en: {
    // Navigation
    home: 'Home',
    products: 'Products',
    about: 'About Us',
    contact: 'Contact',
    getQuote: 'Get a Quote',
    
    // Stats
    projects: 'Projects',
    projectsDesc: 'Completed garden projects since 2004',
    yearsExperience: 'Years of Experience',
    yearsDesc: 'In Icelandic horticulture',
    satisfaction: 'Satisfied Customers',
    satisfactionDesc: 'Return for repeat business',
    statsHeading: 'Experience That Matters',
    statsSubheading: 'Numbers that tell the story',
    
    // Products
    productsHeading: 'Products That Work in Icelandic Gardens',
    productsSubheading: 'Solutions and materials we use ourselves in our projects.',
    viewAllProducts: 'View All Solutions',
    
    // Mission
    missionHeading: 'Garden Solutions Built for Icelandic Conditions',
    missionText: 'We design and select solutions that withstand weather, time, and real-world use.',
    missionDesc: 'Whether it\'s complete garden solutions, cultivation, or specialized products, we build on experience, knowledge, and quality that lasts. All brands and tools are selected by professionals with decades of experience in Icelandic horticulture and agriculture.',
    
    // CTA
    readyToStart: 'Ready to Start?',
    freeConsultation: 'Get free consultation from professionals',
  }
};

export function t(key: string, lang: string = 'is'): string {
  const keys = key.split('.');
  let value: any = translations[lang as keyof typeof translations];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
