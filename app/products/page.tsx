import { getAllProducts, getAllProductTypes } from '@/lib/db/products';
import { ProductsGrid } from '@/components/products/products-grid';
import { ProductFilters } from '@/components/products/product-filters';
import { ProductPagination } from '@/components/products/product-pagination';
import { BrushStroke, Reveal } from '@/components/ink';
import content from '@/config/content';

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

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
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
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-28 text-ink md:px-[6vw] md:pt-36">
      <header className="mb-12 md:mb-16">
        <Reveal>
          <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[.32em] text-[#8a6a24]">
            <span className="h-px w-8 bg-gold" />
            Bộ sưu tập
          </p>
          <h1 className="font-display text-5xl font-light md:text-6xl">Sản phẩm</h1>
          <BrushStroke variant="ink" className="mb-6 mt-5 w-52 opacity-85" />
          <p className="max-w-2xl leading-relaxed text-ink-2">{pageContent.description}</p>
        </Reveal>
      </header>

      <section className="mb-12 border-y border-ink/10 py-6">
        <ProductFilters productTypes={productTypes} totalProducts={allProducts.length} />
        <p className="mt-4 text-sm text-ink-2">
          {totalProducts} sản phẩm
          {searchQuery && <> cho &ldquo;{searchQuery}&rdquo;</>}
          {typeFilter && <> trong &ldquo;{typeFilter}&rdquo;</>}
        </p>
      </section>

      <ProductsGrid products={paginatedProducts} />
      <div className="mt-12">
        <ProductPagination
          currentPage={page}
          totalPages={totalPages}
          totalItems={totalProducts}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
}

