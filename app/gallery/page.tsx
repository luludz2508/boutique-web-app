import Image from 'next/image';
import Link from 'next/link';
import { ContactCta } from '@/components/ContactCta';
import { PageHeader, PaperFrame, Reveal } from '@/components/ink';
import { ProductPhoto } from '@/components/products/product-photo';
import { getProductsByType } from '@/lib/db/products';
import { splitProductName } from '@/lib/description';

export const revalidate = 600;

export const metadata = {
  title: 'Hình ảnh | Trầm Hương Sơn Hồng',
  description: 'Tác phẩm trầm hương, khách ghé showroom và các triển lãm của Trầm Hương Sơn Hồng.',
};

const MOMENTS = [
  { src: '/tramhuong-sonhong/customers-1.jpg', alt: 'Khách tại showroom' },
  { src: '/tramhuong-sonhong/customers-2.jpg', alt: 'Khách thưởng trầm tại showroom' },
  { src: '/tramhuong-sonhong/customer-3.jpg', alt: 'Khách tại triển lãm' },
  { src: '/tramhuong-sonhong/customer-4.jpg', alt: 'Khách tại triển lãm' },
  { src: '/tramhuong-sonhong/caexpo-1.jpg', alt: 'Gian hàng Sơn Hồng tại triển lãm CAEXPO' },
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-3.5 flex items-center gap-3 text-[11px] uppercase tracking-[.32em] text-[#8a6a24]">
    <span className="h-px w-8 bg-gold" />
    {children}
  </p>
);

export default async function GalleryPage() {
  // carved pieces live under "Khác" in Haravan
  const works = (await getProductsByType('Khác')).filter((p) => p.images?.length).slice(0, 12);

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-32 text-ink md:px-[6vw] md:pt-40">
      <PageHeader eyebrow="Hình ảnh" title="Tác phẩm và những người thưởng trầm">
        Một vài tác phẩm điêu khắc của xưởng, cùng khoảnh khắc khách ghé showroom và các kỳ triển lãm.
      </PageHeader>

      {works.length > 0 && (
        <section>
          <Reveal>
            <Eyebrow>Tác phẩm</Eyebrow>
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
            {works.map((p, i) => {
              const img = p.images?.find((x) => x.is_primary) ?? p.images?.[0];
              return (
                <Reveal key={p.id} delayMs={(i % 4) * 60} className="h-full">
                  <Link href={`/products/${p.slug}`} className="group block">
                    <PaperFrame hoverLift>
                      <div className="relative aspect-square w-full overflow-hidden bg-paper-2">
                        <ProductPhoto src={img?.url} alt="" sizes="(max-width: 1024px) 50vw, 25vw" className="scale-[1.12] object-cover" />
                      </div>
                    </PaperFrame>
                    <p className="mt-3 line-clamp-1 text-sm text-ink-2 group-hover:text-ink">{splitProductName(p.name_vi).title}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      <section className="mt-24 md:mt-32">
        <Reveal>
          <Eyebrow>Khách & triển lãm</Eyebrow>
        </Reveal>
        {/* two large, then three small */}
        <div className="mt-6 grid gap-6 sm:grid-cols-6 md:gap-8">
          {MOMENTS.map((m, i) => (
            <Reveal key={m.src} delayMs={(i % 3) * 80} className={i < 2 ? 'sm:col-span-3' : 'sm:col-span-2'}>
              <PaperFrame>
                <div className="relative aspect-[4/3] w-full bg-paper-2">
                  <Image src={m.src} alt={m.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                </div>
              </PaperFrame>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCta title="Muốn xem tận tay?">Ghé showroom ở Đà Nẵng hoặc nhắn Zalo để xem thêm ảnh, video từng tác phẩm.</ContactCta>
    </div>
  );
}
