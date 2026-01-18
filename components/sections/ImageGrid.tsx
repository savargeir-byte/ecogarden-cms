'use client';

import Link from 'next/link';
import SmartImage from '../SmartImage';
import TiltCard from '../TiltCard';
import IntersectionAnimate from '../IntersectionAnimate';
import { useTranslation } from '@/hooks/useTranslation';

interface ImageGridProps {
  data: {
    heading?: string;
    heading_en?: string;
    items: Array<{
      image: string;
      title: string;
      title_en?: string;
      subtitle?: string;
      subtitle_en?: string;
      link: string;
      subcategories?: string[];
      subcategories_en?: string[];
    }>;
  };
}

export default function ImageGrid({ data }: ImageGridProps) {
  const { t, language } = useTranslation();
  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  const heading = language === 'en' 
    ? (data.heading_en || data.heading)
    : data.heading;

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {heading && (
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4">
              {heading}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full" />
          </div>
        )}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item, i) => {
            const title = language === 'en' ? (item.title_en || item.title) : item.title;
            const subtitle = language === 'en' ? (item.subtitle_en || item.subtitle) : item.subtitle;
            const subcategories = language === 'en' ? (item.subcategories_en || item.subcategories) : item.subcategories;
            
            return (
            <IntersectionAnimate 
              key={i}
              animation="slide-up" 
              delay={i * 100}
              duration={700}
            >
              <TiltCard maxTilt={10} scale={1.03}>
                <Link
                  href={item.link}
                  className="group relative h-[28rem] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 block"
                >
              {/* Background Image with dramatic zoom and rotate */}
              <SmartImage
                src={item.image}
                alt={title}
                width={800}
                height={400}
                className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 group-hover:brightness-110 transition-all duration-700 ease-out"
              />
              
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-500" />
              
              {/* Glowing border on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-2xl ring-2 ring-green-400/50" />
              </div>
              
              {/* Text Content with enhanced animations */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white transform group-hover:-translate-y-2 transition-all duration-500">
                {/* Title with glow effect */}
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 group-hover:text-green-400 transition-all duration-300 drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
                  {title}
                </h3>
                
                {subtitle && (
                  <p className="text-base sm:text-lg text-gray-200 group-hover:text-white transition-colors duration-300 mb-4 leading-relaxed">
                    {subtitle}
                  </p>
                )}
                
                {/* Subcategories with stagger animation */}
                {subcategories && subcategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {subcategories.map((sub, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white/80 border border-white/20 group-hover:bg-green-500/30 group-hover:border-green-400/50 group-hover:text-white transition-all duration-300 hover:scale-110"
                        style={{ transitionDelay: `${idx * 50}ms` }}
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Arrow indicator with bounce */}
                <div className="flex items-center text-green-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                  <span className="text-sm font-bold tracking-wide">{t('viewMore')}</span>
                  <svg 
                    className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              
              {/* Animated shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              </div>
                </Link>
              </TiltCard>
            </IntersectionAnimate>
          );
          })}
        </div>
      </div>
    </section>
  );
}
