import type { Metadata } from 'next';

const BASE_URL = 'https://eccogarden.vercel.app';

export const metadata: Metadata = {
  title: 'Hafa samband',
  description: 'Hafðu samband við Eco Garden – Lambhagavegur 9, 110 Reykjavík. Sími: 487-8910. Sendu okkur fyrirspurn eða fáðu ókeypis ráðgjöf.',
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: 'Hafa samband – Eco Garden',
    description: 'Hafðu samband við Eco Garden. Sími: 487-8910 | oli@eco-garden.is',
    url: `${BASE_URL}/contact`,
    images: [{
      url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1200&q=80',
      width: 1200, height: 630, alt: 'Hafa samband – Eco Garden',
    }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
