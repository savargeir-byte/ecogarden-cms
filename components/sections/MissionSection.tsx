'use client';

import { useTranslation } from '@/hooks/useTranslation';
import IntersectionAnimate from '@/components/IntersectionAnimate';
import TextReveal from '@/components/TextReveal';

export default function MissionSection() {
  const { t } = useTranslation();

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,197,94,0.06),transparent_50%)] animate-pulse [animation-duration:4s]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(34,197,94,0.06),transparent_50%)] animate-pulse [animation-duration:3s]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <IntersectionAnimate animation="fade" duration={800}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-green-500 rounded-full" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight text-center max-w-4xl mx-auto">
              <TextReveal text={t('missionHeading').split(' ').slice(0, -3).join(' ') + ' '} speed={40} />
              <span className="text-green-600 relative inline-block hover:scale-105 transition-transform duration-300">
                <TextReveal text={t('missionHeading').split(' ').slice(-3).join(' ')} speed={40} delay={1200} />
                <span className="absolute bottom-0 left-0 w-full h-1 bg-green-400/30 rounded-full" />
              </span>
            </h2>
            <div className="h-1 w-12 bg-gradient-to-l from-transparent to-green-500 rounded-full" />
          </div>
          
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed mb-6 text-center">
            {t('missionText')}
          </p>
          
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto text-center">
            {t('missionDesc')}
          </p>
        </IntersectionAnimate>
      </div>
    </section>
  );
}
