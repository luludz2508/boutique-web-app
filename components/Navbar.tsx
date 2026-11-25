'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, MessageCircle, Phone, X } from 'lucide-react';
import { Seal } from '@/components/ink';
import { cn } from '@/lib/utils';
import content from '@/config/content';

const LINKS = [
  { href: '/products', label: 'Sản phẩm' },
  { href: '/#story', label: 'Câu chuyện' },
  { href: '/#showroom', label: 'Showroom' },
  { href: '#contact', label: 'Liên hệ' },
] as const;

const { contactNumber, zaloUrl } = content.vi.atelier;
const tel = contactNumber?.replace(/\s/g, '');

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
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className="ink-underline py-1.5 text-[13px] uppercase tracking-[.2em] text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
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
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-9 lg:hidden"
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
          <div className="mt-4 flex gap-3">
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
      )}
    </>
  );
}
