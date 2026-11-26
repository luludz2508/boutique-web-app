import 'server-only';
import { adminDb } from '@/lib/supabase/admin';
import { latestTimestamp } from './audit';
import type { AdminListItem, AdminProduct, AdminVariant } from './types';

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

/** One product for the form — any status, photos in order, with its concurrency token. */
export async function getAdminProduct(id: string): Promise<AdminProduct | null> {
  const { data, error } = await adminDb()
    .from('products')
    .select(
      'id, name_vi, slug, product_type, status, featured, excerpt_vi, description_vi, specs, updated_at, variants:product_variants(id, option1_value, price, compare_at_price, sku, inventory_quantity, track_inventory, position, updated_at), images:product_images(id, url, position)',
    )
    .eq('id', id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return null;
  const row = data as unknown as Omit<AdminProduct, 'version' | 'variants' | 'images'> & {
    updated_at: string;
    variants: (AdminVariant & { position: number | null; updated_at: string })[];
    images: { id: string; url: string; position: number | null }[];
  };
  const { updated_at, variants, images, ...product } = row;
  return {
    ...product,
    specs: Array.isArray(product.specs) ? product.specs : [],
    version: latestTimestamp([updated_at, ...variants.map((v) => v.updated_at)]),
    variants: [...variants]
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      .map(({ position: _p, updated_at: _u, ...v }) => ({
        ...v,
        price: Number(v.price),
        compare_at_price: v.compare_at_price == null ? null : Number(v.compare_at_price),
      })),
    images: images.map((i) => ({ ...i, position: i.position ?? 0 })).sort((a, b) => a.position - b.position),
  };
}

/** Slugs a product may not take: other products' slugs and other products' old (redirected) slugs. */
export async function takenSlugs(exceptProductId?: string): Promise<Set<string>> {
  const db = adminDb();
  const [products, redirects] = await Promise.all([
    db.from('products').select('id, slug'),
    db.from('product_slug_redirects').select('old_slug, product_id'),
  ]);
  if (products.error) throw new Error(products.error.message);
  if (redirects.error) throw new Error(redirects.error.message);
  const taken = new Set<string>();
  for (const p of products.data) if (p.id !== exceptProductId) taken.add(p.slug);
  for (const r of redirects.data) if (r.product_id !== exceptProductId) taken.add(r.old_slug);
  return taken;
}
