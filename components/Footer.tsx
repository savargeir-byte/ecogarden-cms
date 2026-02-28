import Link from 'next/link';
import Image from 'next/image';

const PARTNERS = [
  {
    src: '/images/logo_samstarf/bioret logo.png',
    alt: 'Bioret Agri',
    href: 'https://www.bioret-agri.com',
    desc: 'Búnaður fyrir nautgriparækt',
  },
  {
    src: '/images/logo_samstarf/619b854585a3c96022ce386b_HATO_Logo_RGB.png',
    alt: 'HATO Lighting',
    href: 'https://www.hato.lighting',
    desc: 'LED vaxtarljós',
  },
  {
    src: '/images/logo_samstarf/VAN-HESSCHE-BETON-logo-zonder-achtergrond-300x212.png',
    alt: 'Van Hessche Beton',
    href: 'https://www.vanhessche.be',
    desc: 'Steypugrindverk',
  },
  {
    src: '/images/logo_samstarf/Mollerup-Moelle.jpg',
    alt: 'Mollerup Mølle',
    href: 'https://www.mollerupmolle.dk',
    desc: 'Sáðvörur og áburður',
  },
  {
    src: '/images/logo_samstarf/MTczMDM3NzI5MjY3MjM3NjRjNzkyNmQ=.png',
    alt: 'Samstarfsaðili',
    href: '#',
    desc: '',
  },
  {
    src: '/images/logo_samstarf/5eb2958f5b00004ba115f00c.webp',
    alt: 'Samstarfsaðili',
    href: '#',
    desc: '',
  },
];

const CERTIFICATIONS = [
  {
    icon: '🌿',
    label: 'Vistvænt',
    sub: 'Umhverfisvænar lausnir',
  },
  {
    icon: '🏆',
    label: '50+ ára reynsla',
    sub: 'Fagþekking í garðyrkju',
  },
  {
    icon: '🇮🇸',
    label: 'Íslenskt fyrirtæki',
    sub: 'Þjónusta um allt land',
  },
  {
    icon: '🤝',
    label: 'Fagleg ráðgjöf',
    sub: 'Ókeypis ráðgjöf til kaupenda',
  },
];

const QUICK_LINKS = [
  { href: '/',        label: 'Heim' },
  { href: '/products', label: 'Vörur' },
  { href: '/about',   label: 'Um okkur' },
  { href: '/news',    label: 'Fréttir' },
  { href: '/video',   label: 'Vídeó' },
  { href: '/contact', label: 'Hafa samband' },
];

const SUPPLIERS = [
  {
    name: 'Mollerup Mølle',
    href: 'https://www.mollerupmolle.dk',
    logo: '/images/logo_samstarf/Mollerup-Moelle.jpg',
    desc: 'Einn af fremstu framleiðendum sáðvara og áburðar í Evrópu. Eco Garden er opinber dreifingaraðili á Íslandi.',
    country: '🇩🇰 Danmörk',
  },
  {
    name: 'HATO Lighting',
    href: 'https://www.hato.lighting',
    logo: '/images/logo_samstarf/619b854585a3c96022ce386b_HATO_Logo_RGB.png',
    desc: 'Leiðandi í LED vaxtarljósum fyrir gróðurhús. Hollsk tækni með sönnuð áhrif á uppskeru.',
    country: '🇳🇱 Holland',
  },
  {
    name: 'Bioret Agri',
    href: 'https://www.bioret-agri.com',
    logo: '/images/logo_samstarf/bioret logo.png',
    desc: 'Framleiðandi sérhæfðs búnaðar fyrir nautgriparækt og matvælaöryggi í gróðurhúsum.',
    country: '🇫🇷 Frakkland',
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">

      {/* ── Certifications bar ─────────────────────────────── */}
      <div className="border-b border-white/5 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.label} className="flex items-start gap-3">
                <span className="text-3xl leading-none">{cert.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{cert.label}</p>
                  <p className="text-xs text-gray-400 leading-snug mt-0.5">{cert.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Partner logos ──────────────────────────────────── */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 text-center mb-6">
            Samstarfsaðilar okkar
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {PARTNERS.map((p) => (
              <a
                key={p.src}
                href={p.href}
                target={p.href !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                title={p.alt}
                className="flex items-center justify-center h-14 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  className="max-h-14 max-w-[140px] object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Supplier spotlight ─────────────────────────────── */}
      <div className="border-b border-white/5 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6">
            Birgðar okkar
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SUPPLIERS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 rounded-xl border border-white/5 bg-white/3 hover:bg-white/8 hover:border-green-500/30 p-5 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={s.logo}
                      alt={s.name}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.country}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
                <span className="text-xs text-green-500 group-hover:text-green-400 flex items-center gap-1 mt-auto">
                  Skoða →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main footer columns ────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <img src="/logo.svg" alt="Eco Garden" className="h-10 mb-4 brightness-0 invert" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              Vistvænar garðlausnir, gróðurhús og landbúnaðarvörur. Við erum ráðgjafar og dreifingaraðilar
              leiðandi evrópskra framleiðenda á Íslandi.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/ecogarden.is" target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-green-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/ecogarden.is" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-pink-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@ecogarden" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-red-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Flýtileiðir</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-flex transition-all duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Hafðu samband</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <a href="tel:+3544878910" className="hover:text-white transition">+354 487 8910</a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <a href="mailto:info@eco-garden.is" className="hover:text-white transition">info@eco-garden.is</a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>Selfoss, Ísland</span>
              </li>
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 mt-5 px-4 py-2 rounded-lg text-xs font-semibold bg-green-600 hover:bg-green-500 text-white transition-colors duration-200"
            >
              Senda fyrirspurn →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Copyright ─────────────────────────────────────── */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} Eco Garden. Allur réttur áskilinn.</span>
          <span className="flex items-center gap-4">
            <Link href="/about" className="hover:text-gray-400 transition">Um okkur</Link>
            <Link href="/contact" className="hover:text-gray-400 transition">Persónuvernd</Link>
          </span>
        </div>
      </div>

    </footer>
  );
}
