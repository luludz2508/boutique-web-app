import type { ReactNode } from 'react';

export const metadata = { title: 'Quản trị · Trầm Hương Sơn Hồng', robots: { index: false, follow: false } };

/** Admin pages: plain paper, no shop navbar/footer (hidden by HideOnAdmin), no ink effects. */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-[100svh] bg-paper/60 text-ink">{children}</div>;
}
