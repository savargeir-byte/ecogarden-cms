export default function Features({ data }: any) {
  // Safety check for undefined data
  if (!data) {
    return null;
  }
  
  // Support both 'features' and 'items' properties
  const featureList = data.features || data.items || [];
  
  if (featureList.length === 0) {
    return null;
  }
  
  return (
    <section className="py-20 bg-white" aria-label="Features section">
      <div className="max-w-7xl mx-auto px-6">
        {data.heading && (
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 text-gray-900">
            {data.heading}
          </h2>
        )}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {featureList.map((item: any, i: number) => (
            <article key={i} className="text-center group hover:scale-105 transition-transform duration-300" role="listitem">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center text-4xl group-hover:bg-green-200 transition-colors" aria-hidden="true">
                {item.icon || "✨"}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{item.description || item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
