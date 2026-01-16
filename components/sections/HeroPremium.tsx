export default function HeroPremium({ title, subtitle, image, ctaText, ctaLink }: any) {
  return (
    <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 py-24 px-6">
      <div className="flex flex-col justify-center">
        <h1 className="text-5xl font-bold leading-tight">{title}</h1>
        <p className="mt-6 text-lg text-gray-600">{subtitle}</p>
        <a 
          href={ctaLink || '#'}
          className="mt-8 inline-block bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition text-center font-medium"
        >
          {ctaText || 'Shop now'}
        </a>
      </div>
      <div className="relative">
        <img src={image} alt={title} className="rounded-xl shadow-2xl w-full h-auto" />
      </div>
    </section>
  );
}
