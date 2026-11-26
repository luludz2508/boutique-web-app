import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AdminNav } from '@/components/admin/AdminNav';
import { ProductForm } from '@/components/admin/ProductForm';
import { requireAdmin } from '@/lib/admin/auth';
import { getAdminProduct, listProductTypes } from '@/lib/admin/data';
import { seedForm } from '@/lib/admin/seed';
import { splitProductName } from '@/lib/description';
import { toCategories } from '@/lib/display';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  const admin = await requireAdmin();
  const { id } = await params;
  const { created } = await searchParams;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const [product, typeList] = await Promise.all([getAdminProduct(id), listProductTypes()]);
  if (!product) notFound();
  const types = toCategories(typeList).map((t) => t.value);

  return (
    <>
      <AdminNav email={admin.email} />
      <main className="mx-auto max-w-3xl px-3 pt-5 sm:px-4">
        <Link href="/admin" className="text-sm text-ink-2 hover:text-ink">
          ← Sản phẩm
        </Link>
        <h1 className="mb-6 mt-2 font-display text-3xl font-light">{splitProductName(product.name_vi).title}</h1>
        {created && (
          <p className="mb-6 border border-[#5f7d3a]/40 bg-[#eef2e4] px-4 py-3 text-sm text-[#3f5a22]">
            Đã tạo sản phẩm (đang Ẩn). Giờ có thể thêm ảnh.
          </p>
        )}
        <ProductForm initial={seedForm(product)} productId={product.id} version={product.version} types={types} images={product.images} />
      </main>
    </>
  );
}
