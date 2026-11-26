'use server';

import { withAdmin } from '@/lib/admin/auth';
import { isStale } from '@/lib/admin/audit';
import { writeAudit } from '@/lib/admin/data';
import { hhmm } from '@/lib/admin/format';
import { parsePrice } from '@/lib/admin/price';
import { validateTypeRename } from '@/lib/admin/types-rename';
import { revalidateProduct } from '@/lib/admin/revalidate';
import { adminDb } from '@/lib/supabase/admin';

export type InlineResult =
  | { ok: true; updatedAt: string; value: number }
  | { error: 'conflict' | 'invalid' | 'auth'; message: string };

type InlineInput = { variantId: string; field: 'price' | 'inventory_quantity'; raw: string; expectedUpdatedAt: string };


const conflict = (ts: string): InlineResult => ({
  error: 'conflict',
  message: `Vừa có người sửa lúc ${hhmm(ts)}, tải lại trang để xem.`,
});

const updateVariantFieldGuarded = withAdmin(async (admin, input: InlineInput): Promise<InlineResult> => {
  let value: number | null;
  if (input.field === 'price') {
    value = parsePrice(input.raw);
    if (value === null) return { error: 'invalid', message: 'Giá không hợp lệ' };
  } else {
    const s = input.raw.trim();
    value = /^\d+$/.test(s) ? Number(s) : null;
    if (value === null) return { error: 'invalid', message: 'Tồn kho phải là số nguyên ≥ 0' };
  }

  const db = adminDb();
  const { data: current, error: readError } = await db
    .from('product_variants')
    .select('id, price, inventory_quantity, updated_at, product_id, products(slug)')
    .eq('id', input.variantId)
    .single();
  if (readError || !current) return { error: 'invalid', message: 'Không tìm thấy phiên bản này' };
  if (isStale(input.expectedUpdatedAt, current.updated_at)) return conflict(current.updated_at);

  const { data: updated, error } = await db
    .from('product_variants')
    .update({ [input.field]: value, admin_edited_at: new Date().toISOString() })
    .eq('id', input.variantId)
    .eq('updated_at', current.updated_at) // second guard against a write landing between read and update
    .select('updated_at')
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!updated) return conflict(new Date().toISOString());

  const before = Number(current[input.field]);
  if (before !== value) {
    await writeAudit(admin.email, `variant.${input.field}`, current.product_id, {
      variant_id: input.variantId,
      [input.field]: { from: before, to: value },
    });
  }
  const product = current.products as unknown as { slug: string } | null;
  revalidateProduct([product?.slug]);
  return { ok: true, updatedAt: updated.updated_at, value };
});

export async function updateVariantField(input: InlineInput): Promise<InlineResult> {
  return updateVariantFieldGuarded(input);
}

// ── Product types ───────────────────────────────────────────────────────────

export type RenameResult = { ok: true; count: number } | { error: 'invalid' | 'auth'; message: string };

const renameGuarded = withAdmin(async (admin, from: string, to: string): Promise<RenameResult> => {
  const problem = validateTypeRename(from, to, []);
  if (problem) return { error: 'invalid', message: problem };
  const target = to.trim();
  const { data, error } = await adminDb()
    .from('products')
    .update({ product_type: target, admin_edited_at: new Date().toISOString() })
    .eq('product_type', from)
    .select('slug');
  if (error) throw new Error(error.message);
  const count = data?.length ?? 0;
  await writeAudit(admin.email, 'type.rename', null, { type: { from, to: target }, count });
  revalidateProduct(data?.map((p) => p.slug) ?? []);
  return { ok: true, count };
});

/** Renames a product type on every product (any status). Renaming into an existing name merges the two. */
export async function renameType(from: string, to: string): Promise<RenameResult> {
  return renameGuarded(from, to);
}
