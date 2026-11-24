import { cn } from '@/lib/utils';

type InkArtProps = {
  src: string;
  alt?: string;
  /** soften the edges so the artwork melts into the paper */
  feather?: 'radial' | 'x' | 'none';
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Ink artwork painted on white, multiplied into the paper background.
 * Note: if a parent has transform / will-change / z-index / filter, it becomes an
 * isolated group and multiply can't see the paper — put `ink-art` on that parent instead.
 */
export function InkArt({ src, alt = '', feather = 'none', className, style }: InkArtProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      loading="lazy"
      decoding="async"
      className={cn(
        'ink-art',
        feather === 'radial' && 'ink-feather-radial',
        feather === 'x' && 'ink-feather-x',
        className,
      )}
      style={style}
    />
  );
}
