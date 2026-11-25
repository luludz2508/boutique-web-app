import { MessageCircle, Phone } from 'lucide-react';
import { Reveal } from '@/components/ink';
import content from '@/config/content';

/** Closing block on inner pages: a line of copy and the two ways people actually reach the shop. */
export function ContactCta({ title, children }: { title: string; children?: React.ReactNode }) {
  const { contactNumber, zaloUrl } = content.vi.atelier;
  const tel = contactNumber?.replace(/\s/g, '');

  return (
    <section className="mt-24 border-t border-ink/10 pt-16 text-center md:mt-32">
      <Reveal>
        <h2 className="mx-auto max-w-2xl font-display text-[clamp(30px,3.6vw,44px)] font-light leading-tight text-ink [text-wrap:balance]">
          {title}
        </h2>
        {children && <p className="mx-auto mt-5 max-w-xl leading-relaxed text-ink-2">{children}</p>}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {zaloUrl && (
            <a
              href={zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ink-bloom-dark inline-flex items-center gap-2 bg-ink px-7 py-4 text-xs font-medium uppercase tracking-[.18em] text-paper"
            >
              <MessageCircle className="h-4 w-4" />
              Nhắn Zalo
            </a>
          )}
          {tel && (
            <a
              href={`tel:${tel}`}
              className="ink-bloom inline-flex items-center gap-2 border border-ink/50 px-7 py-4 text-xs font-medium uppercase tracking-[.18em] text-ink"
            >
              <Phone className="h-4 w-4" />
              {contactNumber}
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}
