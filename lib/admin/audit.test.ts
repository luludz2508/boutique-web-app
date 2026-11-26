import { expect, test } from 'vitest';
import { diffChanges, isStale, latestTimestamp } from './audit';

test('diffChanges lists only fields that changed', () => {
  expect(diffChanges({ price: 480000, sku: 'a' }, { price: 520000, sku: 'a' })).toEqual({ price: { from: 480000, to: 520000 } });
});

test('diffChanges compares nested values deeply', () => {
  expect(diffChanges({ a: [1] }, { a: [1] })).toEqual({});
  expect(diffChanges({ s: [{ label: 'A', value: '1' }] }, { s: [{ label: 'A', value: '2' }] })).toEqual({
    s: { from: [{ label: 'A', value: '1' }], to: [{ label: 'A', value: '2' }] },
  });
});

test('diffChanges reports fields added on one side', () => {
  expect(diffChanges({}, { featured: true })).toEqual({ featured: { from: undefined, to: true } });
});

test('isStale is true when the database copy is newer', () => {
  expect(isStale('2026-11-26T10:00:00Z', '2026-11-26T10:00:01Z')).toBe(true);
  expect(isStale('2026-11-26T10:00:00Z', '2026-11-26T10:00:00Z')).toBe(false);
});

test('isStale compares instants, not strings', () => {
  expect(isStale('2026-11-26T10:00:00.000Z', '2026-11-26T10:00:00Z')).toBe(false);
  expect(isStale('2026-11-26T17:00:00+07:00', '2026-11-26T10:00:00.000+00:00')).toBe(false);
});

test('isStale sees microsecond differences Postgres reports', () => {
  expect(isStale('2026-11-26T10:00:00.123456+00:00', '2026-11-26T10:00:00.123457+00:00')).toBe(true);
});

test('latestTimestamp returns the newest original string', () => {
  expect(latestTimestamp(['2026-11-26T10:00:00.1+00:00', '2026-11-26T10:00:00.123457+00:00', '2026-11-26T09:00:00Z'])).toBe(
    '2026-11-26T10:00:00.123457+00:00',
  );
});
