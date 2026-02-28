'use client';

import { useState } from 'react';

export default function NewsImage({ src, alt }: { src: string | null; alt: string }) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300 text-5xl">
        📰
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setBroken(true)}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
  );
}
