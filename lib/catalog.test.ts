import { expect, test } from 'vitest';
import { queryProducts, toCard } from './catalog';
import type { ProductWithDetails } from './db/products';

const p = (over: Record<string, unknown>): ProductWithDetails =>
  ({
    id: 'x',
    slug: 'x',
    name_vi: 'X',
    description_vi: null,
    tags: [],
    product_type: null,
    created_at: '2025-01-01',
    variants: [],
    images: [],
    ...over,
  }) as unknown as ProductWithDetails;

const items = [
  p({ id: 'a', name_vi: 'VÒNG TAY TRÒN', product_type: 'VÒNG TAY', created_at: '2025-03-01', variants: [{ price: 500000 }] }),
  p({ id: 'b', name_vi: 'NHANG TRẦM', product_type: 'NHANG', created_at: '2025-01-01', variants: [{ price: 0 }], tags: ['xông'] }),
  p({ id: 'c', name_vi: 'BÌNH HOA', product_type: 'Khác', created_at: '2025-02-01', variants: [{ price: 2000000 }], description_vi: '<p>vòng hoa</p>' }),
];

test('queryProducts filters by type', () => {
  expect(queryProducts(items, { type: 'NHANG' }).map((x) => x.id)).toEqual(['b']);
});

test('queryProducts searches name, description and tags, ignoring case', () => {
  expect(queryProducts(items, { search: 'vòng' }).map((x) => x.id)).toEqual(['a', 'c']);
  expect(queryProducts(items, { search: 'XÔNG' }).map((x) => x.id)).toEqual(['b']);
});

test('queryProducts sorts newest first by default, and by price with "Liên hệ" items last', () => {
  expect(queryProducts(items, {}).map((x) => x.id)).toEqual(['a', 'c', 'b']);
  expect(queryProducts(items, { sort: 'price-asc' }).map((x) => x.id)).toEqual(['a', 'c', 'b']);
  expect(queryProducts(items, { sort: 'price-desc' }).map((x) => x.id)).toEqual(['c', 'a', 'b']);
});

test('queryProducts does not mutate its input', () => {
  const before = items.map((x) => x.id);
  queryProducts(items, { sort: 'price-desc' });
  expect(items.map((x) => x.id)).toEqual(before);
});

test('toCard keeps only what a card needs', () => {
  const card = toCard(
    p({
      id: 'a',
      slug: 's',
      name_vi: 'N',
      description_vi: '<p>long</p>',
      variants: [{ price: 1, sku: 'k' }],
      images: [{ url: 'u1', is_primary: false }, { url: 'u2', is_primary: true }],
    }),
  );
  expect(card).toEqual({ id: 'a', slug: 's', name_vi: 'N', variants: [{ price: 1 }], images: [{ url: 'u2', is_primary: true }] });
});
