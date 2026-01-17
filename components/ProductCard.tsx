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
      className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative z-10"
    >
      {/* Product Image */}
      <div className="relative h-80 overflow-hidden bg-gray-100">
        <SmartImage
          src={mainImage}
          alt={product.title}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {product.category && (
          <span className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
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
          <p className="text-gray-600 line-clamp-2 mb-4 text-base">
            {product.description}
          </p>
        )}

        {product.price && (
          <p className="text-2xl font-bold text-green-700 mb-4">
            {product.price.toLocaleString('is-IS')} kr.
          </p>
        )}
        
        <div className="flex items-center text-green-600 font-semibold group-hover:gap-2 transition-all">
          Skoða vöru
          <span className="inline-block group-hover:translate-x-2 transition-transform duration-300">→</span>
        </div>
      </div>
    </Link>
  );
}
