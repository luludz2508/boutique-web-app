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

// ── Photos ──────────────────────────────────────────────────────────────────

const BUCKET = 'product-images';
type Failure = { error: 'auth' | 'invalid'; message: string };

const uploadGuarded = withAdmin(
  async (_admin, productId: string, ext: 'webp' | 'jpg'): Promise<{ path: string; token: string } | Failure> => {
    if (ext !== 'webp' && ext !== 'jpg') return { error: 'invalid', message: 'Định dạng ảnh không hợp lệ.' };
    const db = adminDb();
    const { data: product } = await db.from('products').select('id').eq('id', productId).maybeSingle();
    if (!product) return { error: 'invalid', message: 'Không tìm thấy sản phẩm này.' };
    const path = `products/${productId}/${crypto.randomUUID()}.${ext}`;
    const { data, error } = await db.storage.from(BUCKET).createSignedUploadUrl(path);
    if (error || !data) throw new Error(error?.message ?? 'signed upload url failed');
    return { path: data.path, token: data.token };
  },
);

/** A one-time URL the browser uploads one photo to, straight into Storage (bypasses Vercel's 4.5 MB body limit). */
export async function createImageUpload(productId: string, ext: 'webp' | 'jpg') {
  return uploadGuarded(productId, ext);
}

const addGuarded = withAdmin(async (admin, productId: string, path: string): Promise<{ id: string; url: string } | Failure> => {
  const expected = new RegExp(`^products/${productId}/[0-9a-f-]{36}\\.(webp|jpg)$`);
  if (!expected.test(path)) return { error: 'invalid', message: 'Đường dẫn ảnh không hợp lệ.' };
  const db = adminDb();
  const { data: rows, error: readError } = await db.from('product_images').select('position').eq('product_id', productId);
  if (readError) throw new Error(readError.message);
  const { data: product } = await db.from('products').select('slug').eq('id', productId).single();
  const url = db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  const position = rows.length ? Math.max(...rows.map((r) => r.position ?? 0)) + 1 : 0;
  const { data, error } = await db
    .from('product_images')
    .insert({ product_id: productId, url, position, is_primary: rows.length === 0 })
    .select('id, url')
    .single();
  if (error) throw new Error(error.message);
  await writeAudit(admin.email, 'image.add', productId, { image_id: data.id, url });
  revalidateProduct([product?.slug]);
  return data;
});

export async function addProductImage(productId: string, path: string) {
  return addGuarded(productId, path);
}

const removeGuarded = withAdmin(async (admin, imageId: string): Promise<{ ok: true } | Failure> => {
  const db = adminDb();
  const { data: img } = await db
    .from('product_images')
    .select('id, url, is_primary, product_id, products(slug)')
    .eq('id', imageId)
    .maybeSingle();
  if (!img) return { ok: true }; // already gone
  // only the row goes; the file stays in Storage
  const { error } = await db.from('product_images').delete().eq('id', imageId);
  if (error) throw new Error(error.message);
  if (img.is_primary) {
    const { data: next } = await db
      .from('product_images')
      .select('id')
      .eq('product_id', img.product_id)
      .order('position')
      .limit(1)
      .maybeSingle();
    if (next) await db.from('product_images').update({ is_primary: true }).eq('id', next.id);
  }
  await writeAudit(admin.email, 'image.remove', img.product_id, { image_id: imageId, url: img.url });
  revalidateProduct([(img.products as unknown as { slug: string } | null)?.slug]);
  return { ok: true };
});

export async function removeProductImage(imageId: string) {
  return removeGuarded(imageId);
}
