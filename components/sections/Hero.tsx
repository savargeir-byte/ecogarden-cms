'use client';

import { useEffect, useState } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Safety check for undefined data
  if (!data) {
    return null;
  }
  
  const mainTitle = data.title || data.heading;
  const subText = data.subtitle || data.text;

  return (
    <section className={`relative overflow-hidden transition-all duration-500 ${
      scrolled ? 'h-[300px] sm:h-[350px] lg:h-[400px]' : 'h-[500px] sm:h-[600px] lg:h-[700px]'
    }`}>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className={`max-w-3xl transition-all duration-500 ${scrolled ? 'scale-90 opacity-80' : 'scale-100 opacity-100'}`}>
            {mainTitle && (
              <h1 className={`font-bold tracking-tight text-white leading-tight drop-shadow-2xl transition-all duration-500 ${
                scrolled 
                  ? 'text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3' 
                  : 'text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-4 sm:mb-6'
              }`}>
                {mainTitle}
              </h1>
            )}
            {subText && !scrolled && (
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-6 sm:mb-8 leading-relaxed drop-shadow-lg max-w-2xl transition-opacity duration-500">
                {subText}
              </p>
            )}
            {data.ctaText && data.ctaLink && !scrolled && (
              <a
                href={data.ctaLink}
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl text-base sm:text-lg hover:scale-102"
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
