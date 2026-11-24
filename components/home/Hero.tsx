'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { BrushStroke, InkCursor } from '@/components/ink';

const LAYERS = [
  { src: '/ink/hero-mountains-far.webp', speed: 0.12, className: 'bottom-[3%] -left-[20%] -right-[40%] sm:left-[22%] sm:right-0 sm:bottom-[7%] ink-feather-x' },
  { src: '/ink/mist.webp', speed: 0.22, className: 'bottom-[4%] -left-[10%] -right-[10%] opacity-75 ink-hero-drift ink-feather-x' },
  { src: '/ink/hero-mountains-near.webp', speed: 0.38, className: 'bottom-0 -inset-x-[30%] sm:inset-x-0 sm:bottom-[-15%]' },
];

const WORDS: { text: string; delay: number; br?: boolean }[] = [
  { text: 'Hương', delay: 300 },
  { text: 'của', delay: 550, br: true },
  { text: 'núi', delay: 850 },
  { text: 'rừng', delay: 1100 },
];

export function Hero() {
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Parallax: one passive scroll listener, painted on the next frame. Off for reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const paint = () => {
      raf = 0;
      const y = window.scrollY;
      if (y > window.innerHeight * 1.2) return;
      layerRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `translate3d(0, ${y * LAYERS[i].speed}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className="relative h-[100svh] min-h-[620px] overflow-hidden">
      {LAYERS.map((layer, i) => (
        <div
          key={layer.src}
          ref={(el) => {
            layerRefs.current[i] = el;
          }}
          // the moving wrapper carries the blend, otherwise multiply can't see the paper
          className={`ink-art absolute will-change-transform ${layer.className}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={layer.src} alt="" className="block w-full" />
        </div>
      ))}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ink/agarwood-branch.webp"
        alt=""
        aria-hidden
        className="ink-art ink-hero-sway absolute -right-[3%] -top-[2%] z-[3] w-[46vw] max-w-[460px] sm:w-[34vw]"
        style={{ maskImage: 'linear-gradient(200deg,#000 55%,transparent 85%)', WebkitMaskImage: 'linear-gradient(200deg,#000 55%,transparent 85%)' }}
      />

      <InkCursor className="z-[5]" />

      <div className="absolute left-5 top-[22vh] z-[4] max-w-[560px] pr-5 sm:left-[7vw] sm:top-[26vh]">
        <p className="ink-hero-fade flex items-center gap-3 whitespace-nowrap text-[10px] uppercase tracking-[.22em] text-[#8a6a24] sm:gap-3.5 sm:text-[11px] sm:tracking-[.35em]">
          <span className="h-px w-9 bg-gold" />
          Trầm hương tự nhiên · Từ 1985
        </p>

        <h1 className="relative isolate mt-5 font-display text-[clamp(52px,8vw,108px)] font-light leading-[1.02] text-ink">
          {WORDS.map((w) => (
            <span key={w.text}>
              <span className="ink-word" style={{ animationDelay: `${w.delay}ms` }}>
                {w.text}
              </span>
              {w.br ? <br /> : ' '}
            </span>
          ))}
          {/* gold stroke under the baseline of the second line, behind the ink-black words */}
          <BrushStroke
            variant="gold"
            animate
            delayMs={1100}
            className="absolute -left-[0.08em] bottom-[-0.06em] -z-10 h-[0.32em] w-[4.3em]"
          />
        </h1>

        <p className="ink-hero-fade mt-7 max-w-[380px] leading-[1.8] text-ink-2" style={{ animationDelay: '1700ms' }}>
          Gia đình Sơn Hồng gìn giữ và chế tác trầm hương Việt Nam qua bốn thập kỷ.
        </p>

        <div className="ink-hero-fade mt-9 flex flex-wrap gap-4" style={{ animationDelay: '2100ms' }}>
          <Link
            href="/products"
            className="relative inline-flex items-center bg-ink px-7 py-4 text-xs font-medium uppercase tracking-[.18em] text-paper transition-colors hover:bg-black"
          >
            Xem sản phẩm
          </Link>
          <Link
            href="#story"
            className="ink-bloom inline-flex items-center border border-ink/50 px-7 py-4 text-xs font-medium uppercase tracking-[.18em] text-ink"
          >
            Câu chuyện
          </Link>
        </div>
      </div>
    </header>
  );
}
