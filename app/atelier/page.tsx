import Image from 'next/image';
import { Clock, Instagram, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import { MapComponent } from '@/components/MapComponent';
import { ContactCta } from '@/components/ContactCta';
import { PageHeader, PaperFrame, Reveal } from '@/components/ink';
import content from '@/config/content';

export const metadata = {
  title: 'Xưởng & showroom | Trầm Hương Sơn Hồng',
  description: 'Showroom Trầm Hương Sơn Hồng tại Đà Nẵng: địa chỉ, giờ mở cửa và cách liên hệ.',
};

export default function AtelierPage() {
  const a = content.vi.atelier;
  const address = a.mainAtelierAddress ?? '';
  const tel = a.contactNumber?.replace(/\s/g, '');
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  const rows = [
    { icon: MapPin, label: 'Địa chỉ', value: <span>{address}</span> },
    a.visitingHours?.length
      ? {
          icon: Clock,
          label: 'Giờ mở cửa',
          value: (
            <span>
              {a.visitingHours.map((h) => (
                <span key={h} className="block">
                  {h}
                </span>
              ))}
            </span>
          ),
        }
      : null,
    tel
      ? {
          icon: Phone,
          label: 'Điện thoại',
          value: (
            <a href={`tel:${tel}`} className="hover:text-[#8a6a24]">
              {a.contactNumber}
            </a>
          ),
        }
      : null,
    a.emailAddress
      ? {
          icon: Mail,
          label: 'Email',
          value: (
            <a href={`mailto:${a.emailAddress}`} className="[overflow-wrap:anywhere] hover:text-[#8a6a24]">
              {a.emailAddress}
            </a>
          ),
        }
      : null,
    a.instagramHandle
      ? {
          icon: Instagram,
          label: 'Instagram',
          value: (
            <a href={`https://instagram.com/${a.instagramHandle}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#8a6a24]">
              @{a.instagramHandle}
            </a>
          ),
        }
      : null,
  ].filter(Boolean) as { icon: typeof MapPin; label: string; value: React.ReactNode }[];

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-32 text-ink md:px-[6vw] md:pt-40">
      <PageHeader eyebrow="Xưởng & showroom" title="Ghé thăm Sơn Hồng tại Đà Nẵng">
        {a.description}
      </PageHeader>

      <div className="grid gap-14 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <Reveal>
          <dl className="border-t border-ink/10">
            {rows.map(({ icon: Icon, label, value }) => (
              <div key={label} className="grid grid-cols-[1.5rem_6.5rem_minmax(0,1fr)] gap-3 border-b border-ink/10 py-5 text-[15px] sm:grid-cols-[1.5rem_8rem_minmax(0,1fr)]">
                <Icon className="mt-0.5 h-4 w-4 text-gold" aria-hidden />
                <dt className="text-ink-2">{label}</dt>
                <dd className="text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          {a.contactRecommendation && <p className="mt-6 text-sm leading-relaxed text-ink-2">{a.contactRecommendation}</p>}
          <a
            href={directions}
            target="_blank"
            rel="noopener noreferrer"
            className="ink-bloom mt-8 inline-flex items-center gap-2 border border-ink/50 px-7 py-4 text-xs font-medium uppercase tracking-[.18em] text-ink"
          >
            <Navigation className="h-4 w-4" />
            Chỉ đường
          </a>
        </Reveal>

        <Reveal delayMs={150}>
          <PaperFrame>
            <div className="aspect-[4/3] w-full">
              <MapComponent address={address} title="Trầm Hương Sơn Hồng – Showroom" className="h-full" />
            </div>
          </PaperFrame>
        </Reveal>
      </div>

      <section className="mt-24 md:mt-32">
        <Reveal>
          <p className="mb-3.5 flex items-center gap-3 text-[11px] uppercase tracking-[.32em] text-[#8a6a24]">
            <span className="h-px w-8 bg-gold" />
            Tại showroom
          </p>
          <h2 className="mb-10 font-display text-[clamp(32px,3.6vw,48px)] font-light leading-tight">Khách ghé thưởng trầm</h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
          {['/tramhuong-sonhong/customers-1.jpg', '/tramhuong-sonhong/customers-2.jpg'].map((src, i) => (
            <Reveal key={src} delayMs={i * 120}>
              <PaperFrame>
                <div className="relative aspect-[4/3] w-full bg-paper-2">
                  <Image src={src} alt="Khách tham quan showroom Sơn Hồng" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                </div>
              </PaperFrame>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCta title="Hẹn trước để được tiếp đón chu đáo">
        Nhắn Zalo hoặc gọi trước khi ghé, gia đình sẽ chuẩn bị trầm để quý khách thưởng hương và xem tận tay.
      </ContactCta>
    </div>
  );
}
