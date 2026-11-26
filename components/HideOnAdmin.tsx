'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/** Renders nothing on /admin pages, so the shop's navbar and footer stay off the admin. */
export function HideOnAdmin({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/admin' || pathname?.startsWith('/admin/')) return null;
  return <>{children}</>;
}
