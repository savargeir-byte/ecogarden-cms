import ProductPage from "@/components/ProductPage";
import { getProductBySlug, products } from "@/lib/products";
import type { Metadata } from "next";

const BASE_URL = 'https://eccogarden.vercel.app';

export const revalidate = false; // fully static

interface ProductPageProps {
  params: {
    slug: string;
  };
  searchParams?: {
    preview?: string;
  };
}

// Pre-generate all product pages at build time
export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

// SEO Metadata
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Vara finnst ekki",
      description: "Varan sem þú ert að leita að er ekki til.",
    };
  }

  return {
    title: `${product.title} – Eco Garden`,
    description: product.description,
    alternates: { canonical: `${BASE_URL}/products/${product.slug}` },
    openGraph: {
      title: `${product.title} – Eco Garden`,
      description: product.description,
      url: `${BASE_URL}/products/${product.slug}`,
      images: product.images?.[0] ? [{ url: product.images[0], width: 1200, height: 630, alt: product.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} – Eco Garden`,
      description: product.description,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default function Product({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Vara fannst ekki</h1>
        <p className="text-gray-600 mb-8">Varan sem þú leitar að er ekki til.</p>
        <a
          href="/products"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
        >
          ← Til baka í vörulista
        </a>
      </div>
    );
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images?.[0] || product.image,
    url: `${BASE_URL}/products/${product.slug}`,
    brand: { '@type': 'Brand', name: 'Eco Garden' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'ISK',
      price: product.price ?? 0,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Eco Garden' },
    },
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductPage product={product} />
    </main>
  );
}

