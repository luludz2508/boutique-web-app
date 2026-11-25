'use client';

import { useEffect } from 'react';
import { Seal } from '@/components/ink';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Products page error:', error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center gap-6 px-5 pt-24 text-center text-ink">
      <Seal size="lg" className="!w-20 opacity-80" />
      <h1 className="font-display text-4xl font-light">Chưa tải được sản phẩm</h1>
      <p className="text-ink-2">Xin lỗi, đã có lỗi khi tải danh sách sản phẩm. Vui lòng thử lại sau ít phút.</p>
      <button
        type="button"
        onClick={reset}
        className="ink-bloom-dark bg-ink px-8 py-3 text-xs uppercase tracking-[.18em] text-paper hover:bg-black"
      >
        Thử lại
      </button>
    </div>
  );
}
