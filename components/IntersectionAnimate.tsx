'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface IntersectionAnimateProps {
  children: ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'zoom';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export default function IntersectionAnimate({
  children,
  animation = 'fade',
  delay = 0,
  duration = 600,
  threshold = 0.2,
  className = ''
}: IntersectionAnimateProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold]);

  const getAnimationClass = () => {
    const baseClasses = 'transition-all';
    const notVisibleClasses = {
      fade: 'opacity-0',
      'slide-up': 'opacity-0 translate-y-12',
      'slide-left': 'opacity-0 translate-x-12',
      'slide-right': 'opacity-0 -translate-x-12',
      zoom: 'opacity-0 scale-95'
    };
    const visibleClasses = {
      fade: 'opacity-100',
      'slide-up': 'opacity-100 translate-y-0',
      'slide-left': 'opacity-100 translate-x-0',
      'slide-right': 'opacity-100 translate-x-0',
      zoom: 'opacity-100 scale-100'
    };

    return `${baseClasses} ${isVisible ? visibleClasses[animation] : notVisibleClasses[animation]}`;
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClass()} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}
