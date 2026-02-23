import ProductPage from "@/components/ProductPage";
import { getProductBySlug, products } from "@/lib/products";
import type { Metadata } from "next";

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
    openGraph: {
      title: `${product.title} – Eco Garden`,
      description: product.description,
      images: product.images?.[0] ? [product.images[0]] : [],
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

  return (
    <main className="bg-white">
      <ProductPage product={product} />
    </main>
  );
}

