'use client';

import { useFieldArray, type Control, type UseFormRegister } from 'react-hook-form';
import type { FormState } from '@/lib/admin/form-state';
import { field, ghostButton } from './ui';

type Props = { control: Control<FormState>; register: UseFormRegister<FormState>; issues: Record<string, string> };

/** Label – value pairs (Kích thước, Loại trầm…), shown as the spec table on the product page. */
export function SpecsEditor({ control, register, issues }: Props) {
  const { fields, append, remove, move } = useFieldArray({ control, name: 'specs' });
  return (
    <div className="space-y-2">
      {fields.map((f, i) => (
        <div key={f.id} className="grid grid-cols-[1fr_auto] gap-2 sm:grid-cols-[12rem_1fr_auto]">
          <input {...register(`specs.${i}.label`)} placeholder="Nhãn, ví dụ Kích thước" aria-label="Nhãn" aria-invalid={!!issues[`specs.${i}.label`]} className={`${field} col-span-2 sm:col-span-1`} />
          <input {...register(`specs.${i}.value`)} placeholder="Giá trị" aria-label="Giá trị" aria-invalid={!!issues[`specs.${i}.value`]} className={field} />
          <div className="flex">
            <button type="button" onClick={() => i > 0 && move(i, i - 1)} disabled={i === 0} className="h-11 w-10 text-ink-2 disabled:opacity-30" aria-label="Lên">
              ↑
            </button>
            <button type="button" onClick={() => remove(i)} className="h-11 w-10 text-ink-2 hover:text-seal" aria-label="Bỏ dòng">
              ×
            </button>
          </div>
          {(issues[`specs.${i}.label`] || issues[`specs.${i}.value`]) && (
            <p className="col-span-full text-xs text-seal">{issues[`specs.${i}.label`] ?? issues[`specs.${i}.value`]}</p>
          )}
        </div>
      ))}
      <button type="button" onClick={() => append({ label: '', value: '' })} className={ghostButton}>
        + Thêm dòng
      </button>
    </div>
  );
}
