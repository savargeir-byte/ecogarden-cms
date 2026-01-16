interface Feature {
  title: string;
  description: string;
}

interface FeatureListProps {
  data: Feature[];
}

export default function FeatureList({ data }: FeatureListProps) {
  if (!Array.isArray(data)) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {data.map((feature, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
