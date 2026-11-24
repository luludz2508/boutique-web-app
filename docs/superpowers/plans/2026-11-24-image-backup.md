# Sao lưu ảnh sản phẩm (Giai đoạn 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Copy all 689 product images from `product.hstatic.net` into the Supabase Storage bucket `product-images` and repoint `product_images.url`, safely and reversibly.

**Architecture:** Pure planning/formatting functions in `scripts/backup-images/lib.ts` (unit-tested with Vitest); a thin IO runner in `scripts/backup-images/index.ts` that talks to Supabase with `@supabase/supabase-js` using the service role key from `.env.local`. No database schema changes.

**Tech Stack:** Node 24, TypeScript run via `tsx`, `@supabase/supabase-js` ^2.76, Vitest (new dev dependency), pnpm.

**Spec:** `docs/superpowers/specs/2026-11-24-haravan-backup-design.md` — section "Giai đoạn 1: Sao lưu ảnh hiện có".

## Global Constraints

- Bucket: `product-images`, public. Object path: `haravan/{original file name}` (last path segment of the hstatic URL, unchanged).
- Only rows whose URL host ends with `hstatic.net` are processed.
- Concurrency ~5, 3 attempts per download/upload, keep the source `content-type`.
- Manifest `{image_id, product_id, old_url, new_url}[]` is written to bucket path `backups/images-manifest-YYYY-MM-DD.json` **and** locally to `backups/images-manifest-YYYY-MM-DD.json` (gitignored) **before** any `url` is changed.
- `url` is changed only for images whose upload succeeded and whose new public URL answers HTTP 200.
- Flags: `--dry-run` (HEAD-check each hstatic URL, count, no writes), `--rollback <manifest-path>` (restore `old_url`).
- Zero-price report: `docs/reports/zero-price-variants-YYYY-MM-DD.csv`, columns `product_name,variant,sku,price`.
- Never print `SUPABASE_SERVICE_ROLE_KEY`. Never delete rows or storage objects.
- Keep both hstatic hosts in `next.config.mjs` `images.remotePatterns`; add `hgpthqkuinupxhzkbtxn.supabase.co`.

## Review Focus

1. Re-running after a partial failure — already-uploaded files are skipped, already-relinked rows (URL no longer hstatic) are left alone.
2. hstatic URL that 404s — reported as failed, row keeps its old URL, run continues.
3. Protocol-relative or query-string URLs (`//product.hstatic.net/...jpg?v=2`) — path still `haravan/<name>.jpg`.
4. Two rows pointing at the same hstatic file — one upload, both rows relinked.
5. Product/variant names containing commas or quotes in the CSV — properly quoted.

Each is pinned by a test in Task 1.

---

### Task 1: Pure helpers + tests

**Files:**
- Modify: `package.json` (devDependency `vitest`, scripts `"test": "vitest run"`, `"backup:images": "tsx scripts/backup-images/index.ts"`)
- Modify: `.gitignore` (add `backups/`)
- Create: `scripts/backup-images/lib.ts`
- Test: `scripts/backup-images/lib.test.ts`

**Interfaces:**
- Produces:
  - `type ImageRow = { id: string; product_id: string; url: string }`
  - `type ManifestEntry = { image_id: string; product_id: string; old_url: string; new_url: string }`
  - `isHstaticUrl(url: string): boolean`
  - `storagePathFor(url: string): string` → `haravan/<file name>`
  - `planBackup(rows: ImageRow[], existingPaths: Set<string>, publicBase: string): { uploads: { path: string; sourceUrl: string }[]; manifest: ManifestEntry[]; skippedNonHstatic: number }` — `uploads` deduplicated by path and excludes paths in `existingPaths`; `manifest` has one entry per hstatic row; `new_url = ${publicBase}/${path}`.
  - `zeroPriceCsv(rows: { product_name: string; variant: string; sku: string | null; price: number | null }[]): string`
  - `parseArgs(argv: string[]): { dryRun: boolean; rollback?: string }`

- [ ] **Step 1: Install deps** — `pnpm install && pnpm add -D vitest`. Expected: exits 0.
- [ ] **Step 2: Write failing tests** in `lib.test.ts`:

