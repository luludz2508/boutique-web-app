/**
 * Reads a price typed the Vietnamese way ("520.000", "520,000đ", "1 200 000 ₫").
 * Dots and commas are thousands separators — prices are whole đồng.
 * Empty means 0 ("Liên hệ"); anything else that isn't a whole number → null.
 */
export function parsePrice(input: string): number | null {
  const s = input.replace(/[\s đ₫]/gi, '');
  if (s === '') return 0;
  // separators must split groups of exactly three digits
  if (!/^\d{1,3}([.,]\d{3})*$|^\d+$/.test(s)) return null;
  return Number(s.replace(/[.,]/g, ''));
}

/** 1200000 → "1.200.000" */
export function formatPriceInput(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
