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
    <Image
      src={imgSrc}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      onError={() => setImgSrc(fallbackSrc)}
      className={className}
      style={{ width: '100%', height: 'auto' }}
    />
  );
}
