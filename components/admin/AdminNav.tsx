import Link from 'next/link';
import { signOut } from '@/app/admin/login/actions';

const link = 'flex h-11 items-center px-3 text-sm text-ink-2 hover:text-ink';

/** Admin top bar: plain, dense, no ink effects. */
export function AdminNav({ email }: { email?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/15 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-1 px-2 sm:px-4">
        <Link href="/admin" className="mr-2 flex h-12 items-center px-2 font-display text-xl">
          Quản trị
        </Link>
        <Link href="/admin" className={link}>
          Sản phẩm
        </Link>
        <Link href="/admin/types" className={link}>
          Loại
        </Link>
        <span className="ml-auto hidden truncate text-xs text-ink-2 md:block">{email}</span>
        <form action={signOut}>
          <button className={link}>Đăng xuất</button>
        </form>
      </div>
    </header>
  );
}
