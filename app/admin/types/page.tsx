import { AdminNav } from '@/components/admin/AdminNav';
import { TypesTable } from '@/components/admin/TypesTable';
import { requireAdmin } from '@/lib/admin/auth';
import { listProductTypes } from '@/lib/admin/data';
import { toCategories } from '@/lib/display';

export const dynamic = 'force-dynamic';

export default async function TypesPage() {
  const admin = await requireAdmin();
  const list = await listProductTypes();
  const types = toCategories(list).map(({ value, count }) => ({ name: value, count }));
  const untyped = list.filter((t) => !t).length;
  return (
    <>
      <AdminNav email={admin.email} />
      <main className="mx-auto max-w-3xl px-3 pb-20 pt-5 sm:px-4">
        <h1 className="font-display text-3xl font-light">Loại sản phẩm</h1>
        <p className="mt-2 text-sm text-ink-2">
          Đổi tên một loại sẽ đổi trên mọi sản phẩm thuộc loại đó. Đổi sang tên của một loại có sẵn là gộp hai loại.
        </p>
        <TypesTable types={types} />
        {untyped > 0 && <p className="mt-4 text-sm text-ink-2">{untyped} sản phẩm chưa có loại.</p>}
      </main>
    </>
  );
}
