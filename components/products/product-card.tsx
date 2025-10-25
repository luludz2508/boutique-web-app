import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import type { ProductWithDetails } from '@/lib/db/products';

interface ProductCardProps {
  product: ProductWithDetails;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0];
  const minPrice =
    product.variants && product.variants.length > 0
      ? Math.min(...product.variants.map((v) => v.price))
      : 0;

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="h-full bg-brown-800 border-brown-700 hover:border-accent-400 transition-all cursor-pointer hover:shadow-xl hover:shadow-brown-900/50">
        {/* Product Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-t-lg bg-brown-900">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt_text_vi || product.name_vi}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-accent-300">
              Không có hình ảnh
            </div>
          )}
        </div>

        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base line-clamp-2 text-accent-100 font-serif font-light">
              {product.name_vi}
            </CardTitle>
          </div>
          {product.brand && (
            <CardDescription className="text-accent-300">{product.brand}</CardDescription>
          )}
        </CardHeader>

        <CardContent>
          {product.excerpt_vi && (
            <p className="text-sm text-accent-200 line-clamp-2">{product.excerpt_vi}</p>
          )}

          <div className="mt-3 flex flex-wrap gap-1">
            {product.product_type && (
              <Badge
                variant="secondary"
                className="text-xs bg-brown-700 text-accent-200 border-brown-600"
              >
                {product.product_type}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <div className="w-full">
            <p className="text-lg font-bold text-accent-400">
              {minPrice > 0 ? `${minPrice.toLocaleString('vi-VN')} ₫` : 'Liên hệ'}
            </p>
            {product.variants && product.variants.length > 1 && (
              <p className="text-xs text-accent-300">{product.variants.length} phiên bản</p>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
