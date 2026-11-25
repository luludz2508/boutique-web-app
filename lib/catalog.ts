/**
 * The product list's filter / search / sort, shared by the /products page (first page,
 * server-rendered) and /api/products/page (the pages infinite scroll loads after it).
 */
import type { ProductWithDetails } from './db/products';
import { productPriceRange } from './display';

export type ListQuery = { type?: string | null; search?: string | null; sort?: string | null };

/** Just what ProductCard reads, so each scroll page stays small. */
export type CardProduct = {
  id: string;
  slug: string;
  name_vi: string;
  variants: { price: number }[];
  images: { url: string; is_primary: boolean }[];
};

export const PAGE_SIZE = 12;

const minPrice = (p: ProductWithDetails) => productPriceRange(p.variants ?? [])?.min ?? null;

export function queryProducts(products: ProductWithDetails[], { type, search, sort }: ListQuery): ProductWithDetails[] {
  let out = products;
  if (type) out = out.filter((p) => p.product_type === type);
  if (search) {
    const q = search.toLocaleLowerCase('vi');
    out = out.filter(
      (p) =>
        p.name_vi.toLocaleLowerCase('vi').includes(q) ||
        p.description_vi?.toLocaleLowerCase('vi').includes(q) ||
        p.tags?.some((t) => t.toLocaleLowerCase('vi').includes(q)),
    );
  }

  const time = (p: ProductWithDetails) => new Date(p.created_at).getTime();
  // "Liên hệ" items (no price) always go after priced ones when sorting by price
  const byPrice = (dir: 1 | -1) => (a: ProductWithDetails, b: ProductWithDetails) => {
    const pa = minPrice(a);
    const pb = minPrice(b);
    if (pa === null || pb === null) return Number(pa === null) - Number(pb === null);
    return (pa - pb) * dir;
  };

  const sorters: Record<string, (a: ProductWithDetails, b: ProductWithDetails) => number> = {
    oldest: (a, b) => time(a) - time(b),
    'price-asc': byPrice(1),
    'price-desc': byPrice(-1),
    'name-asc': (a, b) => a.name_vi.localeCompare(b.name_vi, 'vi'),
    'name-desc': (a, b) => b.name_vi.localeCompare(a.name_vi, 'vi'),
    newest: (a, b) => time(b) - time(a),
  };
  return [...out].sort(sorters[sort ?? ''] ?? sorters.newest);
}

export function toCard(p: ProductWithDetails): CardProduct {
  const img = p.images?.find((i) => i.is_primary) ?? p.images?.[0];
  return {
    id: p.id,
    slug: p.slug,
    name_vi: p.name_vi,
    variants: (p.variants ?? []).map((v) => ({ price: v.price })),
    images: img ? [{ url: img.url, is_primary: img.is_primary }] : [],
  };
}
