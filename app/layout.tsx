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
  logo: `${BASE_URL}/favicon.ico`,
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
                <p className="text-gray-400 text-xs">Vistvænar lausnir fyrir garð og ræktun</p>
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
              © 2024 Eco Garden. Allur réttur áskilinn.
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
