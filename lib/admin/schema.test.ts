import { expect, test } from 'vitest';
import { formIssues, ProductFormSchema, type ProductFormValues } from './schema';

const valid: ProductFormValues = {
  name_vi: 'Vòng trầm',
  slug: 'vong-tram',
  product_type: 'Vòng tay',
  status: 'draft',
  featured: false,
  excerpt_vi: '',
  description_vi: '<p>x</p>',
  specs: [],
  variants: [{ option1_value: '8 li', price: 520000, compare_at_price: null, sku: '', inventory_quantity: 3, track_inventory: true }],
  image_order: [],
};

const issuesOf = (v: unknown) => {
  const r = ProductFormSchema.safeParse(v);
  return r.success ? {} : formIssues(r.error);
};

test('a complete product passes', () => {
  expect(ProductFormSchema.safeParse(valid).success).toBe(true);
});

test('name is required', () => {
  expect(issuesOf({ ...valid, name_vi: '   ' })).toMatchObject({ name_vi: 'Cần nhập tên' });
});

test('at least one variant is required', () => {
  expect(issuesOf({ ...valid, variants: [] })).toMatchObject({ variants: 'Cần ít nhất một phiên bản' });
});

test('negative stock and prices are rejected', () => {
  const bad = { ...valid, variants: [{ ...valid.variants[0], inventory_quantity: -1, price: -5 }] };
  expect(Object.keys(issuesOf(bad))).toEqual(expect.arrayContaining(['variants.0.inventory_quantity', 'variants.0.price']));
});

test('blank spec rows are dropped; half-filled rows are an error', () => {
  const r = ProductFormSchema.parse({ ...valid, specs: [{ label: ' ', value: '' }, { label: 'Kích thước', value: '8 li' }] });
  expect(r.specs).toEqual([{ label: 'Kích thước', value: '8 li' }]);
  expect(issuesOf({ ...valid, specs: [{ label: 'Kích thước', value: '' }] })).toMatchObject({
    'specs.0.value': 'Cần nhập cả nhãn và giá trị',
  });
});
