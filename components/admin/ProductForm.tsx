'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { saveProduct, setStatus, type SaveResult } from '@/app/admin/products/actions';
import { fromFormState, toFormState, withVariantIds, type FormState } from '@/lib/admin/form-state';
import type { ProductFormValues } from '@/lib/admin/schema';
import { STATUS_LABEL, type AdminImage } from '@/lib/admin/types';
import { ImageManager } from './ImageManager';
import { SpecsEditor } from './SpecsEditor';
import { field, ghostButton, label, section, sectionTitle } from './ui';
import { VariantsEditor } from './VariantsEditor';

// the editor is heavy and admin-only: never server-rendered, never in public bundles
const RichText = dynamic(() => import('./RichText'), {
  ssr: false,
  loading: () => <div className="min-h-[16rem] border border-ink/25 bg-white/70" />,
});

type Props = {
  initial: ProductFormValues;
  productId?: string;
  version?: string;
  types: string[];
  images: AdminImage[];
};

type Banner = { tone: 'error' | 'ok'; text: string; login?: boolean } | null;

export function ProductForm({ initial, productId, version: initialVersion, types, images }: Props) {
  const router = useRouter();
  const { register, control, handleSubmit, reset, resetField, watch, formState, setValue } = useForm<FormState>({
    defaultValues: toFormState(initial),
  });
  const [version, setVersion] = useState(initialVersion);
  const [issues, setIssues] = useState<Record<string, string>>({});
  const [banner, setBanner] = useState<Banner>(null);
  const [editSlug, setEditSlug] = useState(false);
  const [pending, start] = useTransition();
  const slug = watch('slug');
  const status = watch('status');
  const isNew = !productId;

  // warn before leaving with unsaved edits
  useEffect(() => {
    if (!formState.isDirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [formState.isDirty]);

  const serverError = () =>
    setBanner({ tone: 'error', text: 'Không lưu được do lỗi máy chủ. Những gì bạn gõ vẫn còn, thử lưu lại.' });

  const handleResult = (res: SaveResult | undefined, after: () => void) => {
    if (!res) return serverError();
    if ('ok' in res) {
      setIssues({});
      after();
      return;
    }
    if (res.error === 'invalid' && 'issues' in res) {
      setIssues(res.issues);
      setBanner({ tone: 'error', text: 'Có ô chưa đúng, xem các chỗ báo đỏ.' });
    } else if ('message' in res) {
      setBanner({ tone: 'error', text: res.message, login: res.error === 'auth' });
    }
  };

  const onSave = handleSubmit((state) => {
    const parsed = fromFormState(state);
    if ('issues' in parsed) {
      setIssues(parsed.issues);
      setBanner({ tone: 'error', text: 'Có ô chưa đúng, xem các chỗ báo đỏ.' });
      return;
    }
    start(async () => {
      setBanner(null);
      let res: SaveResult | undefined;
      try {
        res = await saveProduct({ id: productId, expectedUpdatedAt: version, values: parsed.values });
      } catch {
        return serverError();
      }
      handleResult(res, () => {
        if (!res || !('ok' in res)) return;
        setVersion(res.version);
        // new variants now have ids; without them the next save would delete and re-create them
        reset(withVariantIds({ ...state, slug: res.slug, status: isNew ? 'draft' : state.status }, res.variantIds));
        setEditSlug(false);
        if (isNew) {
          router.replace(`/admin/products/${res.id}?created=1`);
        } else {
          setBanner({ tone: 'ok', text: 'Đã lưu. Site đã cập nhật.' });
          router.refresh();
        }
      });
    });
  });

  const onArchive = () => {
    if (!productId || !version) return;
    if (!window.confirm('Ẩn sản phẩm khỏi site và chuyển vào Lưu trữ?')) return;
    start(async () => {
      let res: SaveResult | undefined;
      try {
        res = await setStatus(productId, 'archived', version);
      } catch {
        return serverError();
      }
      handleResult(res, () => {
        if (!res || !('ok' in res)) return;
        setVersion(res.version);
        // only the status is saved; any other unsaved edits stay marked as unsaved
        resetField('status', { defaultValue: 'archived' });
        setBanner({ tone: 'ok', text: 'Đã chuyển vào Lưu trữ. Đổi trạng thái để khôi phục.' });
      });
    });
  };

  const err = (key: string) => (issues[key] ? <span className="mt-1 block text-xs text-seal">{issues[key]}</span> : null);
  const loginHref = `/admin/login?next=${encodeURIComponent(productId ? `/admin/products/${productId}` : '/admin/products/new')}`;

  return (
    <form onSubmit={onSave} className="space-y-8 pb-28" noValidate>
      {banner && (
        <div
          role={banner.tone === 'error' ? 'alert' : 'status'}
          className={`sticky top-12 z-20 border px-4 py-3 text-sm ${
            banner.tone === 'error' ? 'border-seal/40 bg-[#f8e9e5] text-seal' : 'border-[#5f7d3a]/40 bg-[#eef2e4] text-[#3f5a22]'
          }`}
        >
          {banner.text}
          {banner.login && (
            <a href={loginHref} target="_blank" rel="noreferrer" className="ml-2 underline">
              Đăng nhập lại (tab mới), rồi bấm Lưu
            </a>
          )}
        </div>
      )}

      <section className="space-y-4">
        <h2 className={sectionTitle}>Thông tin</h2>
        <label className={label}>
          Tên sản phẩm *
          <input {...register('name_vi')} aria-invalid={!!issues.name_vi} className={`${field} mt-1`} />
          {err('name_vi')}
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={label}>
            Loại
            <input {...register('product_type')} list="admin-types" placeholder="Chọn hoặc gõ loại mới" className={`${field} mt-1`} />
            <datalist id="admin-types">
              {types.map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </label>
          <label className={label}>
            Trạng thái
            <select {...register('status')} disabled={isNew} className={`${field} mt-1`}>
              {(['published', 'draft', 'archived'] as const).map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
                </option>
              ))}
            </select>
            {isNew && <span className="mt-1 block text-xs">Sản phẩm mới luôn ở trạng thái Ẩn. Thêm ảnh và giá rồi chuyển sang Đang bán.</span>}
          </label>
        </div>
        <label className="flex h-11 items-center gap-2 text-sm">
          <input type="checkbox" {...register('featured')} className="h-5 w-5 accent-ink" />
          Nổi bật (hiện ở trang chủ)
        </label>
        <label className={label}>
          Mô tả ngắn
          <textarea {...register('excerpt_vi')} rows={3} className={`${field} mt-1 h-auto py-2`} />
        </label>
      </section>

      {!isNew && (
        <section className={`${section} space-y-2`}>
          <h2 className={sectionTitle}>Đường dẫn</h2>
          {editSlug ? (
            <label className={label}>
              Đường dẫn mới (chữ không dấu, gạch nối)
              <input {...register('slug')} className={`${field} mt-1 font-mono`} autoFocus />
              <span className="mt-1 block text-xs">Đường dẫn cũ sẽ tự chuyển sang đường dẫn mới.</span>
            </label>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <code className="break-all text-sm">/products/{slug}</code>
              <button type="button" onClick={() => setEditSlug(true)} className={ghostButton}>
                Đổi đường dẫn
              </button>
            </div>
          )}
        </section>
      )}

      <section className={`${section} space-y-3`}>
        <h2 className={sectionTitle}>Ảnh</h2>
        {isNew ? (
          <p className="text-sm text-ink-2">Lưu sản phẩm trước khi thêm ảnh.</p>
        ) : (
          <ImageManager
            productId={productId!}
            images={images}
            order={watch('image_order')}
            onOrderChange={(ids) => setValue('image_order', ids, { shouldDirty: true })}
          />
        )}
      </section>

      <section className={`${section} space-y-3`}>
        <h2 className={sectionTitle}>Phiên bản</h2>
        <VariantsEditor control={control} register={register} issues={issues} />
      </section>

      <section className={`${section} space-y-3`}>
        <h2 className={sectionTitle}>Thông số</h2>
        <SpecsEditor control={control} register={register} issues={issues} />
      </section>

      <section className={`${section} space-y-3`}>
        <h2 className={sectionTitle}>Mô tả chi tiết</h2>
        <Controller control={control} name="description_vi" render={({ field: f }) => <RichText value={f.value} onChange={f.onChange} />} />
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/15 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-3 py-2 sm:px-4">
          <button type="submit" disabled={pending} className="h-12 flex-1 bg-ink text-sm font-medium text-paper disabled:opacity-50 sm:flex-none sm:px-10">
            {pending ? 'Đang lưu…' : isNew ? 'Tạo sản phẩm' : 'Lưu'}
          </button>
          {!isNew && status === 'published' && !formState.isDirty && (
            <Link href={`/products/${slug}`} target="_blank" className={`${ghostButton} h-12`}>
              Xem trên site
            </Link>
          )}
          {!isNew && status !== 'archived' && (
            <button type="button" onClick={onArchive} disabled={pending} className="ml-auto h-12 px-3 text-sm text-ink-2 hover:text-seal">
              Lưu trữ
            </button>
          )}
          {formState.isDirty && <span className="hidden text-xs text-ink-2 sm:inline">Có thay đổi chưa lưu</span>}
        </div>
      </div>
    </form>
  );
}
