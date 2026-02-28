import Navbar from "@/components/Navbar";
import EditToggle from "@/components/EditToggle";
import Footer from "@/components/Footer";
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
        <Footer />

      </body>
    </html>
  );
}
