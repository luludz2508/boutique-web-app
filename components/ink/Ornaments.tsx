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

const RAYS = Array.from({ length: 14 }, (_, i) => i * (360 / 14));
const WAVES = Array.from({ length: 8 }, (_, i) => i * 45);

/** Simplified Đông Sơn bronze-drum face. Only use large and very faint (e.g. footer background). */
export function DrumFace({ className, color = '#B8913A' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={cn('block', className)}>
      <g fill="none" stroke={color} strokeWidth="1.2">
        {[96, 86, 64, 58, 34, 28].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} />
        ))}
        <path d="M100 4v10M100 186v10M4 100h10M186 100h10" />
        {WAVES.map((deg) => (
          <path key={deg} d="M100 14q6 6 0 12q-6 6 0 12" transform={`rotate(${deg} 100 100)`} />
        ))}
      </g>
      <g fill={color}>
        {RAYS.map((deg) => (
          <path key={deg} d="M100 72L104 92L100 100L96 92Z" transform={`rotate(${deg} 100 100)`} />
        ))}
        {[0, 90, 180, 270].map((deg) => (
          <circle key={deg} cx="100" cy="61" r="1.6" transform={`rotate(${deg} 100 100)`} />
        ))}
      </g>
    </svg>
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
    </svg>
  );
}
