import { ContactCta } from '@/components/ContactCta';
import { PageHeader, Reveal } from '@/components/ink';
import content from '@/config/content';
import { toSentenceCase } from '@/lib/display';

export const metadata = {
  title: 'Dịch vụ | Trầm Hương Sơn Hồng',
  description: 'Tư vấn, chế tác trầm hương theo yêu cầu và phục hồi tác phẩm tại Trầm Hương Sơn Hồng.',
};

export default function ServicesPage() {
  const s = content.vi.services;

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-32 text-ink md:px-[6vw] md:pt-40">
      <PageHeader eyebrow="Dịch vụ" title="Từ một khúc trầm đến tác phẩm của riêng bạn">
        {s.description}
      </PageHeader>

      {/* prices and packages are left out on purpose until the family confirms real figures */}
      <ol className="border-t border-ink/10">
        {s.services?.map((service, i) => (
          <li key={service.title} className="border-b border-ink/10">
            <Reveal className="grid gap-6 py-12 md:grid-cols-[6rem_minmax(0,1fr)_minmax(0,1fr)] md:gap-10 md:py-16">
              <span className="font-display text-5xl font-light text-gold">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h2 className="font-display text-3xl font-light leading-tight md:text-4xl">{toSentenceCase(service.title)}</h2>
                <p className="mt-4 max-w-md leading-relaxed text-ink-2">{service.description}</p>
              </div>
              <div>
                <p className="mb-4 text-[11px] uppercase tracking-[.32em] text-[#8a6a24]">Các bước</p>
                <ul className="space-y-3">
                  {service.process.map((step) => (
                    <li key={step} className="flex gap-3 text-[15px] text-ink">
                      <span className="mt-[.65em] h-px w-4 flex-none bg-gold" aria-hidden />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <ContactCta title="Kể cho chúng tôi nghe điều bạn muốn">
        Mỗi yêu cầu được tư vấn riêng: chất trầm, kích thước, thời gian và chi phí. Nhắn Zalo kèm hình ảnh tham khảo nếu có.
      </ContactCta>
    </div>
  );
}
