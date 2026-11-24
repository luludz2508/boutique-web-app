import { cn } from '@/lib/utils';

type BrushStrokeProps = {
  variant: 'gold' | 'ink';
  /** sweep in from the left */
  animate?: boolean;
  delayMs?: number;
  className?: string;
};

/** A single brush stroke. Gold strokes belong under ink-coloured text only. */
export function BrushStroke({ variant, animate = false, delayMs = 0, className }: BrushStrokeProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={variant === 'gold' ? '/ink/brush-gold.webp' : '/ink/brush-ink.webp'}
      alt=""
      aria-hidden
      className={cn('ink-brush', animate && 'ink-brush-animate', className)}
      style={animate ? { animationDelay: `${delayMs}ms` } : undefined}
    />
  );
}
