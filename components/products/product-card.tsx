import Link from 'next/link';
import { PaperFrame } from '@/components/ink';
import { ProductPhoto } from './product-photo';
import { formatPrice, productPriceRange } from '@/lib/display';
import { splitProductName } from '@/lib/description';
import type { CardProduct } from '@/lib/catalog';

interface ProductCardProps {
  product: CardProduct;
}

/** Card price: "Liên hệ", a single price, or "Từ <min>" when variants differ. */
export function cardPrice(product: Pick<CardProduct, 'variants'>): string {
  const range = productPriceRange(product.variants ?? []);
  if (!range) return formatPrice(null);
  return range.min === range.max ? formatPrice(range.min) : `Từ ${formatPrice(range.min)}`;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images?.find((img) => img.is_primary) ?? product.images?.[0];
  const { title, detail } = splitProductName(product.name_vi);
  const hasPrice = productPriceRange(product.variants ?? []) !== null;

  return (
    <Link href={`/products/${product.slug}`} className="group flex h-full flex-col text-ink">
      <PaperFrame hoverLift>
        <div className="relative aspect-square w-full overflow-hidden bg-paper-2">
          <ProductPhoto
            src={image?.url}
            alt=""
            sizes="(max-width: 1024px) 50vw, 25vw"
            // scale hides the frame that is baked into many Haravan photos
            className="scale-[1.12] object-cover transition-transform [transition-duration:1200ms] [transition-timing-function:cubic-bezier(.2,.7,.1,1)] group-hover:scale-[1.17] motion-reduce:transition-none"
          />
        </div>
      </PaperFrame>

      <h3 className="mt-4 line-clamp-2 font-display text-lg font-medium leading-snug sm:text-xl">{title}</h3>
      {detail && <p className="mt-1 line-clamp-1 text-xs tracking-wide text-ink-2">{detail}</p>}
      {/* "Liên hệ" on every card is noise; only show a price when there is one */}
      {hasPrice && <p className="mt-auto pt-2 text-sm tracking-wide text-ink">{cardPrice(product)}</p>}
    </Link>
  );
}
