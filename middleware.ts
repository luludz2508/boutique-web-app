import { NextResponse, type NextRequest } from 'next/server';
import { parseAdminEmails } from '@/lib/admin/emails';
import { adminRouteDecision } from '@/lib/admin/guard';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { supabase, user, response } = await updateSession(request);
  const { pathname, search } = request.nextUrl;
  const decision = adminRouteDecision(pathname, user?.email ?? null, parseAdminEmails(process.env.ADMIN_EMAILS));

  if (decision === 'login') {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }
  if (decision === 'forbidden') {
    await supabase.auth.signOut();
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    url.search = '?error=forbidden';
    const res = NextResponse.redirect(url);
    // carry the cleared session cookies onto the redirect
    response().cookies.getAll().forEach((c) => res.cookies.set(c));
    return res;
  }
  return response();
}

export const config = { matcher: ['/admin/:path*', '/admin'] };
