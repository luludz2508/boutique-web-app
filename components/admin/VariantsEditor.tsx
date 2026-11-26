'use client';

import { useFieldArray, type Control, type UseFormRegister } from 'react-hook-form';
import type { FormState } from '@/lib/admin/form-state';
import { field, ghostButton, label } from './ui';

type Props = { control: Control<FormState>; register: UseFormRegister<FormState>; issues: Record<string, string> };

function Err({ msg }: { msg?: string }) {
  return msg ? <span className="mt-1 block text-xs text-seal">{msg}</span> : null;
}

/** One card per version (8 li, 10 li…): name, price, original price, SKU, stock. */
export function VariantsEditor({ control, register, issues }: Props) {
  const { fields, append, remove } = useFieldArray({ control, name: 'variants' });
  const k = (i: number, f: string) => `variants.${i}.${f}`;
  return (
    <div className="space-y-3">
      {fields.map((f, i) => (
        <div key={f.id} className="grid grid-cols-2 gap-3 border border-ink/15 bg-white/40 p-3 sm:grid-cols-6">
          <label className={`${label} col-span-2 sm:col-span-2`}>
            Tên phiên bản
            <input {...register(`variants.${i}.option1_value`)} placeholder="Ví dụ 8 li" className={`${field} mt-1`} />
          </label>
          <label className={`${label} sm:col-span-1`}>
            Giá (đ)
            <input {...register(`variants.${i}.price`)} inputMode="numeric" aria-invalid={!!issues[k(i, 'price')]} className={`${field} mt-1 text-right font-mono`} />
            <Err msg={issues[k(i, 'price')]} />
          </label>
          <label className={`${label} sm:col-span-1`}>
            Giá gốc
            <input {...register(`variants.${i}.compare_at_price`)} inputMode="numeric" placeholder="—" aria-invalid={!!issues[k(i, 'compare_at_price')]} className={`${field} mt-1 text-right font-mono`} />
            <Err msg={issues[k(i, 'compare_at_price')]} />
          </label>
          <label className={`${label} sm:col-span-1`}>
            SKU
            <input {...register(`variants.${i}.sku`)} className={`${field} mt-1 font-mono`} />
          </label>
          <label className={`${label} sm:col-span-1`}>
            Tồn kho
            <input {...register(`variants.${i}.inventory_quantity`)} inputMode="numeric" aria-invalid={!!issues[k(i, 'inventory_quantity')]} className={`${field} mt-1 text-right font-mono`} />
            <Err msg={issues[k(i, 'inventory_quantity')]} />
          </label>
          <div className="col-span-2 flex items-center justify-between sm:col-span-6">
            <label className="flex h-11 items-center gap-2 text-sm">
              <input type="checkbox" {...register(`variants.${i}.track_inventory`)} className="h-5 w-5 accent-ink" />
              Theo dõi tồn kho
            </label>
            <button
              type="button"
              onClick={() => remove(i)}
              disabled={fields.length === 1}
              title={fields.length === 1 ? 'Sản phẩm cần ít nhất một phiên bản' : undefined}
              className="h-11 px-2 text-sm text-ink-2 hover:text-seal disabled:opacity-30"
            >
              Bỏ phiên bản
            </button>
          </div>
        </div>
      ))}
      <Err msg={issues.variants} />
      <button
        type="button"
        onClick={() => append({ option1_value: '', price: '0', compare_at_price: '', sku: '', inventory_quantity: '0', track_inventory: true })}
        className={ghostButton}
      >
        + Thêm phiên bản
      </button>
      <p className="text-xs text-ink-2">Giá 0 hiển thị "Liên hệ" trên site.</p>
    </div>
  );
}
