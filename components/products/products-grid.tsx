'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/ink';
import type { CardProduct } from '@/lib/catalog';
import { ProductCard } from './product-card';

type Props = {
  /** first page, rendered on the server */
  initial: CardProduct[];
  total: number;
  /** the list's type/search/sort as a query string, e.g. "type=NHANG&sort=price-asc" */
  query: string;
};

type Cached = { items: CardProduct[]; total: number };
const cacheKey = (query: string) => `products:${query}`;

/**
 * Product grid that loads the next page when the reader nears the bottom.
 * Loaded pages are kept for the tab session, so "back" from a product returns to the same spot.
 */
export function ProductsGrid({ initial, total: initialTotal, query }: Props) {
  const [items, setItems] = useState(initial);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const done = items.length >= total;

  // restore what this tab had already loaded for the same list
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(cacheKey(query));
      const cached = raw ? (JSON.parse(raw) as Cached) : null;
      if (cached && cached.items.length > initial.length) {
        setItems(cached.items);
        setTotal(cached.total);
      }
    } catch {
      // storage blocked or corrupt: start from the first page
    }
  }, [query, initial.length]);

  const loadMore = useCallback(async () => {
    if (busy.current || done) return;
    busy.current = true;
    setLoading(true);
    setFailed(false);
    try {
      const params = new URLSearchParams(query);
      params.set('offset', String(items.length));
      const res = await fetch(`/api/products/page?${params}`);
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { items: CardProduct[]; total: number };
      // guard against duplicates if the catalogue changed between pages
      const seen = new Set(items.map((p) => p.id));
      const next = [...items, ...data.items.filter((p) => !seen.has(p.id))];
      const nextTotal = data.items.length ? data.total : next.length;
      setItems(next);
      setTotal(nextTotal);
      try {
        sessionStorage.setItem(cacheKey(query), JSON.stringify({ items: next, total: nextTotal } satisfies Cached));
      } catch {
        // storage full or blocked: scrolling still works, only "back" restore is lost
      }
    } catch {
      setFailed(true);
    } finally {
      busy.current = false;
      setLoading(false);
    }
  }, [done, items, query]);

  // start loading a little before the bottom comes into view
  useEffect(() => {
    const el = sentinel.current;
    if (!el || done || failed) return;
    const io = new IntersectionObserver((entries) => entries[0]?.isIntersecting && loadMore(), { rootMargin: '800px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [loadMore, done, failed]);

  if (items.length === 0) {
    return <p className="py-16 text-center font-display text-2xl font-light text-ink-2">Không tìm thấy sản phẩm nào</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
        {items.map((product, i) => (
          <Reveal key={product.id} delayMs={(i % 4) * 60} className="h-full">
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>

      <div ref={sentinel} className="mt-16 flex flex-col items-center gap-4 text-sm text-ink-2" aria-live="polite">
        {loading && (
          <span className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
            Đang tải thêm…
          </span>
        )}
        {failed && (
          <button
            type="button"
            onClick={loadMore}
            className="ink-bloom border border-ink/50 px-7 py-3.5 text-xs font-medium uppercase tracking-[.18em] text-ink"
          >
            Tải lại
          </button>
        )}
        {done && total > initial.length && (
          <span className="flex items-center gap-3 text-xs uppercase tracking-[.24em]">
            <span className="h-px w-8 bg-gold" />
            Đã xem hết {total} sản phẩm
            <span className="h-px w-8 bg-gold" />
          </span>
        )}
        {!done && !loading && !failed && (
          // fallback for when the observer doesn't fire (very tall screens, old browsers)
          <button type="button" onClick={loadMore} className="text-xs uppercase tracking-[.2em] text-[#8a6a24] hover:text-ink">
            Xem thêm
          </button>
        )}
      </div>
    </>
  );
}
