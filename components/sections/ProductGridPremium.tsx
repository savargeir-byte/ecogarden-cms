export default function ProductGridPremium({ products }: any) {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((p: any) => (
          <div 
            key={p.id} 
            className="border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <div className="aspect-square mb-4 overflow-hidden rounded-lg">
              <img 
                src={p.image} 
                alt={p.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{p.subtitle || p.description}</p>
            <a 
              href={`/products/${p.slug || p.id}`}
              className="text-green-700 hover:text-green-800 font-medium inline-flex items-center"
            >
              View product
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
