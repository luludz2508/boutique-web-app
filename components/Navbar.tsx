'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { Seal } from '@/components/ink';
import { cn } from '@/lib/utils';
import content from '@/config/content';
import type { CategoryOption } from '@/lib/display';

type Item = { href: string; label: string; note?: string };
type Group = { label: string; href: string; items: Item[]; footer?: Item };

const ABOUT: Item[] = [
  { href: '/#story', label: 'Câu chuyện', note: 'Gia đình Sơn Hồng và nghề trầm' },
  { href: '/atelier', label: 'Xưởng & showroom', note: 'Nơi chế tác, địa chỉ, giờ mở cửa' },
  { href: '/gallery', label: 'Hình ảnh', note: 'Tác phẩm và khoảnh khắc' },
  { href: '/services', label: 'Dịch vụ', note: 'Đặt chế tác, quà tặng, tư vấn' },
];

const { contactNumber, zaloUrl } = content.vi.atelier;
const tel = contactNumber?.replace(/\s/g, '');

function buildGroups(categories: CategoryOption[]): Group[] {
  return [
    {
      label: 'Sản phẩm',
      href: '/products',
      items: [
        ...categories
          .filter((c) => c.value !== 'Khác')
          .map((c) => ({ href: `/products?type=${encodeURIComponent(c.value)}`, label: c.label })),
        { href: '/collection', label: 'Bộ sưu tập' },
      ],
      footer: { href: '/products', label: 'Xem tất cả sản phẩm' },
    },
    { label: 'Về Sơn Hồng', href: '/#story', items: ABOUT },
  ];
}

/** Hover or click to open; Escape, clicking outside or leaving closes it. */
function Dropdown({ group, active }: { group: Group; active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  const withNotes = group.items.some((i) => i.note);

  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        aria-current={active ? 'page' : undefined}
        className="ink-underline inline-flex items-center gap-1.5 py-1.5 text-[13px] uppercase tracking-[.2em] text-ink"
      >
        {group.label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-300', open && 'rotate-180')} />
      </button>

      {/* pt bridges the gap so the pointer can travel from the label to the panel */}
      <div
        className={cn(
          'absolute left-1/2 top-full -translate-x-1/2 pt-4 transition-[opacity,transform,visibility] duration-300',
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0',
        )}
      >
        <div
          className={cn('border border-ink/10 shadow-[0_18px_40px_-18px_rgba(28,27,25,.35)]', withNotes ? 'w-[22rem]' : 'w-64')}
          style={{ background: "#faf6ee url('/ink/paper-tile.webp') center / 300px" }}
        >
          <ul className="py-3">
            {group.items.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="group block px-6 py-2.5 transition-colors hover:bg-ink/[.04]">
                  <span className="text-[15px] text-ink group-hover:text-[#8a6a24]">{i.label}</span>
                  {i.note && <span className="mt-0.5 block text-xs text-ink-2">{i.note}</span>}
                </Link>
              </li>
            ))}
          </ul>
          {group.footer && (
            <Link
              href={group.footer.href}
              className="flex items-center justify-between border-t border-ink/10 px-6 py-3.5 text-xs uppercase tracking-[.18em] text-[#8a6a24] hover:text-ink"
            >
              {group.footer.label}
              <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}

export function Navbar({ categories = [] }: { categories?: CategoryOption[] }) {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const groups = buildGroups(categories);

  // Hide while scrolling down, show again when scrolling up or near the top.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation and lock page scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (g: Group) =>
    g.href === '/products'
      ? pathname.startsWith('/products') || pathname.startsWith('/collection')
      : ['/atelier', '/gallery', '/services'].some((p) => pathname.startsWith(p));

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b border-ink/10 transition-transform duration-500 motion-reduce:transition-none',
          hidden && !open && '-translate-y-full',
        )}
        style={{ background: "#f4efe4 url('/ink/paper-tile.webp') center / 512px" }}
      >
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-3 md:px-[5vw]">
          <Link href="/" className="flex items-center gap-3" aria-label="Trầm Hương Sơn Hồng – Trang chủ">
            <Seal />
            <span className="whitespace-nowrap font-display text-[13px] tracking-[.14em] text-ink sm:text-[17px] sm:tracking-[.2em]">
              TRẦM HƯƠNG SƠN HỒNG
            </span>
          </Link>

          <ul className="ml-auto hidden items-center gap-9 lg:flex">
            {groups.map((g) => (
              <Dropdown key={g.label} group={g} active={isActive(g)} />
            ))}
            <li>
              <Link href="#contact" className="ink-underline py-1.5 text-[13px] uppercase tracking-[.2em] text-ink">
                Liên hệ
              </Link>
            </li>
          </ul>

          {zaloUrl && (
            <a
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ink-bloom-dark hidden items-center gap-2 whitespace-nowrap bg-ink px-5 py-3 text-xs font-medium uppercase tracking-[.16em] text-paper lg:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              Zalo {contactNumber}
            </a>
          )}

          {tel && (
            <a href={`tel:${tel}`} className="ml-auto p-2 text-ink lg:hidden" aria-label={`Gọi ${contactNumber}`}>
              <Phone className="h-5 w-5" />
            </a>
          )}
          <button
            type="button"
            className="-ml-4 p-2 text-ink lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 overflow-y-auto px-6 pb-12 pt-24 lg:hidden"
          style={{ background: "#f4efe4 url('/ink/paper-tile.webp') repeat", backgroundSize: 512 }}
        >
          <div className="mx-auto max-w-md space-y-10">
            {groups.map((g) => (
              <section key={g.label}>
                <Link href={g.href} onClick={() => setOpen(false)} className="font-display text-4xl font-light text-ink">
                  {g.label}
                </Link>
                <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-ink/10 pt-4">
                  {g.items.map((i) => (
                    <li key={i.href}>
                      <Link href={i.href} onClick={() => setOpen(false)} className="text-[15px] text-ink-2">
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <Link href="#contact" onClick={() => setOpen(false)} className="block font-display text-4xl font-light text-ink">
              Liên hệ
            </Link>

            <div className="flex flex-wrap gap-3 pt-2">
              {zaloUrl && (
                <a
                  href={zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ink-bloom-dark inline-flex items-center gap-2 bg-ink px-5 py-4 text-xs font-medium uppercase tracking-[.16em] text-paper"
                >
                  <MessageCircle className="h-4 w-4" />
                  Nhắn Zalo
                </a>
              )}
              {tel && (
                <a
                  href={`tel:${tel}`}
                  className="ink-bloom inline-flex items-center gap-2 border border-ink/50 px-5 py-4 text-xs font-medium uppercase tracking-[.16em] text-ink"
                >
                  <Phone className="h-4 w-4" />
                  {contactNumber}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
