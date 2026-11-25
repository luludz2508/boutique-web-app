import { getAllProducts } from '@/lib/db/products';
import { ProductsGrid } from '@/components/products/products-grid';
import { CategoryBar, ProductSearch } from '@/components/products/product-filters';
import { Reveal } from '@/components/ink';
import { toCategories } from '@/lib/display';
import { PAGE_SIZE, queryProducts, toCard } from '@/lib/catalog';

// Force dynamic rendering to always get fresh data
export const dynamic = 'force-dynamic';

interface ProductsPageProps {
  searchParams: Promise<{
    type?: string;
    search?: string;
    sort?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { type, search, sort } = await searchParams;

  const all = await getAllProducts();
  const categories = toCategories(all.map((p) => p.product_type));
  const total = all.length;

  const matches = queryProducts(all, { type, search, sort });
  const firstPage = matches.slice(0, PAGE_SIZE).map(toCard);

  // the grid fetches later pages with the same filters
  const query = new URLSearchParams(
    Object.entries({ type, search, sort }).filter((e): e is [string, string] => Boolean(e[1])),
  ).toString();

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

      {search ? (
        <p className="mt-6 text-sm text-ink-2">
          {matches.length} kết quả cho &ldquo;{search}&rdquo;
        </p>
      ) : null}

      <div className="mt-10">
        {/* key: a new filter starts a fresh list */}
        <ProductsGrid key={query} initial={firstPage} total={matches.length} query={query} />
      </div>
    </div>
  );
}

