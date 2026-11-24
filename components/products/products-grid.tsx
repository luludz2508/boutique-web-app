import { Reveal } from '@/components/ink';
import type { ProductWithDetails } from '@/lib/db/products';
import { ProductCard } from './product-card';

interface ProductsGridProps {
  products: ProductWithDetails[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  if (products.length === 0) {
    return (
      <p className="py-16 text-center font-display text-2xl font-light text-ink-2">Không tìm thấy sản phẩm nào</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
      {products.map((product, i) => (
        <Reveal key={product.id} delayMs={(i % 4) * 60}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
