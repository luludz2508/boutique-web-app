import { expect, test } from 'vitest';
import { isHstaticUrl, manifestName, parseArgs, planBackup, storagePathFor, zeroPriceCsv } from './lib';

const BASE = 'https://x.supabase.co/storage/v1/object/public/product-images';

test('isHstaticUrl', () => {
  expect(isHstaticUrl('https://product.hstatic.net/2000/product/a_1.jpg')).toBe(true);
  expect(isHstaticUrl('//file.hstatic.net/2000/a.png')).toBe(true);
  expect(isHstaticUrl(`${BASE}/haravan/a_1.jpg`)).toBe(false);
  expect(isHstaticUrl('not a url')).toBe(false);
});

test('storagePathFor strips protocol-relative prefix and query', () => {
  expect(storagePathFor('//product.hstatic.net/2000/product/28_4357.jpg?v=2')).toBe('haravan/28_4357.jpg');
});

test('planBackup dedupes, skips existing, leaves relinked rows', () => {
  const rows = [
    { id: 'i1', product_id: 'p1', url: 'https://product.hstatic.net/a/product/x.jpg' },
    { id: 'i2', product_id: 'p2', url: 'https://product.hstatic.net/a/product/x.jpg' },
    { id: 'i3', product_id: 'p3', url: 'https://product.hstatic.net/a/product/y.jpg' },
    { id: 'i4', product_id: 'p4', url: `${BASE}/haravan/z.jpg` },
  ];
  const plan = planBackup(rows, new Set(['haravan/y.jpg']), BASE);
  expect(plan.uploads).toEqual([{ path: 'haravan/x.jpg', sourceUrl: rows[0].url }]);
  expect(plan.manifest.map((m) => m.image_id)).toEqual(['i1', 'i2', 'i3']);
  expect(plan.manifest[2]).toEqual({
    image_id: 'i3',
    product_id: 'p3',
    old_url: rows[2].url,
    new_url: `${BASE}/haravan/y.jpg`,
  });
  expect(plan.skippedNonHstatic).toBe(1);
});

test('zeroPriceCsv quotes commas and quotes', () => {
  expect(zeroPriceCsv([{ product_name: 'Vòng "A", 12li', variant: '12mm', sku: null, price: 0 }])).toBe(
    'product_name,variant,sku,price\n"Vòng ""A"", 12li",12mm,,0\n',
  );
});

test('parseArgs', () => {
  expect(parseArgs([])).toEqual({ dryRun: false });
  expect(parseArgs(['--dry-run'])).toEqual({ dryRun: true });
  expect(parseArgs(['--rollback', 'backups/m.json'])).toEqual({ dryRun: false, rollback: 'backups/m.json' });
});

test('manifestName is unique per run so re-runs never overwrite an earlier manifest', () => {
  expect(manifestName(new Date('2026-11-24T11:20:05.123Z'))).toBe('images-manifest-2026-11-24T11-20-05Z.json');
});
