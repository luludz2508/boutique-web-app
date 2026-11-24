'use client';

import { useEffect, useState } from 'react';
import { ProductPhoto } from './product-photo';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaperFrame, Seal } from '@/components/ink';
import { cn } from '@/lib/utils';
import type { ProductImage } from '@/lib/db/products';

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [index, setIndex] = useState(0);
  const count = images?.length ?? 0;

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  // Arrow-key navigation (hooks must run before any early return)
  useEffect(() => {
    if (count < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + count) % count);
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [count]);

  if (count === 0) {
    return (
      <PaperFrame>
        <div className="flex aspect-square w-full items-center justify-center bg-paper-2">
          <Seal className="opacity-40" />
        </div>
      </PaperFrame>
    );
  }

  const current = images[index];

  return (
    <div className="space-y-5">
      <div className="group relative">
        <PaperFrame>
          <div className="relative aspect-square w-full overflow-hidden bg-paper-2">
            <ProductPhoto
              key={current.id}
              src={current.url}
              alt={current.alt_text_vi || productName}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="scale-[1.06] object-cover"
            />
          </div>
        </PaperFrame>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Ảnh trước"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 bg-paper/90 p-2 text-ink opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Ảnh sau"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 bg-paper/90 p-2 text-ink opacity-0 transition-opacity focus:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="absolute bottom-4 right-4 z-10 bg-paper/90 px-2.5 py-0.5 font-display text-sm text-ink">
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="grid grid-cols-5 gap-2.5 sm:grid-cols-6">
          {images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Xem ảnh ${i + 1}`}
              aria-current={i === index}
              className={cn(
                'relative aspect-square overflow-hidden bg-paper-2 outline outline-1 outline-offset-2 transition-[outline-color]',
                i === index ? 'outline-gold' : 'outline-transparent hover:outline-ink/20',
              )}
            >
              <ProductPhoto
                src={image.url}
                alt=""
                sizes="(max-width: 768px) 20vw, 8vw"
                className="scale-[1.12] object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
