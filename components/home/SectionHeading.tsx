/** Gold eyebrow + serif heading, used by every home section. */
export function SectionHeading({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3.5 flex items-center gap-3 text-[11px] uppercase tracking-[.32em] text-[#8a6a24]">
        <span className="h-px w-8 bg-gold" />
        {eyebrow}
      </p>
      <h2 className="font-display text-[clamp(36px,4.4vw,56px)] font-light mb-10 leading-[1.1] text-ink">{children}</h2>
    </div>
  );
}
