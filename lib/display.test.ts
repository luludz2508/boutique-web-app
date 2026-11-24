import { expect, test } from 'vitest';
import { formatPrice, isSoldOut, pickDefaultVariant, productPriceRange, toSentenceCase } from './display';

test('toSentenceCase lowercases then capitalises the first letter, keeps diacritics', () => {
  expect(toSentenceCase('VÒNG TRẦM HƯƠNG 108 HẠT TỨ DIỆP BẢO')).toBe('Vòng trầm hương 108 hạt tứ diệp bảo');
  expect(toSentenceCase('  ĐẾ DÁT VÀNG ')).toBe('Đế dát vàng');
  expect(toSentenceCase('')).toBe('');
});

test('formatPrice', () => {
  expect(formatPrice(2400000)).toBe('2.400.000₫');
  expect(formatPrice(0)).toBe('Liên hệ');
  expect(formatPrice(null)).toBe('Liên hệ');
});

test('isSoldOut only when tracked and quantity <= 0', () => {
  expect(isSoldOut({ inventory_quantity: 0, track_inventory: true })).toBe(true);
  expect(isSoldOut({ inventory_quantity: 0, track_inventory: false })).toBe(false);
  expect(isSoldOut({ inventory_quantity: 3, track_inventory: true })).toBe(false);
});

test('pickDefaultVariant prefers first in-stock, falls back to first, null when empty', () => {
  const v = (id: string, q: number) => ({ id, inventory_quantity: q, track_inventory: true }) as any;
  expect(pickDefaultVariant([v('a', 0), v('b', 2)])?.id).toBe('b');
  expect(pickDefaultVariant([v('a', 0), v('b', 0)])?.id).toBe('a');
  expect(pickDefaultVariant([])).toBeNull();
});

test('productPriceRange ignores zero prices', () => {
  const v = (price: number) => ({ price }) as any;
  expect(productPriceRange([v(0), v(300000), v(500000)])).toEqual({ min: 300000, max: 500000 });
  expect(productPriceRange([v(0)])).toBeNull();
});
