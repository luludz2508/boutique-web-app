import { getAllProducts } from '@/lib/db/products';
import { ProductsGrid } from '@/components/products/products-grid';
import { CategoryBar, ProductSearch, type CategoryOption } from '@/components/products/product-filters';
import { ProductPagination } from '@/components/products/product-pagination';
import { Reveal } from '@/components/ink';
import { toSentenceCase } from '@/lib/display';

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

  // Categories with counts, biggest first; the catch-all "Khác" goes last
  const counts = new Map<string, number>();
  for (const p of allProducts) if (p.product_type) counts.set(p.product_type, (counts.get(p.product_type) ?? 0) + 1);
  const categories: CategoryOption[] = [...counts]
    .map(([value, count]) => ({ value, label: toSentenceCase(value), count }))
    .sort((a, b) => Number(a.value === 'Khác') - Number(b.value === 'Khác') || b.count - a.count);
  const total = allProducts.length;

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

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-28 text-ink md:px-[6vw] md:pt-32">
      <header className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[.32em] text-[#8a6a24]">
            <span className="h-px w-8 bg-gold" />
            Trầm hương Sơn Hồng
          </p>
          <h1 className="font-display text-4xl font-light md:text-5xl">Sản phẩm</h1>
        </Reveal>
        <ProductSearch />
      </header>

      <CategoryBar categories={categories} total={total} />

      {searchQuery ? (
        <p className="mt-6 text-sm text-ink-2">
          {totalProducts} kết quả cho &ldquo;{searchQuery}&rdquo;
        </p>
      ) : null}

      <div className="mt-10">
        <ProductsGrid products={paginatedProducts} />
      </div>
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

