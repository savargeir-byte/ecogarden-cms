'use client';

import { useTranslation } from '@/hooks/useTranslation';
import NumberCounter from '@/components/NumberCounter';

export default function StatsSection() {
  const { t } = useTranslation();

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-800" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('statsHeading')}
          </h2>
          <p className="text-lg sm:text-xl text-green-100 max-w-2xl mx-auto">
            {t('statsSubheading')}
          </p>
        </div>

        <div className="grid gap-8 sm:gap-12 md:grid-cols-3 text-center text-white">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-300" />
            <div className="relative p-8 sm:p-10">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-3 text-green-300">
                <NumberCounter end={200} duration={2000} suffix="+" />
              </div>
              <p className="text-xl font-semibold mb-2">{t('projects')}</p>
              <p className="text-green-100 text-sm">{t('projectsDesc')}</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-300" />
            <div className="relative p-8 sm:p-10">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-3 text-green-300">
                <NumberCounter end={50} duration={2000} suffix="+" />
              </div>
              <p className="text-xl font-semibold mb-2">{t('yearsExperience')}</p>
              <p className="text-green-100 text-sm">{t('yearsDesc')}</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-white/5 rounded-3xl transform group-hover:scale-105 transition-transform duration-300" />
            <div className="relative p-8 sm:p-10">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-3 text-green-300">
                <NumberCounter end={95} duration={2000} suffix="%" />
              </div>
              <p className="text-xl font-semibold mb-2">{t('satisfaction')}</p>
              <p className="text-green-100 text-sm">{t('satisfactionDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
