/**
 * Pure helpers for backing up product images from Haravan's CDN (hstatic.net)
 * into Supabase Storage. No IO here; see index.ts for the runner.
 */

export type ImageRow = { id: string; product_id: string; url: string };

export type ManifestEntry = {
  image_id: string;
  product_id: string;
  old_url: string;
  new_url: string;
};

export type ZeroPriceRow = {
  product_name: string;
  variant: string;
  sku: string | null;
  price: number | null;
};

function parseUrl(url: string): URL | null {
  try {
    return new URL(url.startsWith('//') ? `https:${url}` : url);
  } catch {
    return null;
  }
}

export function isHstaticUrl(url: string): boolean {
  const host = parseUrl(url)?.hostname ?? '';
  return host === 'hstatic.net' || host.endsWith('.hstatic.net');
}

/** `haravan/<original file name>`; hstatic file names already carry a unique hash. */
export function storagePathFor(url: string): string {
  const parsed = parseUrl(url);
  if (!parsed) throw new Error(`Invalid image URL: ${url}`);
  const name = decodeURIComponent(parsed.pathname.split('/').filter(Boolean).pop() ?? '');
  if (!name) throw new Error(`Image URL has no file name: ${url}`);
  return `haravan/${name}`;
}

export function planBackup(
  rows: ImageRow[],
  existingPaths: Set<string>,
  publicBase: string,
): {
  uploads: { path: string; sourceUrl: string }[];
  manifest: ManifestEntry[];
  skippedNonHstatic: number;
} {
  const uploads: { path: string; sourceUrl: string }[] = [];
  const queued = new Set<string>();
  const manifest: ManifestEntry[] = [];
  let skippedNonHstatic = 0;

  for (const row of rows) {
    if (!isHstaticUrl(row.url)) {
      skippedNonHstatic++;
      continue;
    }
    const path = storagePathFor(row.url);
    if (!existingPaths.has(path) && !queued.has(path)) {
      queued.add(path);
      uploads.push({ path, sourceUrl: row.url });
    }
    manifest.push({
      image_id: row.id,
      product_id: row.product_id,
      old_url: row.url,
      new_url: `${publicBase}/${path}`,
    });
  }
  return { uploads, manifest, skippedNonHstatic };
}

function csvCell(value: string | number | null): string {
  if (value === null || value === undefined) return '';
  const s = String(value);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function zeroPriceCsv(rows: ZeroPriceRow[]): string {
  const lines = ['product_name,variant,sku,price'];
  for (const r of rows) {
    lines.push([r.product_name, r.variant, r.sku, r.price].map(csvCell).join(','));
  }
  return `${lines.join('\n')}\n`;
}

/** The slice of the Supabase client swapImageUrl needs (keeps it testable). */
export type UrlUpdater = {
  from(table: 'product_images'): {
    update(patch: { url: string }): {
      eq(col: string, val: string): {
        eq(col: string, val: string): {
          select(cols: 'id'): PromiseLike<{ data: { id: string }[] | null; error: { message: string } | null }>;
        };
      };
    };
  };
};

/**
 * Compare-and-set: change the image URL only if the row still holds `from`.
 * Returns 'changed' when someone edited the row since, so newer data is never clobbered.
 */
export async function swapImageUrl(
  db: UrlUpdater,
  id: string,
  from: string,
  to: string,
): Promise<'updated' | 'changed'> {
  const { data, error } = await db.from('product_images').update({ url: to }).eq('id', id).eq('url', from).select('id');
  if (error) throw new Error(error.message);
  return data && data.length > 0 ? 'updated' : 'changed';
}

/** Timestamped so a later run never overwrites an earlier run's manifest. */
export function manifestName(now: Date): string {
  const stamp = now.toISOString().slice(0, 19).replace(/:/g, '-');
  return `images-manifest-${stamp}Z.json`;
}

export function parseArgs(argv: string[]): { dryRun: boolean; rollback?: string } {
  const result: { dryRun: boolean; rollback?: string } = { dryRun: argv.includes('--dry-run') };
  const i = argv.indexOf('--rollback');
  if (i !== -1) {
    const path = argv[i + 1];
    if (!path || path.startsWith('--')) throw new Error('--rollback needs a manifest path');
    result.rollback = path;
  }
  return result;
}
