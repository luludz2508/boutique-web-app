'use server';

import { redirect } from 'next/navigation';
import { isAdminEmail, parseAdminEmails } from '@/lib/admin/emails';
import { createServerSupabase } from '@/lib/supabase/server';

const allow = () => parseAdminEmails(process.env.ADMIN_EMAILS);
const safeNext = (next: unknown) =>
  typeof next === 'string' && /^\/admin(\/|$|\?)/.test(next) && !next.startsWith('//') ? next : '/admin';

/** Sends a sign-in code — only to listed emails, but always answers the same, so the list stays private. */
export async function sendCode(formData: FormData): Promise<{ ok: true }> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  if (isAdminEmail(email, allow())) {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: true } });
    if (error) console.error('[admin] signInWithOtp failed:', error.message);
  }
  return { ok: true };
}

export async function verifyCode(formData: FormData): Promise<{ error?: string }> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const token = String(formData.get('code') ?? '').replace(/\s/g, '');
  if (!/^\d{6}$/.test(token)) return { error: 'Mã gồm 6 chữ số.' };
  if (!isAdminEmail(email, allow())) return { error: 'Mã không đúng hoặc đã hết hạn.' };

  const supabase = await createServerSupabase();
  const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
  if (error || !data.user) return { error: 'Mã không đúng hoặc đã hết hạn.' };
  if (!isAdminEmail(data.user.email, allow())) {
    await supabase.auth.signOut();
    return { error: 'Email này không có quyền vào trang quản trị.' };
  }
  redirect(safeNext(formData.get('next')));
}

export async function signOut(): Promise<void> {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect('/admin/login');
}
