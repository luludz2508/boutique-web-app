import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProducts, getProductBySlug, getProductsByType } from '@/lib/db/products';
import { ProductImageGallery } from '@/components/products/product-image-gallery';
import { ProductCard } from '@/components/products/product-card';
import { VariantPicker } from '@/components/products/variant-picker';
import { BrushStroke, Reveal } from '@/components/ink';
import { toSentenceCase } from '@/lib/display';

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
        <span className="text-ink">{name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductImageGallery images={sortedImages} productName={name} />

        <div className="space-y-8">
          <div>
            {product.product_type && (
              <p className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[.32em] text-[#8a6a24]">
                <span className="h-px w-8 bg-gold" />
                {product.product_type}
              </p>
            )}
            <h1 className="font-display text-4xl font-light leading-tight md:text-5xl">{name}</h1>
            <BrushStroke variant="ink" className="mt-5 w-40 opacity-80" />
          </div>

          {product.excerpt_vi && <p className="leading-relaxed text-ink-2">{product.excerpt_vi}</p>}

          <VariantPicker variants={product.variants ?? []} productName={name} />
        </div>
      </div>

      {product.description_vi && (
        <section className="mx-auto mt-20 max-w-[68ch]">
          <h2 className="mb-6 font-display text-3xl font-light">Mô tả sản phẩm</h2>
          <div
            className="ink-prose text-ink-2"
            dangerouslySetInnerHTML={{ __html: product.description_vi }}
          />
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-3xl font-light">Có thể bạn cũng thích</h2>
          <BrushStroke variant="ink" className="mb-10 mt-4 w-40 opacity-80" />
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delayMs={i * 60}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
