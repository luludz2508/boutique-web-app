import { ProductsGridSkeleton } from "@/components/products/products-skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-10 w-48 bg-muted animate-pulse rounded mb-4" />
        <div className="h-6 w-96 bg-muted animate-pulse rounded" />
      </div>

      <div className="mb-8 h-16 animate-pulse bg-muted rounded" />

      <ProductsGridSkeleton />
    </div>
  );
}

