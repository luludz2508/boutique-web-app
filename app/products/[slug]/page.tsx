import { getProductBySlug, getAllProducts } from '@/lib/db/products';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, MessageCircle } from 'lucide-react';
import { ProductImageGallery } from '@/components/products/product-image-gallery';

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name_vi} | Sơn Hồng`,
    description: product.seo_description_vi || product.excerpt_vi,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Sort images by position, with primary image first
  const sortedImages = product.images
    ? [...product.images].sort((a, b) => {
        if (a.is_primary) return -1;
        if (b.is_primary) return 1;
        return (a.position || 0) - (b.position || 0);
      })
    : [];

  const minPrice = product.variants ? Math.min(...product.variants.map((v) => v.price)) : 0;
  const maxPrice = product.variants ? Math.max(...product.variants.map((v) => v.price)) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-cyphr-teal">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 py-4 sm:py-8 lg:py-12">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <Button
            asChild
            variant="ghost"
            className="gap-2 text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800"
          >
            <Link href="/products">
              <ArrowLeft className="h-4 w-4" />
              Quay lại danh sách
            </Link>
          </Button>
        </div>

        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6 lg:mb-8 text-xs sm:text-sm text-neutral-400">
          <Link href="/" className="hover:text-neutral-200">
            Trang chủ
          </Link>
          {' / '}
          <Link href="/products" className="hover:text-neutral-200">
            Sản phẩm
          </Link>
          {' / '}
          <span className="text-neutral-200">{product.name_vi}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16">
          {/* Image Gallery */}
          <ProductImageGallery images={sortedImages} productName={product.name_vi} />

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light mb-2 sm:mb-3 lg:mb-4 text-neutral-100 leading-tight">
                {product.name_vi}
              </h1>
              {product.brand && (
                <p className="text-neutral-400 text-sm sm:text-base lg:text-lg">
                  Thương hiệu: <span className="font-medium text-neutral-200">{product.brand}</span>
                </p>
              )}
            </div>

            {/* Price */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 sm:p-6 shadow-lg">
              <p className="text-xs sm:text-sm text-neutral-400 mb-1 sm:mb-2">Giá bán</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent-400">
                {minPrice === maxPrice
                  ? `${minPrice.toLocaleString('vi-VN')} ₫`
                  : `${minPrice.toLocaleString('vi-VN')} - ${maxPrice.toLocaleString('vi-VN')} ₫`}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.product_type && (
                <Badge
                  variant="secondary"
                  className="bg-white/10 text-neutral-200 border-white/20 text-xs sm:text-sm"
                >
                  {product.product_type}
                </Badge>
              )}
              {product.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-white/30 text-neutral-300 text-xs sm:text-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <Separator className="bg-white/20" />

            {/* Excerpt */}
            {product.excerpt_vi && (
              <div>
                <p className="text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                  {product.excerpt_vi}
                </p>
              </div>
            )}

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg">
                <CardContent className="pt-4 sm:pt-6">
                  <h3 className="font-semibold mb-3 sm:mb-4 text-neutral-100 text-base sm:text-lg">
                    Phiên bản sản phẩm
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    {product.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="flex justify-between items-center p-3 sm:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/20 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-neutral-200 text-sm sm:text-base">
                            {variant.option1_value}
                            {variant.option2_value && ` - ${variant.option2_value}`}
                            {variant.option3_value && ` - ${variant.option3_value}`}
                          </p>
                          {variant.sku && (
                            <p className="text-xs text-neutral-500 mt-1">SKU: {variant.sku}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-accent-400 text-sm sm:text-base">
                            {variant.price.toLocaleString('vi-VN')} ₫
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              variant.inventory_quantity > 0 ? 'text-green-400' : 'text-red-400'
                            }`}
                          >
                            {variant.inventory_quantity > 0
                              ? `Còn ${variant.inventory_quantity} sp`
                              : 'Hết hàng'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                disabled
                className="flex-1 gap-2 bg-neutral-600 hover:bg-neutral-600 text-neutral-400 cursor-not-allowed shadow-lg transition-all duration-300 relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Thêm vào giỏ hàng</span>
                <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  Sắp có
                </span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="gap-2 bg-accent-100/80 backdrop-blur-sm border-accent-300 text-accent-800 hover:bg-accent-200 hover:border-accent-400 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link
                  href="https://www.facebook.com/tramhuongsonhong.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  Liên hệ Facebook
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description_vi && (
          <div className="mt-8 sm:mt-12 lg:mt-16 sm:px-2">
            <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-light mb-4 sm:mb-6 text-neutral-100">
              Mô tả sản phẩm
            </h2>
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <div
                  className="prose prose-invert prose-neutral max-w-none text-neutral-300 text-sm sm:text-base"
                  style={{
                    textAlign: 'center',
                  }}
                  dangerouslySetInnerHTML={{
                    __html:
                      product.description_vi?.replace(
                        /<img/g,
                        '<img style="display: block; margin: 0 auto; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); max-width: 100%; height: auto;"',
                      ) || '',
                  }}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
