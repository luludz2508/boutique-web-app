import { cn } from '@/lib/utils';

/** Hồi văn (key-fret) corner. Rotate/flip with className for the other corners. */
export function FretCorner({ className, color = '#E2C57C' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden className={cn('block', className)}>
      <path d="M1 11V1h10M4 11V4h4v3" fill="none" stroke={color} strokeWidth="1.2" />
    </svg>
  );
}

/** Repeating hồi văn strip, e.g. above and below the marquee. */
export function FretBand({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn('h-[9px] w-full opacity-80', className)}
      style={{
        background:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='18' height='9'%3E%3Cpath d='M0 8.5h4v-6h10v4h-6v-2' fill='none' stroke='%23b8913a' stroke-width='1'/%3E%3C/svg%3E\") repeat-x",
        transform: flip ? 'scaleY(-1)' : undefined,
      }}
    />
  );
}


/** Đông Sơn bronze-drum face (gold artwork on transparent). Use large and faint, e.g. the footer background. */
export function DrumFace({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/ink/drum-face.webp" alt="" aria-hidden width={600} height={598} loading="lazy" className={cn('block', className)} />
  );
}

/** Hidden SVG defs shared by every PaperFrame (the deckle filter). Render once in the root layout. */
export function InkDefs() {
  return (
    <svg width="0" height="0" aria-hidden style={{ position: 'absolute' }}>
      <filter id="ink-deckle" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="4" />
        <feDisplacementMap in="SourceGraphic" scale="4" />
      </filter>
      {/* finer fibres for small things like buttons; tall region so a 48px button's edge isn't clipped */}
      <filter id="ink-deckle-fine" x="-10%" y="-40%" width="120%" height="180%">
        <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="3" seed="7" />
        <feDisplacementMap in="SourceGraphic" scale="3.5" />
      </filter>
    </svg>
  );
}
