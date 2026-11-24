import { cn } from '@/lib/utils';

type SealProps = {
  /** sm (< 100px): blank chop + text; lg: the full generated seal artwork */
  size?: 'sm' | 'lg';
  /** play the "stamped down" animation */
  stamp?: boolean;
  delayMs?: number;
  className?: string;
};

export function Seal({ size = 'sm', stamp = false, delayMs = 0, className }: SealProps) {
  const style = stamp ? { animationDelay: `${delayMs}ms` } : undefined;
  if (size === 'lg') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/ink/seal-full.webp"
        alt="Ấn Sơn Hồng"
        className={cn('ink-seal-lg', stamp && 'ink-stamp', className)}
        style={style}
      />
    );
  }
  return (
    <span
      role="img"
      aria-label="Ấn Sơn Hồng"
      className={cn('ink-seal-sm', stamp && 'ink-stamp', className)}
      style={style}
    >
      <span aria-hidden>
        SƠN
        <br />
        HỒNG
      </span>
    </span>
  );
}
