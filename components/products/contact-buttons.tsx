'use client';

import { useState } from 'react';
import { Copy, Check, Facebook, MessageCircle, Phone } from 'lucide-react';
import { FretCorner } from '@/components/ink';
import content from '@/config/content';

/** Zalo / call / Facebook, plus a line the customer can copy into their message. */
export function ContactButtons({ productLabel }: { productLabel: string }) {
  const a = content.vi.atelier;
  const tel = a.contactNumber?.replace(/\s/g, '');
  const [copied, setCopied] = useState(false);
  const message = `Nhắn: ${productLabel}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(productLabel);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked (e.g. insecure context): the text is still visible to copy by hand
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {a.zaloUrl && (
          <a
            href={a.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ink-bloom-dark inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap bg-ink px-4 py-4 text-xs sm:px-6 font-medium uppercase tracking-[.18em] text-paper transition-colors hover:bg-black sm:flex-none"
          >
            <FretCorner className="absolute -left-1 -top-1 h-3 w-3" />
            <FretCorner className="absolute -bottom-1 -right-1 h-3 w-3 rotate-180" />
            <MessageCircle className="h-4 w-4" />
            Nhắn Zalo
          </a>
        )}
        {tel && (
          <a
            href={`tel:${tel}`}
            className="ink-bloom inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap border border-ink/50 px-4 py-4 text-xs sm:px-6 font-medium uppercase tracking-[.18em] text-ink sm:flex-none"
          >
            <Phone className="h-4 w-4" />
            Gọi điện
          </a>
        )}
        {a.facebookUrl && (
          <a
            href={a.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ink-bloom inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap border border-ink/50 px-4 py-4 text-xs sm:px-6 font-medium uppercase tracking-[.18em] text-ink sm:flex-none"
          >
            <Facebook className="h-4 w-4" />
            Facebook
          </a>
        )}
      </div>
      <p className="flex items-center gap-2 text-sm text-ink-2">
        <span>{message}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1 text-xs text-[#8a6a24] underline-offset-4 hover:underline"
          aria-live="polite"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Đã sao chép' : 'Sao chép'}
        </button>
      </p>
    </div>
  );
}
