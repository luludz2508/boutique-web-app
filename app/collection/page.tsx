import {
  FadeInUp,
  FadeIn,
  SlideInUp,
  StaggerContainer,
  StaggerItem,
  DrawLine,
  TextReveal,
} from "@/components/animations/viewport-animations";
import content from "@/config/content";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { getAllProducts } from "@/lib/db/products";
import Image from "next/image";

// Export the content component for the accordion layout
export async function CollectionContent() {
  const currentLocale = "vi";
  const pageContent = content[currentLocale].collection;

  // Fetch featured products for the collection showcase
  const allProducts = await getAllProducts();
  const featuredProducts = allProducts.slice(0, 6); // Show first 6 products

  return (
    <div className="space-y-20">
      <div className="pt-12 text-center">
        <TextReveal>
          <h1 className="font-serif text-6xl font-light mb-8 tracking-tight leading-none">
            {pageContent.title}
            <br />
            <span className="font-normal text-primary-400">
              {pageContent.subtitle}
            </span>
          </h1>
        </TextReveal>
        <FadeIn delay={0.5}>
          <DrawLine className="w-32 mx-auto mb-8 bg-neutral-600" />
        </FadeIn>
        <FadeInUp delay={0.8}>
          <p className="font-sans text-lg text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            {pageContent.description}
          </p>
        </FadeInUp>

        {/* Products Button - Prominent */}
        <div className="flex gap-4 justify-center mt-10">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold shadow-lg"
          >
            <Link href="/products">
              <ShoppingBag className="h-5 w-5" />
              Xem Tất Cả Sản Phẩm
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      <StaggerContainer
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        staggerDelay={0.1}
      >
        {featuredProducts.map((product, index) => {
          const primaryImage =
            product.images?.find((img) => img.is_primary) ||
            product.images?.[0];
          const minPrice =
            product.variants?.length > 0
              ? Math.min(...product.variants.map((v) => v.price))
              : 0;

          return (
            <StaggerItem key={product.id}>
              <div className="border border-neutral-700 bg-neutral-800 hover:border-neutral-600 transition-colors">
                <div className="relative h-48 border-b border-neutral-600 overflow-hidden">
                  {primaryImage ? (
                    <Image
                      src={primaryImage.url}
                      alt={primaryImage.alt_text_vi || product.name_vi}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-500">
                      Không có hình ảnh
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl font-light mb-3 text-neutral-50">
                    {product.name_vi}
                  </h3>
                  <p className="font-mono text-lg text-primary-400 mb-4">
                    {minPrice > 0
                      ? `${minPrice.toLocaleString("vi-VN")} ₫`
                      : "Liên hệ"}
                  </p>
                  <p className="text-neutral-300 leading-relaxed mb-6 font-sans">
                    {product.excerpt_vi ||
                      "Sản phẩm trầm hương cao cấp được chế tác thủ công."}
                  </p>
                  <div className="space-y-2 mb-8">
                    {product.product_type && (
                      <div className="flex items-center space-x-3">
                        <div className="w-1 h-1 bg-primary-400"></div>
                        <span className="text-neutral-400 text-sm font-sans">
                          Loại: {product.product_type}
                        </span>
                      </div>
                    )}
                    {product.brand && (
                      <div className="flex items-center space-x-3">
                        <div className="w-1 h-1 bg-primary-400"></div>
                        <span className="text-neutral-400 text-sm font-sans">
                          Thương hiệu: {product.brand}
                        </span>
                      </div>
                    )}
                    {product.variants && product.variants.length > 1 && (
                      <div className="flex items-center space-x-3">
                        <div className="w-1 h-1 bg-primary-400"></div>
                        <span className="text-neutral-400 text-sm font-sans">
                          {product.variants.length} phiên bản
                        </span>
                      </div>
                    )}
                  </div>
                  <Link href={`/products/${product.slug}`}>
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-neutral-900 font-medium py-3 transition-colors font-sans">
                      Xem Chi Tiết
                    </button>
                  </Link>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <SlideInUp>
        <div className="bg-primary-600 -mx-16 px-16 py-20 border-t border-primary-500">
          <div className="text-center">
            <h2 className="font-serif text-5xl font-light mb-8 text-neutral-900">
              {pageContent.bespokeTitle}
            </h2>
            <p className="font-sans text-xl text-neutral-800 mb-12 max-w-2xl mx-auto leading-relaxed">
              {pageContent.bespokeDescription}
            </p>
            <FadeInUp delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={pageContent.bespokeEmailPlaceholder}
                  className="flex-1 px-6 py-4 bg-neutral-50 text-neutral-900 border border-neutral-300 focus:outline-none focus:border-neutral-500 font-sans"
                />
                <button className="bg-neutral-900 text-neutral-50 font-medium px-8 py-4 hover:bg-neutral-800 transition-colors font-sans">
                  {pageContent.bespokeButtonText}
                </button>
              </div>
            </FadeInUp>
          </div>
        </div>
      </SlideInUp>
    </div>
  );
}

// Default export for route access
export default CollectionContent;
