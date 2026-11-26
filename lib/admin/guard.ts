import { isAdminEmail } from './emails';

export type AdminRouteDecision = 'allow' | 'login' | 'forbidden' | 'pass';

/** What the middleware does with a request: let it through, send to login, or refuse the signed-in email. */
export function adminRouteDecision(
  pathname: string,
  email: string | null,
  allow: readonly string[],
  isServerAction = false,
): AdminRouteDecision {
  // a redirect would break the action's fetch; withAdmin re-checks and answers "session expired" itself
  if (isServerAction) return 'pass';
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/');
  if (!isAdmin || pathname === '/admin/login' || pathname.startsWith('/admin/login/')) return 'pass';
  if (!email) return 'login';
  return isAdminEmail(email, allow) ? 'allow' : 'forbidden';
}
