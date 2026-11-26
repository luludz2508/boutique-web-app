import 'server-only';
import { createServerSupabase } from '@/lib/supabase/server';
import { isAdminEmail, parseAdminEmails } from './emails';

export const AUTH_MESSAGE = 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.';

export class AdminAuthError extends Error {
  constructor() {
    super('admin sign-in required');
    this.name = 'AdminAuthError';
  }
}

export type Admin = { email: string };
export type AuthFailure = { error: 'auth'; message: string };

/** Re-checks the session and the allow-list. Every write calls this — the middleware alone is not trusted. */
export async function requireAdmin(): Promise<Admin> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email || !isAdminEmail(user.email, parseAdminEmails(process.env.ADMIN_EMAILS))) {
    throw new AdminAuthError();
  }
  return { email: user.email.toLowerCase() };
}

/** Testable core of withAdmin: an expired session becomes a value the form can show; other errors propagate. */
export function withAdminUsing<A extends unknown[], R>(
  require: () => Promise<Admin>,
  fn: (admin: Admin, ...args: A) => Promise<R>,
): (...args: A) => Promise<R | AuthFailure> {
  return async (...args: A) => {
    let admin: Admin;
    try {
      admin = await require();
    } catch (e) {
      if (e instanceof AdminAuthError) return { error: 'auth', message: AUTH_MESSAGE };
      throw e;
    }
    return fn(admin, ...args);
  };
}

export function withAdmin<A extends unknown[], R>(fn: (admin: Admin, ...args: A) => Promise<R>) {
  return withAdminUsing(requireAdmin, fn);
}
