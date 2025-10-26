'use client';
import Image from 'next/image';
import { useState } from 'react';

type ImageWithFallbackProps = {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
};

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/images/tourImg2.jpg',
  className
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imgSrc}
        alt={alt}
        fill
        sizes="100vw"
        onError={() => setImgSrc(fallbackSrc)}
        className="object-cover"
      />
    </div>
  );
}
