'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Seal } from '@/components/ink';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '/#story', label: 'Câu chuyện' },
  { href: '/products', label: 'Sản phẩm' },
  { href: '#contact', label: 'Liên hệ' },
] as const;

export function Navbar() {
  const pathname = usePathname() ?? '/';
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

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

  const isActive = (href: string) => href === '/products' && pathname.startsWith('/products');

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-transform duration-500 motion-reduce:transition-none',
          hidden && !open && '-translate-y-full',
        )}
        style={{ background: 'linear-gradient(rgba(244,239,228,.94) 62%, rgba(244,239,228,0))' }}
      >
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-[5vw]">
          <Link href="/" className="flex items-center gap-3" aria-label="Trầm Hương Sơn Hồng – Trang chủ">
            <Seal />
            <span className="whitespace-nowrap font-display text-[12px] tracking-[.14em] text-ink sm:text-[15px] sm:tracking-[.22em]">
              TRẦM HƯƠNG SƠN HỒNG
            </span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className="ink-underline py-1.5 text-xs uppercase tracking-[.2em] text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="p-2 text-ink md:hidden"
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
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 md:hidden"
          style={{ background: "#f4efe4 url('/ink/paper-tile.webp') repeat", backgroundSize: 512 }}
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-4xl font-light text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Seal size="lg" className="mt-6 !w-24 opacity-90" />
        </div>
      )}
    </>
  );
}
