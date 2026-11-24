/**
 * Back up every blog post from tramhuongsonhong.com as Markdown.
 *
 *   pnpm crawl:posts
 *
 * Writes docs/posts/<blog>/<slug>.md. Images (cover + body) are copied to the
 * Supabase bucket `product-images` under `posts/<file name>` and the Markdown
 * links to those copies, so nothing depends on Haravan's CDN.
 * Re-runnable: existing images are skipped, Markdown is rewritten.
 */
import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import TurndownService from 'turndown';
import { articleLinks, frontmatter, parseArticle } from './lib';

const SITE = 'https://tramhuongsonhong.com';
const OUT = path.join('docs', 'posts');
const BUCKET = 'product-images';
const MAX_PAGES = 50;

process.loadEnvFile('.env.local');
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, '');
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
const publicBase = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}`;

async function get(url: string): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'tramhuong-backup/1.0' } });
      if (res.status >= 500 && attempt < 3) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (err) {
      if (attempt >= 3) throw err;
      await new Promise((r) => setTimeout(r, 800 * attempt));
    }
  }
}

async function existingPostImages(): Promise<Set<string>> {
  const names = new Set<string>();
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await supabase.storage.from(BUCKET).list('posts', { limit: 1000, offset });
    if (error) throw new Error(`Listing bucket: ${error.message}`);
    for (const o of data ?? []) names.add(o.name);
    if (!data || data.length < 1000) return names;
  }
}

/** Copy one image into the bucket; returns the new public URL, or the original URL on failure. */
async function copyImage(src: string, existing: Set<string>, failed: string[]): Promise<string> {
  const name = decodeURIComponent(new URL(src).pathname.split('/').pop() ?? '');
  if (!name) return src;
  const objectPath = `posts/${name}`;
  const newUrl = `${publicBase}/posts/${encodeURIComponent(name)}`;
  if (existing.has(name)) return newUrl;
  try {
    const res = await get(src);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const body = new Uint8Array(await res.arrayBuffer());
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(objectPath, body, { contentType: res.headers.get('content-type') ?? undefined, upsert: false });
    if (error && !/exists|duplicate/i.test(error.message)) throw new Error(error.message);
    existing.add(name);
    return newUrl;
  } catch (err) {
    failed.push(`${src} (${(err as Error).message})`);
    return src;
  }
}

async function main() {
  // 1. Collect article links from the "all posts" listing until a page adds nothing new.
  const links = new Set<string>();
  for (let page = 1; page <= MAX_PAGES; page++) {
    const res = await get(`${SITE}/blogs/all?page=${page}`);
    if (!res.ok) break;
    const before = links.size;
    for (const l of articleLinks(await res.text())) links.add(l);
    if (links.size === before) break;
  }
  console.log(`Found ${links.size} articles`);
  if (links.size === 0) throw new Error('No articles found; site layout may have changed. Nothing written.');

  const turndown = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-' });
  const existing = await existingPostImages();
  const failedImages: string[] = [];
  const failedPosts: string[] = [];
  const index: { blog: string; slug: string; title: string; date: string | null }[] = [];

  for (const link of [...links].sort()) {
    const [, , blog, slug] = link.split('/');
    try {
      const res = await get(SITE + link);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const article = parseArticle(await res.text());
      if (!article.title || !article.bodyHtml.trim()) throw new Error('could not find title/body');

      // Copy images, then point the HTML at the copies before converting.
      let html = article.bodyHtml;
      for (const src of article.images) {
        const copy = await copyImage(src, existing, failedImages);
        html = html.split(src).join(copy).split(src.replace(/^https:/, '')).join(copy);
      }
      // Site-relative links would break outside the store; make them absolute.
      html = html.replace(/href="\/(?!\/)/g, `href="${SITE}/`);
      const cover = article.cover ? await copyImage(article.cover, existing, failedImages) : null;

      const md =
        frontmatter({
          title: article.title,
          date: article.date,
          author: article.author,
          blog,
          slug,
          source_url: SITE + link,
          cover,
          original_cover: article.cover,
        }) +
        `\n# ${article.title}\n\n` +
        (cover ? `![${article.title}](${cover})\n\n` : '') +
        turndown.turndown(html).trim() +
        '\n';

      const file = path.join(OUT, blog, `${slug}.md`);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, md);
      index.push({ blog, slug, title: article.title, date: article.date });
      console.log(`  ✓ ${blog}/${slug}`);
    } catch (err) {
      failedPosts.push(`${link} (${(err as Error).message})`);
      console.error(`  ✗ ${link}: ${(err as Error).message}`);
    }
  }

  index.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  const readme =
    `# Bài viết sao lưu từ tramhuongsonhong.com\n\n` +
    `Tạo bởi \`pnpm crawl:posts\`. Ảnh nằm trong Supabase Storage (\`${BUCKET}/posts/\`).\n\n` +
    index.map((p) => `- ${p.date ?? '—'} · [${p.title}](${p.blog}/${p.slug}.md)`).join('\n') +
    '\n';
  fs.writeFileSync(path.join(OUT, 'README.md'), readme);

  console.log({ articles: links.size, saved: index.length, failedPosts, failedImages });
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
