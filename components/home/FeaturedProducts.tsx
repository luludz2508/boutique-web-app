import Link from 'next/link';
import { getAllProducts, getFeaturedProducts, type ProductWithDetails } from '@/lib/db/products';
import { ProductCard } from '@/components/products/product-card';
import { Reveal } from '@/components/ink';
import { SectionHeading } from './SectionHeading';

const MIN = 6;
const MAX = 8;

/** Featured products, topped up with the newest ones when fewer than six are featured. */
export async function loadFeaturedProducts(): Promise<ProductWithDetails[]> {
  const featured = await getFeaturedProducts(MAX);
  if (featured.length >= MIN) return featured.slice(0, MAX);
  const ids = new Set(featured.map((p) => p.id));
  const newest = (await getAllProducts())
    .filter((p) => !ids.has(p.id) && p.images?.length)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return [...featured, ...newest].slice(0, MAX);
}

export function FeaturedProducts({ products }: { products: ProductWithDetails[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-[7vw] md:pb-32">
      <Reveal>
        <SectionHeading eyebrow="Bộ sưu tập">Sản phẩm</SectionHeading>
      </Reveal>
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
        {products.map((p, i) => (
          <Reveal key={p.id} delayMs={(i % 4) * 80} className="h-full">
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
      <div className="mt-14 text-center">
        <Link
          href="/products"
          className="ink-sweep relative isolate inline-flex overflow-hidden border border-ink/50 px-8 py-4 text-xs font-medium uppercase tracking-[.18em] text-ink"
        >
          Xem tất cả sản phẩm
        </Link>
      </div>
    </section>
  );
}
