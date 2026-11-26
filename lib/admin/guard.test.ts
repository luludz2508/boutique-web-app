import { expect, test } from 'vitest';
import { adminRouteDecision } from './guard';

const allow = ['a@example.test'];

test('non-admin routes and the login page pass through', () => {
  expect(adminRouteDecision('/products', null, allow)).toBe('pass');
  expect(adminRouteDecision('/admin/login', null, allow)).toBe('pass');
  expect(adminRouteDecision('/administrator', null, [])).toBe('pass');
});

test('signed-out visitors are sent to login', () => {
  expect(adminRouteDecision('/admin', null, allow)).toBe('login');
});

test('signed-in emails outside the list are forbidden', () => {
  expect(adminRouteDecision('/admin/products/1', 'x@example.test', allow)).toBe('forbidden');
});

test('listed emails are allowed regardless of case', () => {
  expect(adminRouteDecision('/admin/types', 'A@example.test', allow)).toBe('allow');
});

test('server action posts pass through so the action itself answers "session expired"', () => {
  expect(adminRouteDecision('/admin/products/1', null, allow, true)).toBe('pass');
  expect(adminRouteDecision('/admin', 'x@example.test', allow, true)).toBe('pass');
});
