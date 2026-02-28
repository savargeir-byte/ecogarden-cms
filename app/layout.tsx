import Navbar from "@/components/Navbar";
import EditToggle from "@/components/EditToggle";
import "./globals.css";
import type { Metadata } from "next";

const BASE_URL = 'https://eccogarden.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Eco Garden – Garðlausnir fyrir íslenskar aðstæður',
    template: '%s – Eco Garden',
  },
  description: 'Vistvænar garðlausnir, gróðurhús og landbúnaðarvörur – 50+ ára reynsla í íslenskri garðyrkju.',
  keywords: ['eco garden', 'garðyrkja', 'ísland', 'gróðurhús', 'landbúnaður', 'garðvörur', 'garðlausnir'],
  authors: [{ name: 'Eco Garden' }],
  creator: 'Eco Garden',
  publisher: 'Eco Garden',
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: { url: '/favicon.png', type: 'image/png' },
    shortcut: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'is_IS',
    url: BASE_URL,
    siteName: 'Eco Garden',
    title: 'Eco Garden – Garðlausnir fyrir íslenskar aðstæður',
    description: 'Vistvænar garðlausnir, gróðurhús og landbúnaðarvörur – 50+ ára reynsla í íslenskri garðyrkju.',
    images: [{
      url: 'https://static.wixstatic.com/media/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg/v1/fill/w_1200,h_630,al_c,q_90/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Eco Garden – Garðyrkja',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eco Garden – Garðlausnir fyrir íslenskar aðstæður',
    description: 'Vistvænar garðlausnir, gróðurhús og landbúnaðarvörur – 50+ ára reynsla.',
    images: ['https://static.wixstatic.com/media/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg/v1/fill/w_1200,h_630,al_c,q_90/og-image.jpg'],
  },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Eco Garden',
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+354-487-8910',
    contactType: 'customer service',
    areaServed: 'IS',
    availableLanguage: ['Icelandic', 'English'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Lambhagavegur 9',
    addressLocality: 'Reykjavík',
    postalCode: '110',
    addressCountry: 'IS',
  },
  sameAs: [
    'https://www.facebook.com/Eco-Garden-104951408186641',
    'https://www.linkedin.com/company/eco-garden-island',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="is" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {/* Navbar */}
        <Navbar />

        <main className="flex-1">{children}</main>
        <EditToggle />

        <footer className="bg-gray-900 text-white mt-8">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                {/* [76] FOOTER — Nafn og tagline ("Vistvænar lausnir...") */}
                <h3 className="text-base font-bold mb-2">Eco Garden</h3>
                <p className="text-gray-400 text-xs mb-4">Vistvænar lausnir fyrir garð og ræktun</p>
                <div className="flex items-center gap-3">
                  <a href="https://www.facebook.com/ecogarden.is" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/ecogarden.is" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/@ecogarden" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 hover:text-white transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <div>                {/* [100] FOOTER — Flýtileðir: Heim / Vörur / Um okkur / Hafa samband */}                <h4 className="font-semibold mb-2 text-xs">Flýtileiðir</h4>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li><a href="/" className="hover:text-white transition">Heim</a></li>
                  <li><a href="/products" className="hover:text-white transition">Vörur</a></li>
                  <li><a href="/about" className="hover:text-white transition">Um okkur</a></li>
                  <li><a href="/contact" className="hover:text-white transition">Hafa samband</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-xs">Hafðu samband</h4>
                <p className="text-gray-400 text-xs">Sendu okkur skilboð</p>
                <a href="/contact" className="inline-block mt-2 px-4 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition">
                  Hafa samband
                </a>
              </div>
            </div>
            {/* [77] FOOTER — Copyright texti (árstal, nafn) */}
            <div className="border-t border-gray-800 mt-5 pt-4 text-center text-gray-400 text-xs">
              © 2026 Eco Garden. Allur réttur áskilinn.
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
