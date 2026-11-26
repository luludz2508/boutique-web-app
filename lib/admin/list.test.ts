import { expect, test } from 'vitest';
import { filterAdminList } from './list';
import type { AdminListItem } from './types';

const item = (over: Partial<AdminListItem>): AdminListItem => ({
  id: 'x', slug: 'x', name_vi: 'X', product_type: null, status: 'published', updated_at: '', thumb: null, variants: [], ...over,
});
const items = [
  item({ id: 'a', name_vi: 'VÒNG TRẦM 108 HẠT', product_type: 'VÒNG TAY', variants: [{ id: 'v', option1_value: null, sku: 'VT-108', price: 0, inventory_quantity: 0, track_inventory: true, updated_at: '' }] }),
  item({ id: 'b', name_vi: 'Nhang trầm', status: 'draft' }),
  item({ id: 'c', name_vi: 'Bình cũ', status: 'archived' }),
];
const ids = (xs: AdminListItem[]) => xs.map((x) => x.id);

test('search ignores accents and case, and matches SKU', () => {
  expect(ids(filterAdminList(items, { search: 'vong tram' }))).toEqual(['a']);
  expect(ids(filterAdminList(items, { search: 'vt-108' }))).toEqual(['a']);
});

test('"all" hides archived; a status filter shows only that status', () => {
  expect(ids(filterAdminList(items, {}))).toEqual(['a', 'b']);
  expect(ids(filterAdminList(items, { status: 'archived' }))).toEqual(['c']);
  expect(ids(filterAdminList(items, { status: 'draft' }))).toEqual(['b']);
});

test('type filter', () => {
  expect(ids(filterAdminList(items, { type: 'VÒNG TAY' }))).toEqual(['a']);
});
