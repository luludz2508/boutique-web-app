import { expect, test } from 'vitest';
import { splitDescription } from '@/lib/description';
import { seedForm } from './seed';
import type { AdminProduct } from './types';

const HTML =
  '<h1>BÌNH HOA</h1><p><strong>THÔNG TIN SẢN PHẨM</strong></p>' +
  '<table><tbody><tr><td>LOẠI TRẦM</td><td>Trầm tự nhiên</td></tr><tr><td>KÍCH THƯỚC</td><td>20cm</td></tr></tbody></table>' +
  '<p>Bình hoa được chạm tay.</p>';

const product = (over: Partial<AdminProduct>): AdminProduct =>
  ({
    id: 'p1',
    name_vi: 'BÌNH HOA',
    slug: 'binh-hoa',
    product_type: null,
    status: 'published',
    featured: false,
    excerpt_vi: null,
    description_vi: HTML,
    specs: [],
    version: '2026-11-26T10:00:00Z',
    variants: [{ id: 'v1', option1_value: 'Default Title', price: 1000, compare_at_price: null, sku: null, inventory_quantity: 2, track_inventory: true }],
    images: [{ id: 'i2', url: 'b', position: 1 }, { id: 'i1', url: 'a', position: 0 }],
    ...over,
  }) as unknown as AdminProduct;

test('seedForm pulls specs out of old Haravan HTML when the product has none', () => {
  const v = seedForm(product({}));
  expect(v.specs).toEqual(splitDescription(HTML).specs);
  expect(v.specs.length).toBe(2);
  expect(v.description_vi).not.toContain('<table');
  expect(v.description_vi).toContain('chạm tay');
});

test('seedForm keeps saved specs and the description as is', () => {
  const v = seedForm(product({ specs: [{ label: 'A', value: '1' }], description_vi: '<p>x</p>' }));
  expect(v.specs).toEqual([{ label: 'A', value: '1' }]);
  expect(v.description_vi).toBe('<p>x</p>');
});

test('seedForm maps nulls to empty fields and orders photos', () => {
  const v = seedForm(product({}));
  expect(v.product_type).toBe('');
  expect(v.excerpt_vi).toBe('');
  expect(v.variants[0]).toEqual({ id: 'v1', option1_value: 'Default Title', price: 1000, compare_at_price: null, sku: '', inventory_quantity: 2, track_inventory: true });
  expect(v.image_order).toEqual(['i1', 'i2']);
});
