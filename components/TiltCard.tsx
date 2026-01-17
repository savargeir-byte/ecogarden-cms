'use client';

import { ReactNode, useRef, useState, MouseEvent } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
}

export default function TiltCard({ 
  children, 
  className = '',
  maxTilt = 15,
  scale = 1.05,
  glare = true
}: TiltCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate mouse position relative to center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate tilt angles
    const tiltX = (mouseY / (rect.height / 2)) * maxTilt;
    const tiltY = (mouseX / (rect.width / 2)) * maxTilt;
    
    // Calculate glare position (percentage)
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    
    setTilt({ x: -tiltX, y: tiltY });
    setGlarePos({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovering 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${scale})`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: isHovering 
          ? 'transform 0.1s ease-out'
          : 'transform 0.3s ease-out',
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
      
      {/* Glare effect */}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden"
          style={{
            background: isHovering
              ? `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.3) 0%, transparent 60%)`
              : 'none',
            transition: 'background 0.1s ease-out',
            mixBlendMode: 'overlay'
          }}
        />
      )}
    </div>
  );
}
