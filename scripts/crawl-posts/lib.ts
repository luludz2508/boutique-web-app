/**
 * Pure helpers for backing up blog posts from the Haravan storefront
 * (tramhuongsonhong.com) as Markdown. No IO here; see index.ts.
 */
import * as cheerio from 'cheerio';

export type Article = {
  title: string;
  author: string | null;
  date: string | null;
  cover: string | null;
  bodyHtml: string;
  images: string[];
};

const absolute = (src: string) => (src.startsWith('//') ? `https:${src}` : src);

/** "30 Tháng 04, 2023" → "2023-04-30" */
export function parseVnDate(text: string): string | null {
  const m = text.trim().match(/^(\d{1,2})\s+Tháng\s+(\d{1,2}),\s*(\d{4})$/i);
  if (!m) return null;
  return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
}

/** Unique article paths `/blogs/<blog>/<slug>` found in a listing page. */
export function articleLinks(html: string): string[] {
  const $ = cheerio.load(html);
  const seen = new Set<string>();
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') ?? '';
    const m = href.match(/^(?:https?:\/\/[^/]+)?(\/blogs\/[a-z0-9-]+\/[a-z0-9-]+)(?:[?#].*)?$/i);
    if (m) seen.add(m[1]);
  });
  return [...seen];
}

export function parseArticle(html: string): Article {
  const $ = cheerio.load(html);
  const head = $('.heading-article');
  const author = head.find('.author').text().replace(/^\s*bởi:\s*/i, '').trim() || null;
  const dateText = head.find('time').attr('datetime') ?? head.find('time').text();
  const coverSrc = $('.article-content .background-img img').attr('src');
  const body = $('.article-body').first();
  const images = body
    .find('img[src]')
    .map((_, el) => absolute($(el).attr('src') as string))
    .get();
  return {
    title: head.find('h1').text().trim(),
    author,
    date: parseVnDate(dateText),
    cover: coverSrc ? absolute(coverSrc) : null,
    bodyHtml: body.html() ?? '',
    images: [...new Set(images)],
  };
}

/** YAML frontmatter with every value JSON-quoted (valid YAML, safe for quotes/colons). */
export function frontmatter(fields: Record<string, string | null>): string {
  const lines = Object.entries(fields).map(([k, v]) => `${k}: ${v === null ? 'null' : JSON.stringify(v)}`);
  return `---\n${lines.join('\n')}\n---\n`;
}
