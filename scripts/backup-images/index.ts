/**
 * Back up product images from Haravan's CDN into Supabase Storage.
 *
 *   pnpm backup:images --dry-run              check every hstatic link, write nothing
 *   pnpm backup:images                        upload, write manifest, repoint product_images.url
 *   pnpm backup:images --rollback <manifest>  restore the old URLs from a manifest
 *
 * Never deletes rows or storage objects. Never prints keys.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { type ImageRow, type ManifestEntry, isHstaticUrl, manifestName, parseArgs, planBackup, zeroPriceCsv } from './lib';

const BUCKET = 'product-images';
const CONCURRENCY = 5;
const ATTEMPTS = 3;
const PAGE = 1000;

process.loadEnvFile('.env.local');
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
const publicBase = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`;
const today = new Date().toISOString().slice(0, 10);

const toHttps = (url: string) => (url.startsWith('//') ? `https:${url}` : url);

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
    }
  });
  await Promise.all(workers);
  return results;
}

async function retry<T>(fn: () => Promise<T>): Promise<T> {
  let last: unknown;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      return await fn();
    } catch (err) {
      last = err;
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }
  throw last;
}

async function isReachable(url: string): Promise<boolean> {
  try {
    return await retry(async () => {
      const res = await fetch(toHttps(url), { method: 'HEAD' });
      if (res.status >= 500) throw new Error(`HTTP ${res.status}`);
      return res.ok;
    });
  } catch {
    return false;
  }
}

async function fetchAll<T>(table: string, columns: string): Promise<T[]> {
  const rows: T[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase.from(table).select(columns).range(from, from + PAGE - 1);
    if (error) throw new Error(`Reading ${table}: ${error.message}`);
    rows.push(...((data ?? []) as T[]));
    if (!data || data.length < PAGE) return rows;
  }
}

type VariantRow = {
  price: number | null;
  sku: string | null;
  option1_value: string | null;
  option2_value: string | null;
  option3_value: string | null;
  products: { name_vi: string } | null;
};

async function zeroPriceReport(write: boolean): Promise<number> {
  const variants = await fetchAll<VariantRow>(
    'product_variants',
    'price, sku, option1_value, option2_value, option3_value, products(name_vi)',
  );
  const zero = variants
    .filter((v) => !Number(v.price))
    .map((v) => ({
      product_name: v.products?.name_vi ?? '',
      variant: [v.option1_value, v.option2_value, v.option3_value].filter(Boolean).join(' / '),
      sku: v.sku,
      price: v.price === null ? null : Number(v.price),
    }))
    .sort((a, b) => a.product_name.localeCompare(b.product_name, 'vi'));
  if (write) {
    const file = path.join('docs', 'reports', `zero-price-variants-${today}.csv`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, zeroPriceCsv(zero));
    console.log(`Zero-price variants: ${zero.length} → ${file}`);
  } else {
    console.log(`Zero-price variants: ${zero.length}`);
  }
  return zero.length;
}

async function rollback(manifestPath: string) {
  const manifest: ManifestEntry[] = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  let restored = 0;
  const failed: string[] = [];
  await mapLimit(manifest, CONCURRENCY, async (m) => {
    const { error } = await supabase.from('product_images').update({ url: m.old_url }).eq('id', m.image_id);
    if (error) failed.push(`${m.image_id}: ${error.message}`);
    else restored++;
  });
  console.log({ restored, failed });
}

async function existingPaths(): Promise<Set<string>> {
  const paths = new Set<string>();
  for (let offset = 0; ; offset += PAGE) {
    const { data, error } = await supabase.storage.from(BUCKET).list('haravan', { limit: PAGE, offset });
    if (error) throw new Error(`Listing bucket: ${error.message}`);
    for (const obj of data ?? []) paths.add(`haravan/${obj.name}`);
    if (!data || data.length < PAGE) return paths;
  }
}

async function ensureBucket() {
  const { data } = await supabase.storage.getBucket(BUCKET);
  if (data) return;
  const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
  if (error) throw new Error(`Creating bucket: ${error.message}`);
  console.log(`Created public bucket "${BUCKET}"`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.rollback) return rollback(args.rollback);

  const rows = await fetchAll<ImageRow>('product_images', 'id, product_id, url');
  const hstatic = rows.filter((r) => isHstaticUrl(r.url));
  const uniqueUrls = [...new Set(hstatic.map((r) => r.url))];

  if (args.dryRun) {
    const reachable = await mapLimit(uniqueUrls, CONCURRENCY, isReachable);
    const unreachable = uniqueUrls.filter((_, i) => !reachable[i]);
    await zeroPriceReport(false);
    console.log({
      mode: 'dry-run',
      rows: rows.length,
      hstaticRows: hstatic.length,
      alreadyMoved: rows.length - hstatic.length,
      uniqueFiles: uniqueUrls.length,
      reachable: uniqueUrls.length - unreachable.length,
      unreachable,
    });
    return;
  }

  await zeroPriceReport(true);
  await ensureBucket();
  const plan = planBackup(rows, await existingPaths(), publicBase);

  const failed = new Set<string>();
  let uploaded = 0;
  let done = 0;
  await mapLimit(plan.uploads, CONCURRENCY, async ({ path: objectPath, sourceUrl }) => {
    try {
      await retry(async () => {
        const res = await fetch(toHttps(sourceUrl));
        if (!res.ok) throw new Error(`Download HTTP ${res.status}`);
        const body = new Uint8Array(await res.arrayBuffer());
        const contentType = res.headers.get('content-type') ?? 'application/octet-stream';
        const { error } = await supabase.storage.from(BUCKET).upload(objectPath, body, { contentType, upsert: false });
        if (error && !/exists|duplicate/i.test(error.message)) throw new Error(error.message);
      });
      uploaded++;
    } catch (err) {
      failed.add(objectPath);
      console.error(`Failed ${sourceUrl}: ${(err as Error).message}`);
    }
    if (++done % 50 === 0) console.log(`  ${done}/${plan.uploads.length} files`);
  });

  if (plan.manifest.length === 0) {
    console.log({ rows: rows.length, uploaded, alreadyMoved: plan.skippedNonHstatic, failed: [...failed], note: 'Nothing to relink; no manifest written.' });
    return;
  }

  // Manifest first, then relink. Never overwrite an earlier manifest.
  const name = manifestName(new Date());
  const manifestJson = JSON.stringify(plan.manifest, null, 2);
  fs.mkdirSync('backups', { recursive: true });
  fs.writeFileSync(path.join('backups', name), manifestJson, { flag: 'wx' });
  const { error: mErr } = await supabase.storage
    .from(BUCKET)
    .upload(`backups/${name}`, manifestJson, { contentType: 'application/json', upsert: false });
  if (mErr) throw new Error(`Saving manifest to bucket: ${mErr.message} (local copy kept, no URLs changed)`);

  let relinked = 0;
  const notRelinked: string[] = [];
  await mapLimit(plan.manifest, CONCURRENCY, async (m) => {
    const objectPath = m.new_url.slice(publicBase.length + 1);
    if (failed.has(objectPath) || !(await isReachable(m.new_url))) {
      notRelinked.push(m.old_url);
      return;
    }
    const { error } = await supabase.from('product_images').update({ url: m.new_url }).eq('id', m.image_id);
    if (error) notRelinked.push(`${m.old_url} (${error.message})`);
    else relinked++;
  });

  console.log({
    rows: rows.length,
    uploaded,
    skippedExisting: plan.manifest.length ? new Set(plan.manifest.map((m) => m.new_url)).size - plan.uploads.length : 0,
    relinked,
    alreadyMoved: plan.skippedNonHstatic,
    manifest: `backups/${name}`,
    failed: [...failed],
    notRelinked,
  });
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
