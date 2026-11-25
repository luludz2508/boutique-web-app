import Link from 'next/link';
import { ContactCta } from '@/components/ContactCta';
import { PageHeader, PaperFrame, Reveal } from '@/components/ink';
import { ProductPhoto } from '@/components/products/product-photo';
import { getAllProducts } from '@/lib/db/products';
import { toCategories } from '@/lib/display';

export const revalidate = 600;

export const metadata = {
  title: 'Bộ sưu tập | Trầm Hương Sơn Hồng',
  description: 'Các dòng sản phẩm trầm hương của Sơn Hồng: vòng tay, nhang, thác khói, phụ kiện xông trầm và tác phẩm điêu khắc.',
};

export default async function CollectionPage() {
  const products = await getAllProducts();
  const categories = toCategories(products.map((p) => p.product_type));

  // one cover photo per category: its newest product that has a picture
  const cover = (type: string) => {
    const p = products.find((x) => x.product_type === type && x.images?.length);
    return p?.images?.find((i) => i.is_primary)?.url ?? p?.images?.[0]?.url;
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-32 text-ink md:px-[6vw] md:pt-40">
      <PageHeader eyebrow="Bộ sưu tập" title="Các dòng trầm của Sơn Hồng">
        Từ chuỗi vòng đeo hằng ngày đến tác phẩm điêu khắc trưng bày, mỗi dòng đều chọn từ trầm tự nhiên Việt Nam.
      </PageHeader>

      <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-8 lg:grid-cols-3">
        {categories.map((c, i) => (
          <Reveal key={c.value} delayMs={(i % 3) * 80} className="h-full">
            <Link href={`/products?type=${encodeURIComponent(c.value)}`} className="group flex h-full flex-col">
              <PaperFrame hoverLift>
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-2">
                  <ProductPhoto
                    src={cover(c.value)}
                    alt=""
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="scale-[1.12] object-cover transition-transform [transition-duration:1200ms] group-hover:scale-[1.17] motion-reduce:transition-none"
                  />
                </div>
              </PaperFrame>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h2 className="font-display text-2xl font-light leading-tight sm:text-3xl">
                  {c.value === 'Khác' ? 'Tác phẩm & quà tặng' : c.label}
                </h2>
                <span className="whitespace-nowrap text-xs tracking-wide text-ink-2">{c.count} sản phẩm</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <ContactCta title="Cần một món quà riêng?">
        Gia đình Sơn Hồng nhận chế tác theo yêu cầu và tư vấn chọn trầm theo dịp tặng.
      </ContactCta>
    </div>
  );
}
