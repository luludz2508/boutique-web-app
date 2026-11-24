import { ProductsGridSkeleton } from '@/components/products/products-skeleton';

export default function Loading() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-32 md:px-[6vw]">
      <div className="mb-14 h-12 w-56 animate-pulse bg-paper-2" />
      <ProductsGridSkeleton />
    </div>
  );
}
