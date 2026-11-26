/**
 * Turns Haravan's all-caps names and copy-pasted description HTML into something the
 * detail page can lay out: a short title, a detail line, a spec list and a clean body.
 * Pure string work (runs on the server, no DOM).
 */
import { toSentenceCase } from './display';

export type Spec = { label: string; value: string };

/** "TÊN - MẪU 1 - LOẠI 1" → { title: "Tên", detail: "Mẫu 1 · Loại 1" } */
export function splitProductName(name: string): { title: string; detail: string } {
  const parts = name
    .replace(/ /g, ' ')
    .split(/\s+-\s+/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  const [first = '', ...rest] = parts;
  return { title: toSentenceCase(first), detail: rest.map(toSentenceCase).join(' · ') };
}

const decode = (s: string) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

/** Cell HTML → plain text, keeping <br> as line breaks. */
const cellText = (html: string) =>
  decode(html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, ''))
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');

/** Text that is shouting: has letters and none of them lower case. */
const isAllCaps = (t: string) => /\p{L}{2}/u.test(t) && t === t.toLocaleUpperCase('vi') && t !== t.toLocaleLowerCase('vi');

export function splitDescription(html: string | null | undefined): { specs: Spec[]; body: string } {
  if (!html) return { specs: [], body: '' };
  let body = html;
  const specs: Spec[] = [];

  // first table = the spec sheet
  const table = body.match(/<table[\s\S]*?<\/table>/i);
  if (table) {
    for (const row of table[0].match(/<tr[\s\S]*?<\/tr>/gi) ?? []) {
      const cells = row.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi) ?? [];
      if (cells.length < 2) continue;
      const inner = (c: string) => c.replace(/^<t[dh][^>]*>|<\/t[dh]>$/gi, '');
      const label = cellText(inner(cells[0] ?? ''));
      const value = cellText(inner(cells[1] ?? ''));
      if (label && value) specs.push({ label: isAllCaps(label) ? toSentenceCase(label) : label, value });
    }
    body = body.replace(table[0], '');
  }

  body = body
    // the leading h1 repeats the product name
    .replace(/^\s*<h1[\s\S]*?<\/h1>/i, '')
    // the "THÔNG TIN SẢN PHẨM" heading that introduced the table
    .replace(/<(p|h[1-6])[^>]*>(?:\s|<[^>]+>)*THÔNG TIN SẢN PHẨM(?:\s|<[^>]+>)*<\/\1>/gi, '')
    // "MÔ TẢ (CHI TIẾT) SẢN PHẨM" repeats the section label the page already shows
    .replace(/<(p|h[1-6])[^>]*>(?:\s|<[^>]+>)*MÔ TẢ(?: CHI TIẾT)? SẢN PHẨM(?:\s|<[^>]+>)*<\/\1>/gi, '')
    // Haravan colours and alignment fight the page's own typography
    .replace(/\s*style="[^"]*"/gi, '')
    // empty spacer paragraphs / divs
    .replace(/<(p|div)>(?:\s|&nbsp;|<br\s*\/?>)*<\/\1>/gi, '')
    .trim();

  // shouting headings and bold lead-ins → sentence case (only text nodes that are all caps)
  body = body.replace(/>([^<>]+)</g, (m, text: string) => (isAllCaps(text.trim()) ? `>${toSentenceCase(text)}<` : m));

  return { specs, body };
}

/** Specs saved in the admin win; older products fall back to the table inside their Haravan description. */
export function pickSpecs(specs: Spec[] | null | undefined, html: string | null | undefined): { specs: Spec[]; body: string } {
  if (specs && specs.length > 0) return { specs, body: html ?? '' };
  return splitDescription(html);
}
