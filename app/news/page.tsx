import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { allNewsQuery } from '@/sanity/lib/queries';
import NewsImage from '@/components/NewsImage';

interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string | null;
  mainImage: string | null;
}

export const revalidate = 60;

export default async function NewsPage() {
  const news: NewsItem[] = await client.fetch(allNewsQuery);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 py-20 px-6 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Fréttir</h1>
        <p className="text-green-100 text-lg max-w-xl mx-auto">
          Nýjustu fréttir og tilkynningar frá Eco Garden
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {news.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-20">
            Engar fréttir til að sýna.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <Link
                key={item._id}
                href={`/news/${item.slug}`}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative h-52 bg-gray-100 overflow-hidden">
                  <NewsImage src={item.mainImage} alt={item.title} />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {item.publishedAt && (
                    <p className="text-sm text-green-600 font-medium mb-2">
                      {new Date(item.publishedAt).toLocaleDateString('is-IS', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors leading-snug">
                    {item.title}
                  </h2>
                  <div className="mt-auto pt-4 flex items-center gap-1 text-green-600 font-semibold text-sm">
                    Lesa meira
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
