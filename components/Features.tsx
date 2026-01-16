export default function Features() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <Feature title="Sjálfbærni" />
        <Feature title="Gæði" />
        <Feature title="Reynsla" />
      </div>
    </section>
  );
}

function Feature({ title }: { title: string }) {
  return (
    <div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-600 mt-2">
        Texti sem kemur úr CMS
      </p>
    </div>
  );
}
