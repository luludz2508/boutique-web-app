'use client';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20">
      <div className="aspect-square w-full rounded-t-lg bg-white/5 animate-pulse" />
      <CardHeader>
        <div className="h-5 w-3/4 bg-white/5 animate-pulse rounded" />
        <div className="h-4 w-1/2 bg-white/5 animate-pulse rounded" />
      </CardHeader>
      <CardContent>
        <div className="h-4 w-full mb-2 bg-white/5 animate-pulse rounded" />
        <div className="h-4 w-2/3 bg-white/5 animate-pulse rounded" />
      </CardContent>
      <CardFooter>
        <div className="h-6 w-24 bg-white/5 animate-pulse rounded" />
      </CardFooter>
    </Card>
  );
}

export function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
