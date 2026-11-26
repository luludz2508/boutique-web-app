import Link from 'next/link';
import { AdminNav } from '@/components/admin/AdminNav';
import { ProductForm } from '@/components/admin/ProductForm';
import { requireAdmin } from '@/lib/admin/auth';
import { listProductTypes } from '@/lib/admin/data';
import { emptyForm } from '@/lib/admin/seed';
import { toCategories } from '@/lib/display';

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  const admin = await requireAdmin();
  const types = toCategories(await listProductTypes()).map((t) => t.value);
  return (
    <>
      <AdminNav email={admin.email} />
      <main className="mx-auto max-w-3xl px-3 pt-5 sm:px-4">
        <Link href="/admin" className="text-sm text-ink-2 hover:text-ink">
          ← Sản phẩm
        </Link>
        <h1 className="mb-6 mt-2 font-display text-3xl font-light">Thêm sản phẩm</h1>
        <ProductForm initial={emptyForm()} types={types} images={[]} />
      </main>
    </>
  );
}
