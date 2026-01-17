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
    <section className="py-16 sm:py-20 lg:py-24 text-center bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {data.heading && (
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            {data.heading}
          </h2>
        )}
        {data.description && (
          <p className="text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 text-green-100 max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>
        )}
        <a
          href={buttonUrl}
          className="inline-block px-8 sm:px-10 py-3 sm:py-4 rounded-lg bg-white text-green-700 font-bold text-base sm:text-lg hover:bg-green-50 transition-all shadow-2xl hover:scale-105"
        >
          {buttonLabel}
        </a>
      </div>
    </section>
  );
}
