'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type CategoryOption = { value: string; label: string; count: number };

const SORTS = [
  { value: 'newest', label: 'Mới nhất' },
  { value: 'price-asc', label: 'Giá tăng dần' },
  { value: 'price-desc', label: 'Giá giảm dần' },
  { value: 'name-asc', label: 'Tên A–Z' },
] as const;

/** Builds /products?… from the current params with one key changed (page always resets). */
function useHref() {
  const searchParams = useSearchParams();
  return (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete('page');
    const qs = params.toString();
    return qs ? `/products?${qs}` : '/products';
  };
}

/** A quiet underline search: Enter submits, × clears. */
export function ProductSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const href = useHref();
  const [q, setQ] = useState(searchParams.get('search') ?? '');

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(href('search', q.trim() || null));
      }}
      className="relative w-full md:w-80"
    >
      <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-2" />
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Tìm sản phẩm…"
        aria-label="Tìm sản phẩm"
        className="w-full border-0 border-b border-ink/30 bg-transparent py-2.5 pl-7 pr-7 text-sm text-ink outline-none transition-colors placeholder:text-ink-2/70 focus:border-gold [&::-webkit-search-cancel-button]:hidden"
      />
      {q && (
        <button
          type="button"
          onClick={() => {
            setQ('');
            router.push(href('search', null));
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-ink-2 hover:text-ink"
          aria-label="Xoá tìm kiếm"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}

/** Category words to tap (scrolls sideways on phones) + a small sort menu. */
export function CategoryBar({ categories, total }: { categories: CategoryOption[]; total: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const href = useHref();
  const current = searchParams.get('type');
  const sort = searchParams.get('sort') ?? 'newest';

  const items = [{ value: null as string | null, label: 'Tất cả', count: total }, ...categories];

  return (
    <div className="flex flex-col gap-4 border-b border-ink/10 md:flex-row md:items-end md:justify-between md:gap-10">
      <nav aria-label="Danh mục" className="-mx-5 min-w-0 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:flex-1 md:px-0">
        <ul className="flex gap-7 whitespace-nowrap">
          {items.map((c) => {
            const active = (c.value ?? null) === current;
            return (
              <li key={c.label}>
                <Link
                  href={href('type', c.value)}
                  scroll={false}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative inline-block pb-3.5 text-sm transition-colors',
                    active ? 'text-ink' : 'text-ink-2 hover:text-ink',
                  )}
                >
                  {c.label}
                  <span className="ml-1.5 text-xs text-ink-2/70">{c.count}</span>
                  {active && <span className="absolute inset-x-0 -bottom-px h-[2px] bg-gold" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <label className="relative mb-3 inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap text-sm text-ink-2 md:self-auto">
        <span>Sắp xếp</span>
        <select
          value={sort}
          onChange={(e) => router.push(href('sort', e.target.value === 'newest' ? null : e.target.value), { scroll: false })}
          className="cursor-pointer appearance-none bg-transparent pr-5 text-ink outline-none"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 h-3.5 w-3.5" />
      </label>
    </div>
  );
}
