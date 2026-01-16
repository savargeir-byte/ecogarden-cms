import SmartImage from "../SmartImage";

export default function ImageGallery({ data }: any) {
  if (!Array.isArray(data)) return null;

  return (
    <section className="bg-white" aria-label="Image gallery">
      <div className="container">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item: any, i: number) => (
            <figure key={i} className="group">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                <SmartImage
                  src={item.url}
                  alt={item.caption || `Gallery image ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {item.caption && (
                <figcaption className="mt-2 text-sm text-gray-600 text-center">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
