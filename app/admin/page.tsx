import Link from 'next/link';
import { AdminNav } from '@/components/admin/AdminNav';
import { ProductRow } from '@/components/admin/ProductRow';
import { requireAdmin } from '@/lib/admin/auth';
import { listAdminProducts } from '@/lib/admin/data';
import { filterAdminList } from '@/lib/admin/list';
import { STATUS_LABEL, type ProductStatus } from '@/lib/admin/types';
import { toCategories } from '@/lib/display';

export const dynamic = 'force-dynamic';

type Search = { q?: string; type?: string; status?: string };
const statuses = ['published', 'draft', 'archived'] as const;
const field = 'h-11 border border-ink/25 bg-white/70 px-3 text-base outline-none focus:border-ink';

export default async function AdminProductsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const admin = await requireAdmin();
  const sp = await searchParams;
  const status = (statuses as readonly string[]).includes(sp.status ?? '') ? (sp.status as ProductStatus) : 'all';
  const all = await listAdminProducts();
  const types = toCategories(all.map((p) => p.product_type));
  const items = filterAdminList(all, { search: sp.q, type: sp.type, status });

  return (
    <>
      <AdminNav email={admin.email} />
      <main className="mx-auto max-w-5xl px-3 pb-20 pt-5 sm:px-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-3xl font-light">Sản phẩm</h1>
          <Link
            href="/admin/products/new"
            className="flex h-11 items-center bg-ink px-4 text-sm font-medium text-paper hover:opacity-90"
          >
            + Thêm sản phẩm
          </Link>
        </div>

        <form className="mt-4 grid gap-2 sm:grid-cols-[1fr_12rem_10rem_auto]" role="search">
          <input name="q" defaultValue={sp.q} placeholder="Tìm tên hoặc SKU" type="search" className={field} />
          <select name="type" defaultValue={sp.type ?? ''} className={field} aria-label="Loại">
            <option value="">Mọi loại</option>
            {types.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label} ({t.count})
              </option>
            ))}
          </select>
          <select name="status" defaultValue={status} className={field} aria-label="Trạng thái">
            <option value="all">Đang bán + Ẩn</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s]}
              </option>
            ))}
          </select>
          <button className="h-11 border border-ink px-4 text-sm">Lọc</button>
        </form>

        <p className="mt-4 text-sm text-ink-2">{items.length} sản phẩm</p>
        <div className="mt-2 space-y-3">
          {items.map((p) => (
            <ProductRow key={p.id} product={p} />
          ))}
          {items.length === 0 && <p className="py-12 text-center text-ink-2">Không có sản phẩm nào khớp.</p>}
        </div>
      </main>
    </>
  );
}
