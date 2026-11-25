import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

/** Top of every inner page: gold eyebrow, serif title, optional intro. Leaves room for the fixed navbar. */
export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <header className="mb-14 md:mb-20">
      <Reveal>
        <p className="mb-3.5 flex items-center gap-3 text-[11px] uppercase tracking-[.32em] text-[#8a6a24]">
          <span className="h-px w-8 bg-gold" />
          {eyebrow}
        </p>
        <h1 className="max-w-4xl font-display text-[clamp(40px,5vw,64px)] font-light leading-[1.08] text-ink [text-wrap:balance]">
          {title}
        </h1>
        {children && <div className="mt-6 max-w-2xl leading-relaxed text-ink-2">{children}</div>}
      </Reveal>
    </header>
  );
}
