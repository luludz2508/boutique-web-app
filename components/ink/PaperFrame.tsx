import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * A photo (or any media) on a sheet of dó paper with deckled edges.
 * The deckle filter is applied to the paper behind the content only; the content
 * gets a mask with a barely uneven edge, so photos stay pixel-sharp.
 * Needs <InkDefs /> rendered once on the page (root layout does this).
 */
export function PaperFrame({
  children,
  hoverLift = false,
  className,
  photoClassName,
}: {
  children: ReactNode;
  /** lift + tilt + gold rough border on hover (also when a parent has `group` and is hovered) */
  hoverLift?: boolean;
  className?: string;
  photoClassName?: string;
}) {
  return (
    <div className={cn('ink-paper', hoverLift && 'ink-paper-hover', className)}>
      <div className={cn('ink-paper-photo', photoClassName)}>{children}</div>
    </div>
  );
}
