'use client';

import { useState, useTransition } from 'react';
import { sendCode, verifyCode } from './actions';

const input =
  'mt-2 block h-12 w-full border border-ink/30 bg-white/70 px-3 text-base text-ink outline-none focus:border-ink';
const button =
  'mt-5 h-12 w-full bg-ink text-sm font-medium tracking-wide text-paper transition-opacity disabled:opacity-50';

export function LoginForm({ next, forbidden }: { next: string; forbidden: boolean }) {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(forbidden ? 'Email này không có quyền vào trang quản trị.' : null);
  const [pending, start] = useTransition();

  if (step === 'email') {
    return (
      <form
        className="mt-8"
        action={(fd) =>
          start(async () => {
            setError(null);
            await sendCode(fd);
            setEmail(String(fd.get('email') ?? '').trim());
            setStep('code');
          })
        }
      >
        <label className="block text-sm text-ink-2">
          Email
          <input name="email" type="email" required autoComplete="email" inputMode="email" className={input} />
        </label>
        {error && <p className="mt-3 text-sm text-seal">{error}</p>}
        <button className={button} disabled={pending}>
          {pending ? 'Đang gửi…' : 'Gửi mã đăng nhập'}
        </button>
        <button
          type="button"
          onClick={(e) => {
            const form = e.currentTarget.form;
            if (!form?.reportValidity()) return;
            setEmail(String(new FormData(form).get('email') ?? '').trim());
            setError(null);
            setStep('code');
          }}
          className="mt-3 h-11 w-full text-sm text-ink-2 underline-offset-4 hover:underline"
        >
          Đã có mã? Nhập mã
        </button>
      </form>
    );
  }

  return (
    <form
      className="mt-8"
      action={(fd) =>
        start(async () => {
          setError(null);
          const res = await verifyCode(fd);
          if (res?.error) setError(res.error);
        })
      }
    >
      <p className="text-sm text-ink-2">
        Nếu email hợp lệ, mã 6 số đã được gửi tới <strong className="text-ink">{email}</strong>. Mở hộp thư (kể cả mục
        Spam) và nhập mã.
      </p>
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="next" value={next} />
      <label className="mt-5 block text-sm text-ink-2">
        Mã đăng nhập
        <input
          name="code"
          required
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9 ]{6,7}"
          maxLength={7}
          autoFocus
          className={`${input} text-center font-mono text-2xl tracking-[.4em]`}
        />
      </label>
      {error && <p className="mt-3 text-sm text-seal">{error}</p>}
      <button className={button} disabled={pending}>
        {pending ? 'Đang kiểm tra…' : 'Đăng nhập'}
      </button>
      <button
        type="button"
        onClick={() => {
          setStep('email');
          setError(null);
        }}
        className="mt-3 h-11 w-full text-sm text-ink-2 underline-offset-4 hover:underline"
      >
        Dùng email khác
      </button>
    </form>
  );
}
