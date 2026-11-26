import { expect, test, vi } from 'vitest';

vi.mock('server-only', () => ({}));
vi.mock('@/lib/supabase/server', () => ({ createServerSupabase: vi.fn() }));

import { AdminAuthError, withAdminUsing } from './auth';

test('withAdmin turns an expired session into a value the form can show', async () => {
  const guarded = withAdminUsing(async () => {
    throw new AdminAuthError();
  }, async () => 'x');
  await expect(guarded()).resolves.toEqual({
    error: 'auth',
    message: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.',
  });
});

test('withAdmin rethrows other errors', async () => {
  const boom = withAdminUsing(async () => ({ email: 'a@example.test' }), async () => {
    throw new Error('db');
  });
  await expect(boom()).rejects.toThrow('db');
});

test('withAdmin passes the admin and arguments through', async () => {
  const echo = withAdminUsing(async () => ({ email: 'a@example.test' }), async (admin, n: number) => `${admin.email}:${n}`);
  await expect(echo(3)).resolves.toBe('a@example.test:3');
});
