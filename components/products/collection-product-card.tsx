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

interface CollectionProductCardProps {
  product: ProductWithDetails;
}

export function CollectionProductCard({ product }: CollectionProductCardProps) {
  const primaryImage = product.images?.find((img) => img.is_primary) || product.images?.[0];
  const minPrice =
    product.variants && product.variants.length > 0
      ? Math.min(...product.variants.map((v) => v.price))
      : 0;

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/40 transition-all cursor-pointer hover:shadow-xl hover:shadow-white/10">
        {/* Product Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-t-lg bg-white/5">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt_text_vi || product.name_vi}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white/60">
              Không có hình ảnh
            </div>
          )}
        </div>

        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base line-clamp-2 text-white font-serif font-light">
              {product.name_vi}
            </CardTitle>
          </div>
          {product.brand && (
            <CardDescription className="text-white/70">{product.brand}</CardDescription>
          )}
        </CardHeader>

        <CardContent>
          {product.excerpt_vi && (
            <p className="text-sm text-white/80 line-clamp-2">{product.excerpt_vi}</p>
          )}

          <div className="mt-3 flex flex-wrap gap-1">
            {product.product_type && (
              <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                {product.product_type}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <div className="w-full">
            <p className="text-lg font-bold text-white">
              {minPrice > 0 ? `${minPrice.toLocaleString('vi-VN')} ₫` : 'Liên hệ'}
            </p>
            {product.variants && product.variants.length > 1 && (
              <p className="text-xs text-white/70">{product.variants.length} phiên bản</p>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

