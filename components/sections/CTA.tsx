interface CTAProps {
  data: {
    heading?: string;
    description?: string;
    text?: string;
    buttonText?: string;
    buttonLink?: string;
    link?: string;
  };
}

export default function CTA({ data }: CTAProps) {
  // Safety check for undefined data
  if (!data) {
    return null;
  }
  
  const buttonLabel = data.buttonText || data.text;
  const buttonUrl = data.buttonLink || data.link;

  if (!buttonLabel || !buttonUrl) return null;

  return (
    <section className="py-6 sm:py-8 text-center bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-xl mx-auto px-4 sm:px-6 relative z-10">
        {data.heading && (
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 leading-tight animate-fade-in">
            {data.heading}
          </h2>
        )}
        {data.description && (
          <p className="text-xs sm:text-sm mb-4 text-green-100 max-w-md mx-auto">
            {data.description}
          </p>
        )}
        <a
          href={buttonUrl}
          className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg bg-white text-green-700 font-semibold text-xs sm:text-sm hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-md"
        >
          {buttonLabel}
        </a>
      </div>
    </section>
  );
}
