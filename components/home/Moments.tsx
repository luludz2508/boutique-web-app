import Image from 'next/image';
import { PaperFrame, Reveal } from '@/components/ink';
import { SectionHeading } from './SectionHeading';

// Real photos already in the project. Captions are neutral descriptions — no invented quotes.
const MOMENTS = [
  { src: '/tramhuong-sonhong/customers-1.jpg', caption: 'Khách tại showroom' },
  { src: '/tramhuong-sonhong/gallery-1.jpg', caption: 'Vòng trầm' },
  { src: '/tramhuong-sonhong/customer-3.jpg', caption: 'Khách tại showroom' },
  { src: '/tramhuong-sonhong/caexpo-1.jpg', caption: 'Hội chợ CAEXPO' },
  { src: '/tramhuong-sonhong/gallery-3.jpg', caption: 'Tượng trầm' },
  { src: '/tramhuong-sonhong/customers-2.jpg', caption: 'Khách tại showroom' },
  { src: '/tramhuong-sonhong/gallery-2.jpg', caption: 'Vòng trầm' },
  { src: '/tramhuong-sonhong/customer-4.jpg', caption: 'Khách tại showroom' },
];

export function Moments() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-[7vw]">
        <Reveal>
          <SectionHeading eyebrow="Khoảnh khắc">Cùng khách thương trầm</SectionHeading>
        </Reveal>
      </div>
      <div
        className="ink-moments flex gap-6 overflow-x-auto scroll-px-5 px-5 pb-6 pt-5 md:gap-8 md:scroll-px-[7vw] md:px-[7vw]"
        tabIndex={0}
        aria-label="Ảnh khoảnh khắc Sơn Hồng, cuộn ngang để xem thêm"
      >
        {MOMENTS.map((m, i) => (
          <figure key={`${m.src}-${i}`} className="group w-[68vw] flex-none sm:w-[38vw] lg:w-[24vw]">
            <PaperFrame hoverLift>
              <div className="relative aspect-[4/5] w-full bg-paper-2">
                <Image src={m.src} alt={m.caption} fill sizes="(max-width: 640px) 68vw, (max-width: 1024px) 38vw, 24vw" className="object-cover" />
              </div>
            </PaperFrame>
            <figcaption className="mt-3 font-display text-lg text-ink-2">{m.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
