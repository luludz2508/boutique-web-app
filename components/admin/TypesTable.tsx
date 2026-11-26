'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { renameType } from '@/app/admin/actions';
import { validateTypeRename } from '@/lib/admin/types-rename';
import { field } from './ui';

type Type = { name: string; count: number };

function Row({ type, all }: { type: Type; all: Type[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [to, setTo] = useState(type.name);
  const [message, setMessage] = useState<{ tone: 'error' | 'ok'; text: string } | null>(null);
  const [pending, start] = useTransition();

  const submit = () => {
    const problem = validateTypeRename(type.name, to, all.map((t) => t.name));
    if (problem) return setMessage({ tone: 'error', text: problem });
    const target = to.trim();
    const merging = all.some((t) => t.name === target);
    const question = merging
      ? `Gộp: chuyển ${type.count} sản phẩm từ "${type.name}" sang loại có sẵn "${target}"?`
      : `Chuyển ${type.count} sản phẩm từ "${type.name}" sang "${target}"?`;
    if (!window.confirm(question)) return;
    start(async () => {
      const res = await renameType(type.name, target).catch(() => ({ error: 'invalid' as const, message: 'Không đổi được, thử lại.' }));
      if ('ok' in res) {
        setMessage({ tone: 'ok', text: `Đã chuyển ${res.count} sản phẩm.` });
        setEditing(false);
        router.refresh();
      } else {
        setMessage({ tone: 'error', text: res.message });
      }
    });
  };

  return (
    <li className="py-3">
      <div className="flex items-center gap-3">
        <span className="min-w-0 flex-1 truncate">{type.name}</span>
        <span className="shrink-0 font-mono text-sm text-ink-2">{type.count}</span>
        {!editing && (
          <button type="button" onClick={() => setEditing(true)} className="h-11 shrink-0 px-2 text-sm text-ink-2 hover:text-ink">
            Đổi tên / gộp
          </button>
        )}
      </div>
      {editing && (
        <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto_auto]">
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            list="admin-type-names"
            aria-label={`Tên mới cho ${type.name}`}
            autoFocus
            className={field}
          />
          <button type="button" onClick={submit} disabled={pending} className="h-11 bg-ink px-4 text-sm text-paper disabled:opacity-50">
            {pending ? 'Đang đổi…' : 'Đổi'}
          </button>
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setTo(type.name);
              setMessage(null);
            }}
            className="h-11 px-3 text-sm text-ink-2"
          >
            Huỷ
          </button>
        </div>
      )}
      {message && <p className={`mt-1 text-sm ${message.tone === 'error' ? 'text-seal' : 'text-[#3f5a22]'}`}>{message.text}</p>}
    </li>
  );
}

export function TypesTable({ types }: { types: Type[] }) {
  return (
    <>
      <datalist id="admin-type-names">
        {types.map((t) => (
          <option key={t.name} value={t.name} />
        ))}
      </datalist>
      <ul className="mt-6 divide-y divide-ink/10 border-y border-ink/15">
        {types.map((t) => (
          <Row key={t.name} type={t} all={types} />
        ))}
      </ul>
    </>
  );
}
