import 'server-only';
import { adminDb } from '@/lib/supabase/admin';
import type { AdminListItem } from './types';

type Row = {
  id: string;
  slug: string;
  name_vi: string;
  product_type: string | null;
  status: AdminListItem['status'];
  updated_at: string;
  images: { url: string; position: number | null; is_primary: boolean | null }[];
  variants: (AdminListItem['variants'][number] & { position: number | null })[];
};

/** Every product, any status, newest edit first — filtering happens in filterAdminList. */
export async function listAdminProducts(): Promise<AdminListItem[]> {
  const { data, error } = await adminDb()
    .from('products')
    .select(
      'id, slug, name_vi, product_type, status, updated_at, images:product_images(url, position, is_primary), variants:product_variants(id, option1_value, sku, price, inventory_quantity, track_inventory, updated_at, position)',
    )
    .order('updated_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data as unknown as Row[]).map(({ images, variants, ...p }) => {
    const sorted = [...images].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    const thumb = (sorted.find((i) => i.is_primary) ?? sorted[0])?.url ?? null;
    return {
      ...p,
      thumb,
      variants: [...variants]
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .map(({ position: _p, ...v }) => ({ ...v, price: Number(v.price) })),
    };
  });
}

export async function listProductTypes(): Promise<(string | null)[]> {
  const { data, error } = await adminDb().from('products').select('product_type');
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => r.product_type as string | null);
}

export async function writeAudit(email: string, action: string, productId: string | null, changes: object): Promise<void> {
  const { error } = await adminDb().from('admin_audit').insert({ email, action, product_id: productId, changes });
  // the edit itself already succeeded; a missing log line must not undo it for the user
  if (error) console.error('[admin] audit write failed:', error.message);
}
