'use client';

import { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  type?: 'word' | 'char';
}

export default function TextReveal({ 
  text, 
  delay = 0, 
  speed = 50,
  className = '',
  type = 'word'
}: TextRevealProps) {
  const [visibleContent, setVisibleContent] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          setTimeout(() => {
            const content = type === 'word' ? text.split(' ') : text.split('');
            let index = 0;

            const interval = setInterval(() => {
              if (index < content.length) {
                setVisibleContent(prev => 
                  type === 'word' 
                    ? prev + (prev ? ' ' : '') + content[index]
                    : prev + content[index]
                );
                index++;
              } else {
                clearInterval(interval);
              }
            }, speed);

            return () => clearInterval(interval);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, [text, delay, speed, hasAnimated, type]);

  return (
    <span ref={textRef} className={className}>
      {visibleContent}
      {visibleContent.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}
