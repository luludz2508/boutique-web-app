import { expect, test } from 'vitest';
import { isAdminEmail, parseAdminEmails } from './emails';

test('parseAdminEmails trims, lowercases and drops blanks', () => {
  expect(parseAdminEmails(' A@Example.test , b@example.test,, ')).toEqual(['a@example.test', 'b@example.test']);
  expect(parseAdminEmails(undefined)).toEqual([]);
});

test('isAdminEmail ignores case and rejects missing emails or empty lists', () => {
  expect(isAdminEmail('B@EXAMPLE.TEST', ['b@example.test'])).toBe(true);
  expect(isAdminEmail(' b@example.test ', ['b@example.test'])).toBe(true);
  expect(isAdminEmail('c@example.test', ['b@example.test'])).toBe(false);
  expect(isAdminEmail(null, ['b@example.test'])).toBe(false);
  expect(isAdminEmail('a@example.test', [])).toBe(false);
});
