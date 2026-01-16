import ProductPage from "@/components/ProductPage";
import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";

export const revalidate = 60;

interface ProductPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    preview?: string;
  };
}

// SEO Metadata Generation
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { data: product } = await supabase
    .from("products")
    .select("seo, title")
    .eq("slug", params.slug)
    .eq("status", "published")
    .single();

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you're looking for doesn't exist."
    };
  }

  const seo = product.seo || {};

  return {
    title: seo.title || product.title || "Eco Garden",
    description: seo.description || "",
    openGraph: {
      title: seo.title || product.title,
      description: seo.description || "",
      images: seo.image ? [seo.image] : []
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title || product.title,
      description: seo.description || "",
      images: seo.image ? [seo.image] : []
    }
  };
}

export default async function Product({ params, searchParams }: ProductPageProps) {
  const preview = searchParams?.preview === "true";

  // Log view
  await supabase.from("product_views").insert({
    slug: params.slug,
    user_agent: "server"
  });

  // Get product
  let query = supabase
    .from("products")
    .select("*")
    .eq("slug", params.slug);

  if (!preview) {
    query = query.eq("status", "published");
  }

  const { data: product } = await query.single();

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Vara fannst ekki</h1>
        <p className="text-gray-600 mb-8">Varan sem þú leitar að er ekki til.</p>
        <a
          href="/products"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          ← Til baka í vörulista
        </a>
      </div>
    );
  }

  return (
    <main className="bg-white">
      {preview && (
        <div className="bg-yellow-100 border-b border-yellow-300 text-yellow-900 px-4 py-3 text-center font-medium">
          👀 Preview Mode - Viewing {product.status} content
        </div>
      )}
      
      <ProductPage product={product} />
    </main>
  );
}
