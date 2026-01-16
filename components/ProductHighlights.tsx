export default function ProductHighlights() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-3xl font-semibold mb-10">Vörur</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-xl p-4">
            <div className="h-40 bg-gray-100 rounded mb-4" />
            <h3 className="font-medium">Eco Garden vara</h3>
            <p className="text-sm text-gray-600">
              Stutt lýsing úr CMS
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
