import { expect, test } from 'vitest';
import { formatPriceInput, parsePrice } from './price';

test.each([
  ['520.000', 520000],
  ['520,000đ', 520000],
  [' 1 200 000 ', 1200000],
  ['1.200.000 ₫', 1200000],
  ['', 0],
  ['0', 0],
  ['abc', null],
  ['-5', null],
  ['1.5', null],
] as const)('parsePrice(%j) → %j', (input, out) => {
  expect(parsePrice(input)).toBe(out);
});

test('formatPriceInput groups thousands with dots', () => {
  expect(formatPriceInput(1200000)).toBe('1.200.000');
  expect(formatPriceInput(0)).toBe('0');
});
