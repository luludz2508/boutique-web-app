import Link from 'next/link';
import { Clock, Globe, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { MapComponent } from '@/components/MapComponent';
import { DrumFace, Seal } from '@/components/ink';
import content from '@/config/content';

const EXPLORE = [
  { href: '/products', label: 'Sản phẩm' },
  { href: '/collection', label: 'Bộ sưu tập' },
  { href: '/gallery', label: 'Hình ảnh' },
  { href: '/atelier', label: 'Xưởng & showroom' },
  { href: '/services', label: 'Dịch vụ' },
];

export function Footer() {
  const a = content.vi.atelier;
  const tel = a.contactNumber?.replace(/\s/g, '');

  return (
    <footer id="contact" className="relative overflow-hidden bg-ink text-[#d9d2c3]">
      <DrumFace className="pointer-events-none absolute -right-36 -top-36 w-[440px] opacity-[.16] sm:-right-32 sm:-top-32 sm:w-[600px]" />

      <div className="relative mx-auto max-w-[1440px] px-5 pb-10 pt-20 md:px-[7vw]">
        <div className="flex items-center gap-4">
          <Seal size="lg" className="!w-20" />
          <p className="font-display text-3xl font-light text-paper">Trầm Hương Sơn Hồng</p>
        </div>

        <div className="mt-14 grid gap-12 md:grid-cols-[1.2fr_.8fr_1.4fr]">
          <div>
            <h2 className="mb-6 text-[11px] uppercase tracking-[.32em] text-gold-2">Liên hệ</h2>
            <ul className="space-y-5 text-sm leading-relaxed">
              {a.mainAtelierAddress && (
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 flex-none text-gold-2" />
                  <span>{a.mainAtelierAddress}</span>
                </li>
              )}
              {a.visitingHours?.length ? (
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 flex-none text-gold-2" />
                  <span>
                    {a.visitingHours.map((h) => (
                      <span key={h} className="block">
                        {h}
                      </span>
                    ))}
                  </span>
                </li>
              ) : null}
              {a.contactNumber && (
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 flex-none text-gold-2" />
                  <a href={`tel:${tel}`} className="hover:text-paper">
                    {a.contactNumber}
                  </a>
                </li>
              )}
              {a.emailAddress && (
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 flex-none text-gold-2" />
                  <a href={`mailto:${a.emailAddress}`} className="break-all hover:text-paper">
                    {a.emailAddress}
                  </a>
                </li>
              )}
              {a.instagramHandle && (
                <li className="flex gap-3">
                  <Instagram className="mt-0.5 h-4 w-4 flex-none text-gold-2" />
                  <a
                    href={`https://instagram.com/${a.instagramHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-paper"
                  >
                    @{a.instagramHandle}
                  </a>
                </li>
              )}
              {a.websiteUrl && (
                <li className="flex gap-3">
                  <Globe className="mt-0.5 h-4 w-4 flex-none text-gold-2" />
                  <a href={`https://${a.websiteUrl}`} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                    {a.websiteUrl}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-[11px] uppercase tracking-[.32em] text-gold-2">Khám phá</h2>
            <ul className="space-y-3 text-sm">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-[11px] uppercase tracking-[.32em] text-gold-2">{a.mapTitle || 'Bản đồ showroom'}</h2>
            <div className="aspect-[4/3] overflow-hidden border border-white/10">
              <MapComponent address={a.mainAtelierAddress ?? ''} title="Trầm Hương Sơn Hồng – Showroom" className="h-full" />
            </div>
          </div>
        </div>

        <div className="mt-16 space-y-1.5 border-t border-white/10 pt-6 text-center text-xs leading-relaxed text-[#d9d2c3]/60">
          {a.businessRegistration && <p>{a.businessRegistration}</p>}
          {a.headOfficeAddress && <p>Trụ sở: {a.headOfficeAddress}</p>}
          <p className="pt-2">© {new Date().getFullYear()} Trầm Hương Sơn Hồng.</p>
        </div>
      </div>
    </footer>
  );
}
