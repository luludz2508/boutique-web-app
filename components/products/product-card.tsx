import Image from 'next/image';
import Link from 'next/link';
import { BrushStroke, PaperFrame, Seal } from '@/components/ink';
import { formatPrice, productPriceRange, toSentenceCase } from '@/lib/display';
import type { ProductWithDetails } from '@/lib/db/products';

interface ProductCardProps {
  product: ProductWithDetails;
}

/** Card price: "Liên hệ", a single price, or "Từ <min>" when variants differ. */
export function cardPrice(product: Pick<ProductWithDetails, 'variants'>): string {
  const range = productPriceRange(product.variants ?? []);
  if (!range) return formatPrice(null);
  return range.min === range.max ? formatPrice(range.min) : `Từ ${formatPrice(range.min)}`;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images?.find((img) => img.is_primary) ?? product.images?.[0];
  const name = toSentenceCase(product.name_vi);

  return (
    <Link href={`/products/${product.slug}`} className="group block text-ink">
      <PaperFrame hoverLift>
        <div className="relative aspect-square w-full overflow-hidden bg-paper-2">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt_text_vi || name}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              // scale hides the frame that is baked into many Haravan photos
              className="scale-[1.12] object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.2,.7,.1,1)] group-hover:scale-[1.17]"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Seal className="opacity-40" />
            </div>
          )}
        </div>
      </PaperFrame>

      <h3 className="mt-4 line-clamp-3 font-display text-lg font-medium leading-snug sm:text-xl">{name}</h3>
      <div className="my-2 h-[7px] w-[46px] transition-[width] duration-700 ease-[cubic-bezier(.2,.7,.1,1)] group-hover:w-[110px]">
        <BrushStroke variant="ink" className="h-full w-full opacity-75" />
      </div>
      <p className="text-sm tracking-wide text-ink-2">{cardPrice(product)}</p>
    </Link>
  );
}
