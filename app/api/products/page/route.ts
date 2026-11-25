/**
 * GET /api/products/page?type=&search=&sort=&offset=
 * One page of slim product cards for the /products infinite scroll.
 */
import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/db/products';
import { PAGE_SIZE, queryProducts, toCard } from '@/lib/catalog';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const sp = new URL(request.url).searchParams;
  const offset = Math.max(0, Number.parseInt(sp.get('offset') ?? '0', 10) || 0);

  try {
    const all = queryProducts(await getAllProducts(), {
      type: sp.get('type'),
      search: sp.get('search'),
      sort: sp.get('sort'),
    });
    const items = all.slice(offset, offset + PAGE_SIZE).map(toCard);
    const next = offset + items.length;
    return NextResponse.json({ items, total: all.length, nextOffset: next < all.length ? next : null });
  } catch (error) {
    console.error('products page failed', error);
    return NextResponse.json({ error: 'Không tải được sản phẩm' }, { status: 500 });
  }
}
