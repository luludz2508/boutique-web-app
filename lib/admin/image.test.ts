import { expect, test } from 'vitest';
import { fitWithin, imageProblem } from './image';

test('fitWithin shrinks the long edge to the limit, keeping the shape', () => {
  expect(fitWithin(4000, 3000, 2000)).toEqual({ width: 2000, height: 1500 });
  expect(fitWithin(1000, 5000, 2000)).toEqual({ width: 400, height: 2000 });
});

test('fitWithin leaves small photos alone', () => {
  expect(fitWithin(1200, 800, 2000)).toEqual({ width: 1200, height: 800 });
});

test('imageProblem rejects non-images', () => {
  expect(imageProblem({ type: 'application/pdf', size: 1 })).toBe('Tệp này không phải ảnh');
  expect(imageProblem({ type: '', size: 1 })).toBe('Tệp này không phải ảnh');
});

test('imageProblem rejects files over 20 MB', () => {
  expect(imageProblem({ type: 'image/jpeg', size: 25 * 1024 * 1024 })).toBe('Ảnh lớn hơn 20 MB, hãy chọn ảnh nhỏ hơn');
});

test('imageProblem lets HEIC through so the decoder decides', () => {
  expect(imageProblem({ type: 'image/heic', size: 3e6 })).toBeNull();
});
