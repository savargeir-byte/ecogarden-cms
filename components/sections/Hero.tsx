import SmartImage from "../SmartImage";

interface HeroProps {
  data: {
    title?: string;
    heading?: string;
    subtitle?: string;
    text?: string;
    image?: string;
    imageAlt?: string;
    ctaText?: string;
    ctaLink?: string;
  };
}

export default function Hero({ data }: HeroProps) {
  // Safety check for undefined data
  if (!data) {
    return null;
  }
  
  const mainTitle = data.title || data.heading;
  const subText = data.subtitle || data.text;

  return (
    <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image */}
      {data.image && (
        <div className="absolute inset-0">
          <SmartImage
            src={data.image}
            alt={data.imageAlt || mainTitle || "Hero image"}
            width={1920}
            height={700}
            className="w-full h-full object-cover"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            {mainTitle && (
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-white leading-tight drop-shadow-2xl">
                {mainTitle}
              </h1>
            )}
            {subText && (
              <p className="text-xl lg:text-2xl text-white mb-8 leading-relaxed drop-shadow-lg">
                {subText}
              </p>
            )}
            {data.ctaText && data.ctaLink && (
              <a
                href={data.ctaLink}
                className="inline-block px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl text-lg"
              >
                {data.ctaText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
