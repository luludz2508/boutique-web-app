import { LoginForm } from './LoginForm';

export const metadata = { title: 'Đăng nhập quản trị', robots: { index: false } };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next, error } = await searchParams;
  return (
    <main className="flex min-h-[100svh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <p className="text-xs uppercase tracking-[.24em] text-ink-2">Trầm hương Sơn Hồng</p>
        <h1 className="mt-2 font-display text-4xl font-light">Quản trị</h1>
        <LoginForm next={next ?? '/admin'} forbidden={error === 'forbidden'} />
      </div>
    </main>
  );
}
