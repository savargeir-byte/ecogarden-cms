import Link from 'next/link';
import SmartImage from '../SmartImage';

interface ImageGridProps {
  data: {
    heading?: string;
    items: Array<{
      image: string;
      title: string;
      subtitle?: string;
      link: string;
    }>;
  };
}

export default function ImageGrid({ data }: ImageGridProps) {
  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {data.heading && (
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 text-gray-900">
            {data.heading}
          </h2>
        )}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.items.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className="group relative h-96 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Background Image with dramatic zoom */}
              <SmartImage
                src={item.image}
                alt={item.title}
                width={800}
                height={400}
                className="w-full h-full object-cover group-hover:scale-125 group-hover:brightness-110 transition-all duration-700 ease-out"
              />
              
              {/* Dark Overlay that lightens on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/60 group-hover:via-black/20 transition-all duration-500" />
              
              {/* Text Content with slide up effect */}
              <div className="absolute bottom-0 left-0 p-8 text-white transform group-hover:-translate-y-2 transition-transform duration-500">
                <h3 className="text-3xl font-bold mb-2 group-hover:text-green-400 transition-colors duration-300">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-lg text-gray-200 group-hover:text-white transition-colors duration-300">{item.subtitle}</p>
                )}
                {/* Arrow indicator */}
                <div className="mt-4 flex items-center text-green-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-sm font-semibold">Explore our range</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