```ts
const BASE = 'https://x.supabase.co/storage/v1/object/public/product-images';
test('isHstaticUrl', () => {
  expect(isHstaticUrl('https://product.hstatic.net/2000/product/a_1.jpg')).toBe(true);
  expect(isHstaticUrl('//file.hstatic.net/2000/a.png')).toBe(true);
  expect(isHstaticUrl(`${BASE}/haravan/a_1.jpg`)).toBe(false);
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
  expect(plan.manifest[2].new_url).toBe(`${BASE}/haravan/y.jpg`);
  expect(plan.skippedNonHstatic).toBe(1);
});
test('zeroPriceCsv quotes commas and quotes', () => {
  expect(zeroPriceCsv([{ product_name: 'Vòng "A", 12li', variant: '12mm', sku: null, price: 0 }]))
    .toBe('product_name,variant,sku,price\n"Vòng ""A"", 12li",12mm,,0\n');
});
test('parseArgs', () => {
  expect(parseArgs(['--dry-run'])).toEqual({ dryRun: true });
  expect(parseArgs(['--rollback', 'backups/m.json'])).toEqual({ dryRun: false, rollback: 'backups/m.json' });
});
```

- [ ] **Step 3: Run** `pnpm test` — Expected: FAIL (module/functions missing).
- [ ] **Step 4: Implement** the five functions in `lib.ts` (use `new URL(url.startsWith('//') ? 'https:' + url : url)`; file name = last segment of `pathname`).
- [ ] **Step 5: Run** `pnpm test` — Expected: all pass.
- [ ] **Step 6: Commit** — `git add package.json pnpm-lock.yaml .gitignore scripts/backup-images/lib.ts scripts/backup-images/lib.test.ts && git commit -m "feat: add image backup planning helpers"`

### Task 2: Runner script

**Files:**
- Create: `scripts/backup-images/index.ts`

**Interfaces:**
- Consumes: everything Task 1 produces.
- Produces: CLI `pnpm backup:images [--dry-run | --rollback <path>]`.

Behavior, in order (load `.env.local` with `process.loadEnvFile('.env.local')`; build client with `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`; `publicBase = ${URL}/storage/v1/object/public/product-images`):

1. `--rollback <path>`: read manifest, `update({ url: old_url }).eq('id', image_id)` for each entry, print count, exit.
2. Read all `product_images` (`id, product_id, url`) and all variants joined to product name for the zero-price CSV; write the CSV to `docs/reports/zero-price-variants-YYYY-MM-DD.csv`.
3. `--dry-run`: HEAD each unique hstatic URL (concurrency 5); print `{ rows, uniqueFiles, reachable, unreachable: [urls] }`; exit without writing anything else (CSV in step 2 is skipped in dry-run too — print the zero-price count instead).
4. Ensure bucket: `storage.getBucket('product-images')`, else `createBucket('product-images', { public: true })`.
5. List existing objects under `haravan/` (paginate `list` with `limit: 1000`) → `existingPaths`.
6. `planBackup(...)`; download each upload's source (3 attempts), `upload(path, bytes, { contentType, upsert: false })`; collect failed paths.
7. Write manifest locally and to `backups/images-manifest-YYYY-MM-DD.json` in the bucket.
8. For manifest entries whose path is not failed: HEAD `new_url`; if 200, update the row's `url`. Print `{ uploaded, skippedExisting, relinked, failed: [...] }`.

- [ ] **Step 1: Implement `index.ts`** per the list above, using a small `pLimit`-style helper inline (no new dependency).
- [ ] **Step 2: Typecheck** — `pnpm tsc --noEmit -p . 2>&1 | grep backup-images` — Expected: no output.
- [ ] **Step 3: Dry run** — `pnpm backup:images --dry-run` — Expected: `rows: 689`, `uniqueFiles` ≤ 689, `unreachable` listed (ideally empty). **Stop and show the user the output before the real run.**
- [ ] **Step 4: Commit** — `git add scripts/backup-images/index.ts && git commit -m "feat: add image backup runner"`

### Task 3: Next.js image host + real run

**Files:**
- Modify: `next.config.mjs` (`images.remotePatterns`: add `{ protocol: 'https', hostname: 'hgpthqkuinupxhzkbtxn.supabase.co', pathname: '/storage/v1/object/public/**' }`)

- [ ] **Step 1: Add the remote pattern.**
- [ ] **Step 2: Real run (only after the user approves the dry-run output)** — `pnpm backup:images`. Expected: `failed: []`, `relinked` equals manifest length.
- [ ] **Step 3: Re-run** `pnpm backup:images` — Expected: `uploaded: 0`, `relinked: 0` (idempotent).
- [ ] **Step 4: Verify in DB** — re-run the read-only check: all `product_images.url` hosts are `hgpthqkuinupxhzkbtxn.supabase.co`.
- [ ] **Step 5: Verify in app** — `pnpm dev`, open `/products` and one product page; images render; no console errors for image loads.
- [ ] **Step 6: Commit** — `git add next.config.mjs docs/reports/ && git commit -m "feat: serve product images from Supabase Storage"`
