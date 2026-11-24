'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatPrice, isSoldOut, pickDefaultVariant } from '@/lib/display';
import type { ProductVariant } from '@/lib/db/products';
import { ContactButtons } from './contact-buttons';

const variantLabel = (v: ProductVariant) =>
  [v.option1_value, v.option2_value, v.option3_value].filter(Boolean).join(' / ');

/** Price, stock status, variant chips and contact buttons — selection drives all of them. */
export function VariantPicker({ variants, productName }: { variants: ProductVariant[]; productName: string }) {
  const [selected, setSelected] = useState<ProductVariant | null>(() => pickDefaultVariant(variants));
  const label = selected && variants.length > 1 ? `${productName} – ${variantLabel(selected)}` : productName;

  return (
    <div className="space-y-8">
      <div className="flex items-baseline gap-4">
        <p className="font-display text-4xl font-light">{formatPrice(selected?.price)}</p>
        {selected && isSoldOut(selected) && (
          <span className="border border-seal/60 px-2 py-0.5 text-xs uppercase tracking-[.16em] text-seal">Hết hàng</span>
        )}
      </div>

      {variants.length > 1 && (
        <fieldset>
          <legend className="mb-3 text-[11px] uppercase tracking-[.28em] text-ink-2">Phiên bản</legend>
          <div className="flex flex-wrap gap-2.5">
            {variants.map((v) => {
              const active = v.id === selected?.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelected(v)}
                  aria-pressed={active}
                  className={cn(
                    'border bg-[#faf6ee] px-4 py-2.5 text-sm transition-colors',
                    active ? 'border-gold text-ink shadow-[inset_0_0_0_1px_#b8913a]' : 'border-ink/15 text-ink-2 hover:border-ink/40',
                    isSoldOut(v) && 'opacity-55',
                  )}
                >
                  {variantLabel(v) || 'Mặc định'}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <ContactButtons productLabel={label} />
    </div>
  );
}
