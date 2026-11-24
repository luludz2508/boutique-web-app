'use client';

import { useEffect, useRef } from 'react';

const LIFE_MS = 2600;
const MIN_GAP_MS = 30;

/**
 * Ink drops that bleed out under the mouse and fade (about 15% are gold).
 * Fills its positioned parent. Does nothing on touch screens or with reduced motion.
 */
export function InkCursor({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(pointer: fine)').matches
    )
      return;

    type Drop = { x: number; y: number; r: number; max: number; t: number; gold: boolean };
    let drops: Drop[] = [];
    let w = 0;
    let h = 0;
    let last = 0;
    let raf = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > w || y > h) return;
      const now = performance.now();
      if (now - last < MIN_GAP_MS) return;
      last = now;
      drops.push({ x, y, r: 2 + Math.random() * 4, max: 16 + Math.random() * 24, t: now, gold: Math.random() < 0.15 });
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      drops = drops.filter((d) => now - d.t < LIFE_MS);
      for (const d of drops) {
        const k = (now - d.t) / LIFE_MS;
        const radius = d.r + (d.max - d.r) * (1 - Math.pow(1 - k, 3));
        const alpha = (d.gold ? 0.3 : 0.13) * (1 - k);
        const rgb = d.gold ? '184,145,58' : '28,27,25';
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, radius);
        g.addColorStop(0, `rgba(${rgb},${alpha})`);
        g.addColorStop(0.6, `rgba(${rgb},${alpha * 0.5})`);
        g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      // stop the loop when idle so the page does no work at rest
      raf = drops.length ? requestAnimationFrame(draw) : 0;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
