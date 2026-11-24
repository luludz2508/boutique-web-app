'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { Seal } from '@/components/ink';

/**
 * next/image that falls back to a paper placeholder with a faint seal when the URL
 * is missing or fails to load (e.g. a dead Haravan link), instead of a broken-image icon.
 * Must sit inside a positioned box, like next/image `fill`.
 */
export function ProductPhoto({ src, alt, ...rest }: Omit<ImageProps, 'src'> & { src?: string | null }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span className="absolute inset-0 flex items-center justify-center bg-paper-2" role="img" aria-label={alt || undefined}>
        <Seal className="opacity-40" />
      </span>
    );
  }

  return <Image src={src} alt={alt} fill onError={() => setFailed(true)} {...rest} />;
}
