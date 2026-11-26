import { expect, test } from 'vitest';
import { fromFormState, toFormState, withVariantIds } from './form-state';
import { emptyForm } from './seed';

const base = emptyForm();

test('toFormState shows prices the way people type them', () => {
  const s = toFormState({ ...base, variants: [{ ...base.variants[0], price: 1200000, compare_at_price: null, inventory_quantity: 4 }] });
  expect(s.variants[0]).toMatchObject({ price: '1.200.000', compare_at_price: '', inventory_quantity: '4' });
});

test('fromFormState parses typed prices and stock', () => {
  const s = toFormState(base);
  s.variants[0] = { ...s.variants[0], price: '520.000đ', compare_at_price: '', inventory_quantity: ' 3 ' };
  const r = fromFormState(s);
  expect(r).toEqual({ values: expect.objectContaining({}) });
  if ('values' in r) {
    expect(r.values.variants[0]).toMatchObject({ price: 520000, compare_at_price: null, inventory_quantity: 3 });
  }
});

test('fromFormState reports unreadable numbers per field', () => {
  const s = toFormState(base);
  s.variants[0] = { ...s.variants[0], price: 'abc', compare_at_price: '1,5', inventory_quantity: '-1' };
  expect(fromFormState(s)).toEqual({
    issues: {
      'variants.0.price': 'Giá không hợp lệ',
      'variants.0.compare_at_price': 'Giá không hợp lệ',
      'variants.0.inventory_quantity': 'Tồn kho phải là số nguyên ≥ 0',
    },
  });
});

test('withVariantIds gives newly created variants the ids the database assigned', () => {
  const s = toFormState({ ...base, variants: [{ ...base.variants[0], id: 'a' }, { ...base.variants[0] }] });
  const next = withVariantIds(s, ['a', 'b']);
  expect(next.variants.map((v) => v.id)).toEqual(['a', 'b']);
  expect(withVariantIds(s, ['a'])).toBe(s); // length mismatch: leave untouched
});
