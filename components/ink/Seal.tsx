import { cn } from '@/lib/utils';

type SealProps = {
  /** sm: 44px chop for the navbar and placeholders; lg: 120px by default, resize with className */
  size?: 'sm' | 'lg';
  /** play the "stamped down" animation */
  stamp?: boolean;
  delayMs?: number;
  className?: string;
};

/** The Sơn Hồng red seal (transparent artwork, no blend mode needed). */
export function Seal({ size = 'sm', stamp = false, delayMs = 0, className }: SealProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/ink/seal-son-hong.webp"
      alt="Ấn Sơn Hồng"
      width={size === 'lg' ? 120 : 44}
      height={size === 'lg' ? 120 : 44}
      className={cn(size === 'lg' ? 'ink-seal-lg' : 'ink-seal-sm', stamp && 'ink-stamp', className)}
      style={stamp ? { animationDelay: `${delayMs}ms` } : undefined}
    />
  );
}
