'use client';

import { useRef, useState, useTransition } from 'react';
import { updateVariantField, type InlineResult } from '@/app/admin/actions';
import { formatPriceInput, parsePrice } from '@/lib/admin/price';

type Props = {
  variantId: string;
  field: 'price' | 'inventory_quantity';
  value: number;
  updatedAt: string;
  label: string;
};

const show = (field: Props['field'], n: number) => (field === 'price' ? formatPriceInput(n) : String(n));

/** A number cell that saves itself when you leave it or press Enter. Keeps what you typed if saving fails. */
export function InlineNumber({ variantId, field, value, updatedAt, label }: Props) {
  const [text, setText] = useState(show(field, value));
  const saved = useRef({ value, updatedAt });
  const [status, setStatus] = useState<{ kind: 'idle' | 'saved' | 'error'; message?: string }>({ kind: 'idle' });
  const [pending, start] = useTransition();

  const save = () => {
    const unchanged = field === 'price' ? parsePrice(text) === saved.current.value : text.trim() === String(saved.current.value);
    if (unchanged) {
      setText(show(field, saved.current.value));
      return;
    }
    start(async () => {
      let res: InlineResult;
      try {
        res = await updateVariantField({ variantId, field, raw: text, expectedUpdatedAt: saved.current.updatedAt });
      } catch {
        res = { error: 'invalid', message: 'Không lưu được, thử lại.' };
      }
      if ('ok' in res) {
        saved.current = { value: res.value, updatedAt: res.updatedAt };
        setText(show(field, res.value));
        setStatus({ kind: 'saved' });
        setTimeout(() => setStatus((s) => (s.kind === 'saved' ? { kind: 'idle' } : s)), 2000);
      } else {
        setStatus({ kind: 'error', message: res.message });
      }
    });
  };

  return (
    <label className="block min-w-0">
      <span className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-wider text-ink-2">
        {label}
        {pending && <span className="normal-case tracking-normal">Đang lưu…</span>}
        {status.kind === 'saved' && <span className="normal-case tracking-normal text-[#5f7d3a]">Đã lưu</span>}
      </span>
      <input
        value={text}
        inputMode="numeric"
        enterKeyHint="done"
        onChange={(e) => {
          setText(e.target.value);
          if (status.kind === 'error') setStatus({ kind: 'idle' });
        }}
        // raw digits while editing, grouped with dots while reading
        onFocus={() => field === 'price' && status.kind !== 'error' && setText(text.replace(/\./g, ''))}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
          if (e.key === 'Escape') {
            setText(show(field, saved.current.value));
            setStatus({ kind: 'idle' });
          }
        }}
        aria-invalid={status.kind === 'error'}
        className={`mt-1 h-11 w-full border bg-white/70 px-2 text-right font-mono text-base tabular-nums outline-none focus:border-ink ${
          status.kind === 'error' ? 'border-seal' : 'border-ink/25'
        }`}
      />
      {status.kind === 'error' && <span className="mt-1 block text-xs text-seal">{status.message}</span>}
      {field === 'price' && status.kind !== 'error' && saved.current.value === 0 && text.trim() === '0' && (
        <span className="mt-1 block text-xs text-ink-2">0 = Liên hệ</span>
      )}
    </label>
  );
}
