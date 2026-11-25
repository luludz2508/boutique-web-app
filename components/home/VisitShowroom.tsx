import { MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import { Reveal } from '@/components/ink';
import content from '@/config/content';

export function VisitShowroom() {
  const a = content.vi.atelier;
  const tel = a.contactNumber?.replace(/\s/g, '');
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.mainAtelierAddress ?? '')}`;

  return (
    <section className="relative overflow-hidden px-5 pb-28 pt-8 text-center md:pb-36">
      <Reveal className="mx-auto max-w-2xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ink/calligraphy-son-hong.webp"
          alt="Sơn Hồng"
          width={360}
          height={681}
          loading="lazy"
          className="mx-auto mb-10 w-36 sm:w-44"
        />
        <p className="mb-4 text-[11px] uppercase tracking-[.32em] text-[#8a6a24]">Ghé showroom</p>
        <h2 className="font-display text-[clamp(36px,4.4vw,56px)] font-light leading-[1.1] text-ink [text-wrap:balance]">
          Thưởng trầm cùng gia đình Sơn Hồng
        </h2>
        {a.mainAtelierAddress && (
          <p className="mx-auto mt-6 flex max-w-md items-start justify-center gap-2 text-ink-2">
            <MapPin className="mt-1 h-4 w-4 flex-none text-gold" />
            {a.mainAtelierAddress}
          </p>
        )}
        {a.visitingHours?.length ? <p className="mt-2 text-sm text-ink-2">{a.visitingHours.slice(0, 2).join(' · ')}</p> : null}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {a.zaloUrl && (
            <a
              href={a.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ink-bloom-dark inline-flex items-center gap-2 whitespace-nowrap bg-ink px-6 py-4 text-xs font-medium uppercase tracking-[.18em] text-paper"
            >
              <MessageCircle className="h-4 w-4" />
              Nhắn Zalo
            </a>
          )}
          {tel && (
            <a
              href={`tel:${tel}`}
              className="ink-bloom inline-flex items-center gap-2 whitespace-nowrap border border-ink/50 px-6 py-4 text-xs font-medium uppercase tracking-[.18em] text-ink"
            >
              <Phone className="h-4 w-4" />
              Gọi điện
            </a>
          )}
          <a
            href={maps}
            target="_blank"
            rel="noopener noreferrer"
            className="ink-bloom inline-flex items-center gap-2 whitespace-nowrap border border-ink/50 px-6 py-4 text-xs font-medium uppercase tracking-[.18em] text-ink"
          >
            <Navigation className="h-4 w-4" />
            Chỉ đường
          </a>
        </div>
      </Reveal>
    </section>
  );
}
