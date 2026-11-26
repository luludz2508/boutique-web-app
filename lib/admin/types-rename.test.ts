import { expect, test } from 'vitest';
import { validateTypeRename } from './types-rename';

test('a new name is required', () => {
  expect(validateTypeRename('Nhang', '   ', ['Nhang'])).toBe('Cần nhập tên loại mới');
});

test('the new name must differ from the old one', () => {
  expect(validateTypeRename('Nhang', ' Nhang ', ['Nhang'])).toBe('Tên mới trùng tên cũ');
});

test('renaming or merging into an existing type is fine', () => {
  expect(validateTypeRename('Trầm hương đốt', 'Trầm hương xông đốt', ['Trầm hương đốt', 'Trầm hương xông đốt'])).toBeNull();
  expect(validateTypeRename('Nhang', 'Nhang trầm', ['Nhang'])).toBeNull();
});
