export function ProductCardSkeleton() {
  return (
    <div aria-hidden>
      <div className="aspect-square w-full animate-pulse bg-paper-2" />
      <div className="mt-4 h-5 w-3/4 animate-pulse bg-paper-2" />
      <div className="mt-3 h-4 w-1/3 animate-pulse bg-paper-2" />
    </div>
  );
}

export function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
