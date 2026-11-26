import { expect, test } from 'vitest';
import { slugify, uniqueSlug } from './slug';

test('slugify strips Vietnamese accents and punctuation', () => {
  expect(slugify('VÒNG TRẦM HƯƠNG 108 HẠT - 6LI')).toBe('vong-tram-huong-108-hat-6li');
  expect(slugify('Đế dát vàng  24K!!')).toBe('de-dat-vang-24k');
});

test('slugify falls back when nothing is left', () => {
  expect(slugify('   ')).toBe('san-pham');
});

test('uniqueSlug appends the next free number', () => {
  expect(uniqueSlug('binh-hoa', new Set(['binh-hoa', 'binh-hoa-2']))).toBe('binh-hoa-3');
  expect(uniqueSlug('moi', new Set())).toBe('moi');
});

test('uniqueSlug avoids slugs that only exist as redirects', () => {
  // takenSlugs() unions product slugs with redirect old_slugs
  expect(uniqueSlug('ten-cu', new Set(['ten-cu']))).toBe('ten-cu-2');
});
