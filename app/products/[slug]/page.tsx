import { getProductBySlug, getAllProducts } from "@/lib/db/products";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, MessageCircle } from "lucide-react";
import { ProductImageGallery } from "@/components/products/product-image-gallery";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name_vi} | Sơn Hồng`,
    description: product.seo_description_vi || product.excerpt_vi,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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

  const minPrice = product.variants
    ? Math.min(...product.variants.map((v) => v.price))
    : 0;
  const maxPrice = product.variants
    ? Math.max(...product.variants.map((v) => v.price))
    : 0;

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
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
        <div className="mb-8 text-sm text-neutral-400">
          <Link href="/" className="hover:text-neutral-200">
            Trang chủ
          </Link>
          {" / "}
          <Link href="/products" className="hover:text-neutral-200">
            Sản phẩm
          </Link>
          {" / "}
          <span className="text-neutral-200">{product.name_vi}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 px-4">
          {/* Image Gallery */}
          <ProductImageGallery
            images={sortedImages}
            productName={product.name_vi}
          />

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="font-serif text-5xl font-light mb-4 text-neutral-50 leading-tight">
                {product.name_vi}
              </h1>
              {product.brand && (
                <p className="text-neutral-400 text-lg">
                  Thương hiệu:{" "}
                  <span className="font-medium text-neutral-200">
                    {product.brand}
                  </span>
                </p>
              )}
            </div>

            {/* Price */}
            <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
              <p className="text-sm text-neutral-400 mb-2">Giá bán</p>
              <p className="text-4xl font-bold text-primary-400">
                {minPrice === maxPrice
                  ? `${minPrice.toLocaleString("vi-VN")} ₫`
                  : `${minPrice.toLocaleString(
                      "vi-VN"
                    )} - ${maxPrice.toLocaleString("vi-VN")} ₫`}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.product_type && (
                <Badge
                  variant="secondary"
                  className="bg-neutral-800 text-neutral-200 border-neutral-700"
                >
                  {product.product_type}
                </Badge>
              )}
              {product.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-neutral-700 text-neutral-300"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <Separator className="bg-neutral-700" />

            {/* Excerpt */}
            {product.excerpt_vi && (
              <div>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  {product.excerpt_vi}
                </p>
              </div>
            )}

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <Card className="bg-neutral-800 border-neutral-700">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4 text-neutral-100 text-lg">
                    Phiên bản sản phẩm
                  </h3>
                  <div className="space-y-3">
                    {product.variants.map((variant) => (
                      <div
                        key={variant.id}
                        className="flex justify-between items-center p-4 bg-neutral-900 border border-neutral-700 rounded-lg hover:border-neutral-600 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-neutral-100">
                            {variant.option1_value}
                            {variant.option2_value &&
                              ` - ${variant.option2_value}`}
                            {variant.option3_value &&
                              ` - ${variant.option3_value}`}
                          </p>
                          {variant.sku && (
                            <p className="text-xs text-neutral-500 mt-1">
                              SKU: {variant.sku}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary-400">
                            {variant.price.toLocaleString("vi-VN")} ₫
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              variant.inventory_quantity > 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {variant.inventory_quantity > 0
                              ? `Còn ${variant.inventory_quantity} sp`
                              : "Hết hàng"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 gap-2 bg-primary-600 hover:bg-primary-700 text-white"
              >
                <ShoppingCart className="h-5 w-5" />
                Thêm vào giỏ hàng
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-700"
              >
                <MessageCircle className="h-5 w-5" />
                Liên hệ
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description_vi && (
          <div className="mt-16 px-4">
            <h2 className="font-serif text-3xl font-light mb-6 text-neutral-50">
              Mô tả sản phẩm
            </h2>
            <Card className="bg-neutral-800 border-neutral-700">
              <CardContent className="pt-6">
                <div
                  className="prose prose-invert prose-neutral max-w-none text-neutral-300"
                  dangerouslySetInnerHTML={{ __html: product.description_vi }}
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
