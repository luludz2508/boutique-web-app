/**
 * Display helpers for product data (pure, unit-tested).
 */
import type { ProductVariant } from '@/lib/db/products';

/** Names that must stay capitalised after lower-casing product names. */
const PROPER_NOUNS = [
  'Sơn Hồng',
  'Khánh Hòa',
  'Khánh Hoà',
  'Quan Âm',
  'Di Lặc',
  'Phật',
  'Đà Nẵng',
  'Việt Nam',
  'Quảng Nam',
  'Phú Quốc',
];

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** "VÒNG TRẦM HƯƠNG SƠN HỒNG" → "Vòng trầm hương Sơn Hồng" (data from Haravan is all caps). */
export function toSentenceCase(s: string): string {
  let out = s.trim().toLocaleLowerCase('vi');
  if (!out) return '';
  for (const name of PROPER_NOUNS) {
    // whole words only; \p{L} so Vietnamese letters count as word characters
    const re = new RegExp(`(?<![\\p{L}])${escapeRe(name.toLocaleLowerCase('vi'))}(?![\\p{L}])`, 'gu');
    out = out.replace(re, name);
  }
  return out.charAt(0).toLocaleUpperCase('vi') + out.slice(1);
}

const vnd = new Intl.NumberFormat('vi-VN');

/** 2400000 → "2.400.000₫"; 0 / null → "Liên hệ" (price on request). */
export function formatPrice(price: number | null | undefined): string {
  const n = Number(price);
  if (!price || !Number.isFinite(n) || n <= 0) return 'Liên hệ';
  return `${vnd.format(n)}₫`;
}

/** Sold out only when stock is tracked and nothing is left. */
export function isSoldOut(v: Pick<ProductVariant, 'inventory_quantity' | 'track_inventory'>): boolean {
  return Boolean(v.track_inventory) && Number(v.inventory_quantity) <= 0;
}

/** First variant in stock, else the first variant, else null. */
export function pickDefaultVariant<T extends Pick<ProductVariant, 'inventory_quantity' | 'track_inventory'>>(
  variants: T[],
): T | null {
  if (variants.length === 0) return null;
  return variants.find((v) => !isSoldOut(v)) ?? variants[0];
}

/** Min/max of the real (non-zero) prices, or null when every price is 0/empty. */
export function productPriceRange(variants: Pick<ProductVariant, 'price'>[]): { min: number; max: number } | null {
  const prices = variants.map((v) => Number(v.price)).filter((p) => Number.isFinite(p) && p > 0);
  if (prices.length === 0) return null;
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
