import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

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
