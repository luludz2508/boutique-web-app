import { slugify } from './slug';
import type { AdminListItem, ListQuery } from './types';

/** Filters the admin list: search by name or SKU ignoring accents/case; archived only when asked for. */
export function filterAdminList(items: AdminListItem[], q: ListQuery): AdminListItem[] {
  const status = q.status ?? 'all';
  const needle = q.search?.trim() ? slugify(q.search) : '';
  return items.filter((p) => {
    if (status === 'all' ? p.status === 'archived' : p.status !== status) return false;
    if (q.type && (p.product_type ?? '') !== q.type) return false;
    if (!needle) return true;
    const hay = [p.name_vi, ...p.variants.map((v) => v.sku ?? '')].map((s) => slugify(s)).join(' ');
    return hay.includes(needle);
  });
}
