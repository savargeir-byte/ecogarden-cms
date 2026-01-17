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
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-green-50/30" aria-label="Features section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {data.heading && (
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-10 lg:mb-14 text-gray-900 animate-fade-in">
            {data.heading}
          </h2>
        )}
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {featureList.map((item: any, i: number) => (
            <article 
              key={i} 
              className="group bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center animate-slide-up" 
              style={{ animationDelay: `${i * 100}ms` }}
              role="listitem"
            >
              <div className="w-16 h-16 mx-auto mb-4 text-5xl sm:text-6xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                {item.icon || "✨"}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">{item.description || item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
