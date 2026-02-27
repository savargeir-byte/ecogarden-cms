import { client } from '@/sanity/lib/client'
import { categoryWithChildrenQuery } from '@/sanity/lib/queries'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await client.fetch(categoryWithChildrenQuery, {
    slug,
  })

  if (!category) {
    notFound()
  }

  // Build breadcrumbs
  const breadcrumbs = []
  let current = category
  while (current) {
    breadcrumbs.unshift(current)
    current = current.parent
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-50 to-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 1 && (
            <nav className="mb-6 text-sm">
              <ol className="flex items-center gap-2 flex-wrap">
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 hover:text-green-600 transition"
                  >
                    Heim
                  </Link>
                </li>
                {breadcrumbs.map((bc, i) => (
                  <li key={bc._id} className="flex items-center gap-2">
                    <span className="text-gray-400">→</span>
                    {i === breadcrumbs.length - 1 ? (
                      <span className="font-semibold text-gray-900">
                        {bc.title_is}
                      </span>
                    ) : (
                      <Link
                        href={`/flokkar/${bc.slug}`}
                        className="text-green-600 hover:text-green-700 transition"
                      >
                        {bc.title_is}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Title */}
          <div className="flex items-center gap-4 mb-4">
            {category.icon && (
              <div className="text-6xl">{category.icon}</div>
            )}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {category.title_is}
              </h1>
              {category.description_is && (
                <p className="text-xl text-gray-600 mt-2">
                  {category.description_is}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Undirflokkar */}
        {category.children && category.children.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Undirflokkar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.children.map((child: any) => (
                <Link
                  key={child._id}
                  href={`/flokkar/${child.slug}`}
                  className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-green-500 hover:shadow-lg transition-all duration-300"
                >
                  {child.icon && (
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                      {child.icon}
                    </div>
                  )}
                  {child.image && (
                    <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={child.image}
                        alt={child.title_is}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition">
                    {child.title_is}
                  </h3>
                  {child.description_is && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {child.description_is}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-2 text-green-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Skoða
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Vörur */}
        {category.products && category.products.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Vörur</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Engar vörur eða undirflokkar */}
        {(!category.children || category.children.length === 0) &&
          (!category.products || category.products.length === 0) && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Engar vörur enn
              </h3>
              <p className="text-gray-600 mb-8">
                Við erum að vinna að því að bæta við vörum í þennan flokk.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Til baka á forsíðu
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </Link>
            </div>
          )}
      </div>
    </div>
  )
}
