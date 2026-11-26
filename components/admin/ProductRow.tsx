import Link from 'next/link';
import { STATUS_LABEL, type AdminListItem } from '@/lib/admin/types';
import { splitProductName } from '@/lib/description';
import { InlineNumber } from './InlineNumber';

const statusTone = { published: 'text-[#5f7d3a]', draft: 'text-ink-2', archived: 'text-seal' } as const;

/** One product in the admin list: thumbnail and name, then one editable line per variant. */
export function ProductRow({ product }: { product: AdminListItem }) {
  const { title, detail } = splitProductName(product.name_vi);
  return (
    <article className="border border-ink/15 bg-white/50 p-3 sm:p-4">
      <div className="flex gap-3">
        <div className="h-16 w-16 shrink-0 overflow-hidden bg-paper-2">
          {product.thumb && <img src={product.thumb} alt="" loading="lazy" className="h-full w-full object-cover" />}
        </div>
        <div className="min-w-0 flex-1">
          <Link
            href={`/admin/products/${product.id}`}
            className="line-clamp-2 font-medium leading-snug underline-offset-4 hover:underline"
          >
            {title}
            {detail && <span className="font-normal text-ink-2"> · {detail}</span>}
          </Link>
          <p className="mt-1 text-xs text-ink-2">
            {product.product_type || 'Chưa có loại'} ·{' '}
            <span className={statusTone[product.status]}>{STATUS_LABEL[product.status]}</span>
          </p>
        </div>
      </div>

      <div className="mt-3 divide-y divide-ink/10 border-t border-ink/10">
        {product.variants.map((v) => (
          <div key={v.id} className="grid grid-cols-2 gap-x-3 gap-y-1 py-2 sm:grid-cols-[1fr_10rem_7rem] sm:items-end">
            <p className="col-span-2 truncate text-sm sm:col-span-1 sm:pb-3">
              {v.option1_value && v.option1_value !== 'Default Title' ? v.option1_value : 'Mặc định'}
              {v.sku && <span className="ml-2 font-mono text-xs text-ink-2">{v.sku}</span>}
            </p>
            <InlineNumber variantId={v.id} field="price" value={v.price} updatedAt={v.updated_at} label="Giá (đ)" />
            <InlineNumber
              variantId={v.id}
              field="inventory_quantity"
              value={v.inventory_quantity}
              updatedAt={v.updated_at}
              label={v.track_inventory ? 'Tồn kho' : 'Tồn kho (không theo dõi)'}
            />
          </div>
        ))}
      </div>
    </article>
  );
}
