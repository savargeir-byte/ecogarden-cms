import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

export const revalidate = 60;

interface ProductsPageProps {
  searchParams: {
    q?: string;
    cat?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const search = searchParams.q || "";
  const category = searchParams.cat || "";

  // Get categories
  const { data: categories } = await supabase
    .from("product_categories")
    .select("*")
    .order("name");

  // Get products
  let query = supabase
    .from("products")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }
  if (category) {
    query = query.eq("category", category);
  }

  const { data: products } = await query;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-br from-green-600 to-green-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">Vörur</h1>
            <p className="text-xl text-green-100">
              Hágæða vistvænar garðvörur frá Eco Garden
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Category Filter */}
        {categories && categories.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-3">
            <Link
              href="/products"
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                !category
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Allar vörur
            </Link>
            {categories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/products?cat=${cat.name}`}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  category === cat.name
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {(!products || products.length === 0) && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">
              {search || category ? 'Engar vörur fundust' : 'Engar vörur enn'}
            </p>
            {(search || category) && (
              <Link
                href="/products"
                className="inline-block mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
              >
                Sjá allar vörur
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
