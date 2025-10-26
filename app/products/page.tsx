import { getAllProducts, getAllProductTypes } from '@/lib/db/products';
import { ProductsGrid } from '@/components/products/products-grid';
import { ProductFilters } from '@/components/products/product-filters';
import { ProductPagination } from '@/components/products/product-pagination';
import {
  TextReveal,
  FadeIn,
  FadeInUp,
  DrawLine,
} from '@/components/animations/viewport-animations';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import content from '@/config/content';
import { ImperialDivider } from '@/components/ui/imperial-elements';

// Note: metadata cannot be exported from pages used in ClientLayout (accordion)
// Metadata is defined in app/layout.tsx instead

// Force dynamic rendering to always get fresh data
export const dynamic = 'force-dynamic';

const ITEMS_PER_PAGE = 12;

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    type?: string;
    search?: string;
    sort?: string;
  }>;
}

// Export the content component for the accordion layout
export async function ProductsContent({ searchParams }: ProductsPageProps) {
  // Await searchParams in Next.js 15+
  const params = await searchParams;

  const page = parseInt(params.page || '1');
  const typeFilter = params.type;
  const searchQuery = params.search;
  const sortBy = params.sort || 'newest';

  // Fetch all products
  let allProducts = await getAllProducts();

  // Apply filters
  if (typeFilter) {
    allProducts = allProducts.filter((p) => p.product_type === typeFilter);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    allProducts = allProducts.filter(
      (p) =>
        p.name_vi.toLowerCase().includes(query) ||
        p.description_vi?.toLowerCase().includes(query) ||
        p.tags?.some((tag) => tag.toLowerCase().includes(query)),
    );
  }

  // Apply sorting
  allProducts.sort((a, b) => {
    const getMinPrice = (product: typeof a) =>
      product.variants?.length > 0 ? Math.min(...product.variants.map((v) => v.price)) : 0;

    switch (sortBy) {
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'price-asc':
        return getMinPrice(a) - getMinPrice(b);
      case 'price-desc':
        return getMinPrice(b) - getMinPrice(a);
      case 'name-asc':
        return a.name_vi.localeCompare(b.name_vi, 'vi');
      case 'name-desc':
        return b.name_vi.localeCompare(a.name_vi, 'vi');
      case 'newest':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  // Calculate pagination
  const totalProducts = allProducts.length;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = allProducts.slice(startIndex, endIndex);

  // Get all product types for filters
  const productTypes = await getAllProductTypes();
  const pageContent = content.vi.products;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-cyphr-teal">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-16">
        {/* Back Button */}
        <div className="mb-8 lg:mb-12">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-neutral-100 hover:bg-white/20 hover:border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/collection">
              <ArrowLeft className="h-5 w-5" />
              Quay Lại Collection
            </Link>
          </Button>
        </div>

        <div className="space-y-12 lg:space-y-20">
          {/* Header Section */}
          <div className="text-center px-4">
            <TextReveal>
              <h1 className="font-serif text-4xl lg:text-6xl font-light mb-4 lg:mb-6 tracking-tight leading-tight text-neutral-100">
                {pageContent.title}
                <br />
                <span className="font-normal text-accent-400">{pageContent.subtitle}</span>
              </h1>
            </TextReveal>
            <FadeIn delay={0.3}>
              <ImperialDivider className="mb-6 lg:mb-8" />
            </FadeIn>
            <FadeInUp delay={0.5}>
              <p className="font-sans text-base lg:text-lg text-neutral-300 leading-relaxed max-w-3xl mx-auto mb-4">
                {pageContent.description}
              </p>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <span className="font-sans text-sm font-medium text-neutral-200">
                  Tìm thấy {totalProducts} sản phẩm
                </span>
              </div>
            </FadeInUp>
          </div>

          {/* Filters Section */}
          <FadeInUp delay={0.3}>
            <div className="max-w-6xl mx-auto px-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 lg:p-8 shadow-lg">
                <ProductFilters productTypes={productTypes} totalProducts={allProducts.length} />

                {/* Results Info */}
                {(typeFilter || searchQuery) && (
                  <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-sm text-neutral-300 text-center">
                      Đang hiển thị{' '}
                      <span className="font-semibold text-accent-400">{totalProducts}</span> sản
                      phẩm
                      {searchQuery && (
                        <span>
                          {' '}
                          cho "<span className="font-medium">{searchQuery}</span>"
                        </span>
                      )}
                      {typeFilter && (
                        <span>
                          {' '}
                          trong danh mục "<span className="font-medium">{typeFilter}</span>"
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </FadeInUp>

          {/* Products Grid */}
          <div className="px-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 lg:p-8 shadow-lg">
              <ProductsGrid products={paginatedProducts} />
              <ProductPagination
                currentPage={page}
                totalPages={totalPages}
                totalItems={totalProducts}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Default export for route access
export default ProductsContent;
