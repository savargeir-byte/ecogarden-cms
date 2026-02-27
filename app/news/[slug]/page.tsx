import { notFound } from 'next/navigation';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { newsBySlugQuery, allNewsQuery } from '@/sanity/lib/queries';

interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string | null;
  mainImage: string | null;
  body: unknown;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const news: { slug: string }[] = await client.fetch(allNewsQuery);
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item: NewsItem | null = await client.fetch(newsBySlugQuery, { slug });
  return {
    title: item?.title ?? 'Frétt',
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item: NewsItem | null = await client.fetch(newsBySlugQuery, { slug });

  if (!item) notFound();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Back link */}
      <div className="max-w-3xl mx-auto px-6 pt-10">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Til baka í fréttir
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-6 pb-20">
        {/* Main image */}
        {item.mainImage && (
          <div className="rounded-2xl overflow-hidden mb-8 shadow-md">
            <img
              src={item.mainImage}
              alt={item.title}
              className="w-full h-72 object-cover"
            />
          </div>
        )}

        {/* Date */}
        {item.publishedAt && (
          <p className="text-sm text-green-600 font-medium mb-3">
            {new Date(item.publishedAt).toLocaleDateString('is-IS', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
          {item.title}
        </h1>
      </article>
    </main>
  );
}
