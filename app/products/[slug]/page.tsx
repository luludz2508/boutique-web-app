import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { getAllProducts, getProductBySlug, getProductsByType, getRedirectForSlug } from '@/lib/db/products';
import { ProductImageGallery } from '@/components/products/product-image-gallery';
import { ProductCard } from '@/components/products/product-card';
import { VariantPicker } from '@/components/products/variant-picker';
import { Reveal } from '@/components/ink';
import { toSentenceCase } from '@/lib/display';
import { pickSpecs, splitProductName } from '@/lib/description';

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    // metadata resolves before the page streams, so a redirect here gets a real 308 status
    const moved = await getRedirectForSlug(slug);
    if (moved && moved !== slug) permanentRedirect(`/products/${moved}`);
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${toSentenceCase(product.name_vi)} | Trầm Hương Sơn Hồng`,
    description: product.seo_description_vi || product.excerpt_vi,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    // renamed in the admin: send old links to the new address
    const moved = await getRedirectForSlug(slug);
    if (moved && moved !== slug) permanentRedirect(`/products/${moved}`);
    notFound();
  }

  // Sort images by position, with primary image first
  const sortedImages = product.images
    ? [...product.images].sort((a, b) => {
        if (a.is_primary) return -1;
        if (b.is_primary) return 1;
        return (a.position || 0) - (b.position || 0);
      })
    : [];

  const name = toSentenceCase(product.name_vi);
  const { title, detail } = splitProductName(product.name_vi);
  const { specs, body } = pickSpecs(product.specs, product.description_vi);
  const type = product.product_type && product.product_type !== 'Khác' ? toSentenceCase(product.product_type) : null;
  const related = product.product_type
    ? (await getProductsByType(product.product_type)).filter((p) => p.id !== product.id).slice(0, 4)
    : [];

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-28 text-ink md:px-[6vw] md:pt-32">
      <nav aria-label="Breadcrumb" className="mb-8 text-xs text-ink-2">
        <Link href="/" className="hover:text-ink">
          Trang chủ
        </Link>
        <span className="mx-2 text-gold">/</span>
        <Link href="/products" className="hover:text-ink">
          Sản phẩm
        </Link>
        <span className="mx-2 text-gold">/</span>
        <span className="text-ink">{title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
        {/* photos stay in view while the long right column scrolls */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductImageGallery images={sortedImages} productName={name} />
        </div>

        <div>
          {type && (
            <p className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[.32em] text-[#8a6a24]">
              <span className="h-px w-8 bg-gold" />
              {type}
            </p>
          )}
          <h1 className="font-display text-4xl font-light leading-tight md:text-5xl">{title}</h1>
          {detail && <p className="mt-3 text-sm tracking-wide text-ink-2">{detail}</p>}

          {product.excerpt_vi && <p className="mt-6 leading-relaxed text-ink-2">{product.excerpt_vi}</p>}

          <div className="mt-8">
            <VariantPicker variants={product.variants ?? []} productName={name} />
          </div>

          {specs.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-4 text-[11px] uppercase tracking-[.32em] text-[#8a6a24]">Thông tin sản phẩm</h2>
              <dl className="border-t border-ink/10 text-sm">
                {specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-ink/10 py-3 sm:grid-cols-[11rem_1fr]">
                    <dt className="text-ink-2">{s.label}</dt>
                    <dd className="whitespace-pre-line text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {body && (
            <section className="mt-12">
              <h2 className="mb-4 text-[11px] uppercase tracking-[.32em] text-[#8a6a24]">Mô tả</h2>
              <div className="ink-prose ink-prose-sm text-ink-2" dangerouslySetInnerHTML={{ __html: body }} />
            </section>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24 border-t border-ink/10 pt-16">
          <h2 className="mb-10 font-display text-3xl font-light">Sản phẩm cùng loại</h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delayMs={i * 60} className="h-full">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
