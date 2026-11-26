'use server';

import { withAdmin } from '@/lib/admin/auth';
import { diffChanges, isStale } from '@/lib/admin/audit';
import { getAdminProduct, takenSlugs, writeAudit } from '@/lib/admin/data';
import { hhmm } from '@/lib/admin/format';
import { revalidateProduct } from '@/lib/admin/revalidate';
import { sanitizeDescription } from '@/lib/admin/sanitize';
import { formIssues, ProductFormSchema, type ProductFormValues } from '@/lib/admin/schema';
import { slugify, uniqueSlug } from '@/lib/admin/slug';
import type { ProductStatus } from '@/lib/admin/types';
import { adminDb } from '@/lib/supabase/admin';

export type SaveResult =
  | { ok: true; id: string; slug: string; version: string }
  | { error: 'invalid'; issues: Record<string, string> }
  | { error: 'conflict' | 'auth' | 'invalid'; message: string };

type SaveInput = { id?: string; expectedUpdatedAt?: string; values: ProductFormValues };

const conflictMessage = (ts: string) =>
  `Sản phẩm vừa được người khác sửa lúc ${hhmm(ts)}. Chưa lưu gì cả. Mở sản phẩm ở tab mới để xem bản mới, rồi chép lại phần bạn đã sửa.`;

/** Fields recorded in the audit log for a product save. */
const snapshot = (v: Omit<ProductFormValues, 'image_order'> & { image_order?: string[] }) => ({
  name_vi: v.name_vi,
  slug: v.slug,
  product_type: v.product_type,
  status: v.status,
  featured: v.featured,
  excerpt_vi: v.excerpt_vi,
  description_vi: v.description_vi,
  specs: v.specs,
  variants: v.variants.map((x) => ({ ...x, id: x.id ?? null })),
  image_order: v.image_order ?? [],
});

const saveGuarded = withAdmin(async (admin, input: SaveInput): Promise<SaveResult> => {
  const parsed = ProductFormSchema.safeParse(input.values);
  if (!parsed.success) return { error: 'invalid', issues: formIssues(parsed.error) };
  const v = parsed.data;

  const before = input.id ? await getAdminProduct(input.id) : null;
  if (input.id && !before) return { error: 'invalid', message: 'Không tìm thấy sản phẩm này.' };

  let slug: string;
  let status = v.status;
  if (!before) {
    slug = uniqueSlug(slugify(v.name_vi), await takenSlugs());
    status = 'draft'; // new products stay hidden until someone publishes them
  } else if (v.slug && v.slug !== before.slug) {
    slug = uniqueSlug(slugify(v.slug), await takenSlugs(before.id));
  } else {
    slug = before.slug;
  }

  const description = sanitizeDescription(v.description_vi);
  const { data, error } = await adminDb().rpc('admin_save_product', {
    payload: {
      id: input.id ?? null,
      expected_updated_at: input.expectedUpdatedAt ?? null,
      email: admin.email,
      product: {
        name_vi: v.name_vi,
        slug,
        product_type: v.product_type,
        status,
        featured: v.featured,
        excerpt_vi: v.excerpt_vi,
        description_vi: description,
        specs: v.specs,
      },
      variants: v.variants,
      image_order: v.image_order,
    },
  });
  if (error) throw new Error(error.message);
  const res = data as { conflict?: true; updated_at: string; id: string; slug: string; old_slug: string | null };
  if (res.conflict) return { error: 'conflict', message: conflictMessage(res.updated_at) };

  const after = snapshot({ ...v, slug, status, description_vi: description });
  const changes = before
    ? diffChanges(
        snapshot({ ...before, product_type: before.product_type ?? '', excerpt_vi: before.excerpt_vi ?? '', description_vi: before.description_vi ?? '', variants: before.variants.map((x) => ({ ...x, option1_value: x.option1_value ?? '', sku: x.sku ?? '' })), image_order: before.images.map((i) => i.id) }),
        after,
      )
    : after;
  await writeAudit(admin.email, before ? 'product.update' : 'product.create', res.id, changes);
  revalidateProduct([res.slug, res.old_slug]);
  return { ok: true, id: res.id, slug: res.slug, version: res.updated_at };
});

export async function saveProduct(input: SaveInput): Promise<SaveResult> {
  return saveGuarded(input);
}

const statusGuarded = withAdmin(
  async (admin, id: string, status: ProductStatus, expectedUpdatedAt: string): Promise<SaveResult> => {
    if (!['published', 'draft', 'archived'].includes(status)) return { error: 'invalid', message: 'Trạng thái không hợp lệ.' };
    const before = await getAdminProduct(id);
    if (!before) return { error: 'invalid', message: 'Không tìm thấy sản phẩm này.' };
    if (isStale(expectedUpdatedAt, before.version)) return { error: 'conflict', message: conflictMessage(before.version) };
    const { data, error } = await adminDb()
      .from('products')
      .update({ status, admin_edited_at: new Date().toISOString() })
      .eq('id', id)
      .select('updated_at')
      .single();
    if (error) throw new Error(error.message);
    await writeAudit(admin.email, 'product.status', id, { status: { from: before.status, to: status } });
    revalidateProduct([before.slug]);
    return { ok: true, id, slug: before.slug, version: data.updated_at };
  },
);

export async function setStatus(id: string, status: ProductStatus, expectedUpdatedAt: string): Promise<SaveResult> {
  return statusGuarded(id, status, expectedUpdatedAt);
}
