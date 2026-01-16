import Link from 'next/link';
import SmartImage from './SmartImage';

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    title: string;
    category?: string;
    description?: string;
    image?: string;
    price?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.image || '/placeholder-product.jpg';
  
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="relative h-72 overflow-hidden bg-gray-100">
        <SmartImage
          src={mainImage}
          alt={product.title}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.category && (
          <span className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {product.category}
          </span>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
          {product.title}
        </h3>
        
        {product.description && (
          <p className="text-gray-600 line-clamp-2 mb-4">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center text-green-600 font-semibold group-hover:gap-2 transition-all mt-4">
          Sjá nánar 
          <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}
