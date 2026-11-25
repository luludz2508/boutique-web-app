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

test('toSentenceCase keeps known proper nouns capitalised', () => {
  expect(toSentenceCase('VÒNG TRẦM HƯƠNG TỐC ĐƠN TỰ NHIÊN SƠN HỒNG')).toBe('Vòng trầm hương tốc đơn tự nhiên Sơn Hồng');
  expect(toSentenceCase('TƯỢNG TRẦM HƯƠNG QUAN ÂM')).toBe('Tượng trầm hương Quan Âm');
  expect(toSentenceCase('TRẦM KHÁNH HÒA')).toBe('Trầm Khánh Hòa');
});

test('pickDefaultVariant prefers an in-stock variant that has a price', () => {
  const v = (id: string, q: number, price: number) => ({ id, inventory_quantity: q, track_inventory: true, price }) as any;
  expect(pickDefaultVariant([v('a', 2, 0), v('b', 2, 300000)])?.id).toBe('b');
  expect(pickDefaultVariant([v('a', 2, 0), v('b', 0, 300000)])?.id).toBe('a');
});

test('toCategories counts types, sentence-cases labels, biggest first and Khác last', async () => {
  const { toCategories } = await import('./display');
  expect(toCategories(['NHANG', 'VÒNG TAY', 'Khác', 'VÒNG TAY', null, 'Khác', 'Khác'])).toEqual([
    { value: 'VÒNG TAY', label: 'Vòng tay', count: 2 },
    { value: 'NHANG', label: 'Nhang', count: 1 },
    { value: 'Khác', label: 'Khác', count: 3 },
  ]);
});
