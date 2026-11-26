'use client';

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useRef, useState } from 'react';
import { addProductImage, createImageUpload, removeProductImage } from '@/app/admin/products/actions';
import { imageProblem } from '@/lib/admin/image';
import type { AdminImage } from '@/lib/admin/types';
import { browserSupabase } from '@/lib/supabase/browser';
import { compressToWebp, DECODE_ERROR } from './compress';

type Props = {
  productId: string;
  images: AdminImage[];
  order: string[];
  onOrderChange: (ids: string[]) => void;
};

type Upload = { key: string; name: string; state: 'working' | 'error'; message: string };

function Tile({ img, index, onRemove }: { img: { id: string; url: string }; index: number; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: img.id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`relative aspect-square touch-none select-none overflow-hidden bg-paper-2 ${isDragging ? 'z-10 opacity-80 shadow-lg' : ''}`}
      {...attributes}
      {...listeners}
      aria-label={`Ảnh ${index + 1}${index === 0 ? ', ảnh chính' : ''}. Kéo để đổi thứ tự.`}
    >
      <img src={img.url} alt="" draggable={false} className="h-full w-full object-cover" />
      {index === 0 && <span className="absolute left-1 top-1 bg-ink px-1.5 py-0.5 text-[10px] text-paper">Ảnh chính</span>}
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onClick={onRemove}
        className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center text-lg text-paper [text-shadow:0_0_4px_#000]"
        aria-label="Gỡ ảnh này"
      >
        ×
      </button>
    </div>
  );
}

/** Photo grid: drag to reorder (first = main photo), remove, and add photos compressed in the browser. */
export function ImageManager({ productId, images: initial, order, onOrderChange }: Props) {
  const [images, setImages] = useState(() => new Map(initial.map((i) => [i.id, i.url])));
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [error, setError] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  // keep the latest order for async uploads that finish one after another
  const orderRef = useRef(order);
  orderRef.current = order;

  const ids = [...order.filter((id) => images.has(id)), ...[...images.keys()].filter((id) => !order.includes(id))];
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    onOrderChange(arrayMove(ids, ids.indexOf(String(active.id)), ids.indexOf(String(over.id))));
  };

  const update = (key: string, patch: Partial<Upload> | null) =>
    setUploads((list) => (patch ? list.map((u) => (u.key === key ? { ...u, ...patch } : u)) : list.filter((u) => u.key !== key)));

  const addFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const queue = [...files].map((file) => ({ file, key: crypto.randomUUID() }));
    setUploads((list) => [...list, ...queue.map(({ file, key }) => ({ key, name: file.name, state: 'working' as const, message: 'Đang nén…' }))]);
    for (const { file, key } of queue) {
      const problem = imageProblem(file);
      if (problem) {
        update(key, { state: 'error', message: problem });
        continue;
      }
      try {
        const { blob, ext } = await compressToWebp(file);
        update(key, { message: 'Đang tải lên…' });
        const ticket = await createImageUpload(productId, ext);
        if ('error' in ticket) throw new Error(ticket.message);
        const { error: upErr } = await browserSupabase()
          .storage.from('product-images')
          .uploadToSignedUrl(ticket.path, ticket.token, blob, { contentType: blob.type });
        if (upErr) throw new Error('Tải ảnh lên không thành công, thử lại.');
        const added = await addProductImage(productId, ticket.path);
        if ('error' in added) throw new Error(added.message);
        setImages((m) => new Map(m).set(added.id, added.url));
        const next = [...orderRef.current.filter((id) => id !== added.id), added.id];
        orderRef.current = next;
        onOrderChange(next);
        update(key, null);
      } catch (e) {
        const message = e instanceof Error && e.message ? e.message : DECODE_ERROR;
        update(key, { state: 'error', message });
      }
    }
    if (input.current) input.current.value = '';
  };

  const remove = async (id: string) => {
    if (!window.confirm('Gỡ ảnh này khỏi sản phẩm?')) return;
    setError(null);
    const res = await removeProductImage(id).catch(() => ({ error: 'invalid' as const, message: 'Không gỡ được ảnh, thử lại.' }));
    if ('error' in res) return setError(res.message);
    setImages((m) => {
      const n = new Map(m);
      n.delete(id);
      return n;
    });
    onOrderChange(orderRef.current.filter((x) => x !== id));
  };

  return (
    <div className="space-y-3">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={ids} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {ids.map((id, i) => (
              <Tile key={id} img={{ id, url: images.get(id)! }} index={i} onRemove={() => remove(id)} />
            ))}
            <button
              type="button"
              onClick={() => input.current?.click()}
              className="flex aspect-square flex-col items-center justify-center gap-1 border border-dashed border-ink/40 text-sm text-ink-2 hover:border-ink hover:text-ink"
            >
              <span className="text-2xl leading-none">+</span>
              Thêm ảnh
            </button>
          </div>
        </SortableContext>
      </DndContext>
      <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => addFiles(e.target.files)} />

      {uploads.length > 0 && (
        <ul className="space-y-1 text-sm">
          {uploads.map((u) => (
            <li key={u.key} className={`flex items-center gap-2 ${u.state === 'error' ? 'text-seal' : 'text-ink-2'}`}>
              <span className="truncate">{u.name}</span>
              <span className="shrink-0">— {u.message}</span>
              {u.state === 'error' && (
                <button type="button" onClick={() => update(u.key, null)} className="ml-auto h-9 px-2 text-ink-2" aria-label="Ẩn thông báo">
                  ×
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-sm text-seal">{error}</p>}
      <p className="text-xs text-ink-2">Giữ và kéo ảnh để đổi thứ tự; ảnh đầu tiên là ảnh chính. Bấm Lưu để lưu thứ tự.</p>
    </div>
  );
}
