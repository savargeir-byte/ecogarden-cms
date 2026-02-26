import { Suspense } from 'react';
import ProductsClient from './ProductsClient';
import type { Metadata } from 'next';

const BASE_URL = 'https://eccogarden.vercel.app';

export const metadata: Metadata = {
  title: 'Vörur',
  description: 'Garðyrkju- og landbúnaðarvörur – gróðurhús, varmastýring, ræktunarlausnir og fleira. Valdar af fagfólki með 50+ ára reynslu.',
  alternates: { canonical: `${BASE_URL}/products` },
  openGraph: {
    title: 'Vörur – Eco Garden',
    description: 'Garðyrkju- og landbúnaðarvörur – gróðurhús, varmastýring, ræktunarlausnir og fleira.',
    url: `${BASE_URL}/products`,
  },
};

export const dynamic = 'force-dynamic';

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Hleð...</p>
        </div>
      </div>
    }>
      <ProductsClient />
    </Suspense>
  );
}
