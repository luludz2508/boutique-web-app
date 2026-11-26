import { splitDescription } from '@/lib/description';
import type { ProductFormValues } from './schema';
import type { AdminProduct } from './types';

/** Form values for an existing product. Old Haravan products get their spec table pulled out of the HTML. */
export function seedForm(p: AdminProduct): ProductFormValues {
  const fromHtml = p.specs.length === 0 ? splitDescription(p.description_vi) : null;
  return {
    name_vi: p.name_vi,
    slug: p.slug,
    product_type: p.product_type ?? '',
    status: p.status,
    featured: !!p.featured,
    excerpt_vi: p.excerpt_vi ?? '',
    description_vi: fromHtml ? fromHtml.body : (p.description_vi ?? ''),
    specs: fromHtml ? fromHtml.specs : p.specs,
    variants: p.variants.map((v) => ({
      id: v.id,
      option1_value: v.option1_value ?? '',
      price: Number(v.price),
      compare_at_price: v.compare_at_price == null ? null : Number(v.compare_at_price),
      sku: v.sku ?? '',
      inventory_quantity: v.inventory_quantity ?? 0,
      track_inventory: v.track_inventory ?? true,
    })),
    image_order: [...p.images].sort((a, b) => a.position - b.position).map((i) => i.id),
  };
}

/** Blank form for a new product (always starts hidden). */
export function emptyForm(): ProductFormValues {
  return {
    name_vi: '',
    slug: '',
    product_type: '',
    status: 'draft',
    featured: false,
    excerpt_vi: '',
    description_vi: '',
    specs: [],
    variants: [{ option1_value: '', price: 0, compare_at_price: null, sku: '', inventory_quantity: 0, track_inventory: true }],
    image_order: [],
  };
}
