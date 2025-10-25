import { ProductsGridSkeleton } from '@/components/products/products-skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="h-10 w-48 bg-neutral-700 animate-pulse rounded mb-4" />
          <div className="h-6 w-96 bg-neutral-700 animate-pulse rounded" />
        </div>

        <div className="mb-8 h-16 animate-pulse bg-neutral-700 rounded" />

        <ProductsGridSkeleton />
      </div>
    </div>
  );
}
