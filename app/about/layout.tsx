import type { Metadata } from 'next';

const BASE_URL = 'https://eccogarden.vercel.app';

export const metadata: Metadata = {
  title: 'Um okkur',
  description: 'Eco Garden – 50+ ára reynsla í garðyrkju og landbúnaði á Íslandi. Við hönnum og segjum lausnir fyrir íslenskar aðstæður.',
  alternates: { canonical: `${BASE_URL}/about` },
  openGraph: {
    title: 'Um okkur – Eco Garden',
    description: 'Eco Garden – 50+ ára reynsla í garðyrkju. Ókeypis ráðgjöf frá sérfræðingum.',
    url: `${BASE_URL}/about`,
    images: [{
      url: 'https://static.wixstatic.com/media/nsplsh_b06e8f2ce3384bcb94d5404d439f0bf6~mv2.jpg/v1/fill/w_1200,h_630,al_c,q_90/og-image.jpg',
      width: 1200, height: 630, alt: 'Um okkur – Eco Garden',
    }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
