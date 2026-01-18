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
    
    // About Page
    aboutHeroTitle: 'Garðlausnir sem endast',
    aboutHeroSubtitle: 'Við hönnum lausnir fyrir íslenskar aðstæður. 50+ ára reynsla í garðyrkju og fagleg ráðgjöf frá upphafi.',
    getFreeConsultation: 'Fá ókeypis ráðgjöf',
    viewProducts: 'Skoða vörur',
    
    // Trust Strip
    trustYearsExperience: '50+ ára reynsla',
    trustEcoFriendly: 'Vistvæn efni',
    trustForHomeAndBusiness: 'Lausnir fyrir heimili & fyrirtæki',
    trustNationwideService: 'Þjónusta um allt land',
    
    // Why Eco Garden
    whyEcoGarden: 'Af hverju Eco Garden?',
    ecoApproach: 'Vistvæn nálgun',
    ecoApproachDesc: 'Allar lausnir eru þróaðar með umhverfið í huga.',
    experienceThatMatters: 'Reynsla sem skiptir máli',
    experienceDesc: 'Yfir 50 ára samsett reynsla í garðyrkju og rekstri.',
    lastingSolutions: 'Lausnir sem endast',
    lastingSolutionsDesc: 'Við veljum efni og vörur sem standast íslenskar aðstæður.',
    
    // Solutions
    ourSolutions: 'Okkar lausnir',
    designThatWorks: 'Hönnun sem virkar',
    designDesc: 'Sérsniðin garðhönnun fyrir íslenskar aðstæður.',
    cultivationSolutions: 'Ræktunarlausnir',
    cultivationDesc: 'Snjallar lausnir fyrir ræktun í garði, gróðurhúsi eða atvinnuskyni.',
    gardenProducts: 'Garðvörur',
    gardenProductsDesc: 'Vandaðar garðvörur sem standast íslenskar aðstæður.',
    seeMore: 'Sjá nánar',
    
    // Team Section
    ourTeam: 'Teymið okkar',
    teamSubtitle: 'Reynslumiklir sérfræðingar með brennandi áhuga á garðyrkju',
    horticultureExpert: 'Sérfræðingur í garðyrkju',
    salesManager: 'Sölustjóri',
    quoteGudmundur: 'Ég trúi því að góð garðyrkja byrji á réttum lausnum.',
    quoteSverrir: 'Við seljum ekki aðeins vörur – við seljum reynslu og þjónustu.',
    gudmundurDesc: 'Með áratuga reynslu og brennandi áhuga hjálpar hann viðskiptavinum að ná árangri.',
    sverrirDesc: 'Með 30+ ára reynslu í sölu og viðskiptum tryggir Sverrir góða þjónustu.',
    
    // Contact Page
    contactHeroTitle: 'Við eigum lausnina fyrir þig',
    contactHeroSubtitle: 'Hringdu eða sendu okkur línu!',
    address: 'Heimilisfang',
    phone: 'Sími',
    email: 'Netfang',
    followUs: 'Fylgdu okkur',
    fillOutForm: 'Fylltu út formið hér:',
    name: 'Nafn',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    company: 'Fyrirtæki',
    message: 'Skilaboð',
    send: 'Senda',
    sending: 'Sendi...',
    messageSent: 'Takk fyrir! Við munum hafa samband fljótlega.',
    fullName: 'Fullt nafn',
    phoneNumber: 'Símanúmer',
    yourEmail: 'Netfang þitt',
    companyName: 'Nafn fyrirtækis',
    yourMessage: 'Skilaboðin þín...',
    required: '*',
    optional: '(valfrjálst)',
    
    // Features
    sustainability: 'Sjálfbærni',
    quality: 'Gæði',
    experience: 'Reynsla',
    solutionsThatLast: 'Lausnir sem endast',
    solutionsDesc: 'Frá jarðvegi til uppsköru - allt á einum stað',
    chosenByProfessionals: 'Valið af fagfólki',
    chosenDesc: 'Verkfæri og búnaður sem þolir íslenskt veður',
    
    // Buttons
    getProposal: 'Fá tillögu að lausn',
    contactUs: 'Hafa samband',
    learnMore: 'Læra meira',
    
    // Footer
    allRightsReserved: 'Öll réttindi áskilin',
    
    // Common
    loading: 'Hleður...',
    error: 'Villa',
    success: 'Tókst',
    close: 'Loka',
    cancel: 'Hætta við',
    save: 'Vista',
    delete: 'Eyða',
    edit: 'Breyta',
    add: 'Bæta við',
    search: 'Leita',
    filter: 'Sía',
    sort: 'Raða',
    next: 'Næsta',
    previous: 'Fyrri',
    back: 'Til baka',
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
    
    // About Page
    aboutHeroTitle: 'Garden Solutions That Last',
    aboutHeroSubtitle: 'We design solutions for Icelandic conditions. 50+ years of experience in horticulture and professional advice from the start.',
    getFreeConsultation: 'Get Free Consultation',
    viewProducts: 'View Products',
    
    // Trust Strip
    trustYearsExperience: '50+ years of experience',
    trustEcoFriendly: 'Eco-friendly materials',
    trustForHomeAndBusiness: 'Solutions for homes & businesses',
    trustNationwideService: 'Nationwide service',
    
    // Why Eco Garden
    whyEcoGarden: 'Why Eco Garden?',
    ecoApproach: 'Eco-Friendly Approach',
    ecoApproachDesc: 'All solutions are developed with the environment in mind.',
    experienceThatMatters: 'Experience That Matters',
    experienceDesc: 'Over 50 years of combined experience in horticulture and operations.',
    lastingSolutions: 'Solutions That Last',
    lastingSolutionsDesc: 'We choose materials and products that withstand Icelandic conditions.',
    
    // Solutions
    ourSolutions: 'Our Solutions',
    designThatWorks: 'Design That Works',
    designDesc: 'Custom garden design for Icelandic conditions.',
    cultivationSolutions: 'Cultivation Solutions',
    cultivationDesc: 'Smart solutions for cultivation in gardens, greenhouses, or commercial use.',
    gardenProducts: 'Garden Products',
    gardenProductsDesc: 'Quality garden products that withstand Icelandic conditions.',
    seeMore: 'See More',
    
    // Team Section
    ourTeam: 'Our Team',
    teamSubtitle: 'Experienced specialists with a passion for horticulture',
    horticultureExpert: 'Horticulture Specialist',
    salesManager: 'Sales Manager',
    quoteGudmundur: 'I believe that good horticulture starts with the right solutions.',
    quoteSverrir: 'We don\'t just sell products – we sell experience and service.',
    gudmundurDesc: 'With decades of experience and genuine passion, he helps clients succeed.',
    sverrirDesc: 'With 30+ years of experience in sales and business, Sverrir ensures excellent service.',
    
    // Contact Page
    contactHeroTitle: 'We Have the Solution for You',
    contactHeroSubtitle: 'Call us or send us a message!',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    followUs: 'Follow Us',
    fillOutForm: 'Fill out the form here:',
    name: 'Name',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    company: 'Company',
    message: 'Message',
    send: 'Send',
    sending: 'Sending...',
    messageSent: 'Thank you! We will contact you shortly.',
    fullName: 'Full name',
    phoneNumber: 'Phone number',
    yourEmail: 'Your email',
    companyName: 'Company name',
    yourMessage: 'Your message...',
    required: '*',
    optional: '(optional)',
    
    // Features
    sustainability: 'Sustainability',
    quality: 'Quality',
    experience: 'Experience',
    solutionsThatLast: 'Solutions That Last',
    solutionsDesc: 'From soil to harvest - everything in one place',
    chosenByProfessionals: 'Chosen by Professionals',
    chosenDesc: 'Tools and equipment that withstand Icelandic weather',
    
    // Buttons
    getProposal: 'Get Solution Proposal',
    contactUs: 'Contact Us',
    learnMore: 'Learn More',
    
    // Footer
    allRightsReserved: 'All rights reserved',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    next: 'Next',
    previous: 'Previous',
    back: 'Back',
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
