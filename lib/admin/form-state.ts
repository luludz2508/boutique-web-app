import { formatPriceInput, parsePrice } from './price';
import type { ProductFormValues } from './schema';

type Variant = ProductFormValues['variants'][number];

/** What the form holds while someone types: numbers stay as text until Save. */
export type FormVariant = Omit<Variant, 'price' | 'compare_at_price' | 'inventory_quantity'> & {
  price: string;
  compare_at_price: string;
  inventory_quantity: string;
};
export type FormState = Omit<ProductFormValues, 'variants'> & { variants: FormVariant[] };

export function toFormState(v: ProductFormValues): FormState {
  return {
    ...v,
    variants: v.variants.map((x) => ({
      ...x,
      price: formatPriceInput(x.price),
      compare_at_price: x.compare_at_price == null ? '' : formatPriceInput(x.compare_at_price),
      inventory_quantity: String(x.inventory_quantity),
    })),
  };
}

/** Parses the typed numbers; returns per-field messages when any can't be read. */
export function fromFormState(s: FormState): { values: ProductFormValues } | { issues: Record<string, string> } {
  const issues: Record<string, string> = {};
  const variants = s.variants.map((x, i) => {
    const price = parsePrice(x.price);
    const compare = x.compare_at_price.trim() === '' ? null : parsePrice(x.compare_at_price);
    const stockText = x.inventory_quantity.trim();
    const stock = /^\d+$/.test(stockText) ? Number(stockText) : null;
    if (price === null) issues[`variants.${i}.price`] = 'Giá không hợp lệ';
    if (x.compare_at_price.trim() !== '' && compare === null) issues[`variants.${i}.compare_at_price`] = 'Giá không hợp lệ';
    if (stock === null) issues[`variants.${i}.inventory_quantity`] = 'Tồn kho phải là số nguyên ≥ 0';
    return { ...x, price: price ?? 0, compare_at_price: compare, inventory_quantity: stock ?? 0 };
  });
  if (Object.keys(issues).length) return { issues };
  return { values: { ...s, variants } };
}
