'use client';

import { useEffect } from 'react';

/**
 * Remembers where the pointer entered each `.ink-bloom` button (as --ink-x / --ink-y),
 * so its ink drop lands there. One delegated listener for the whole page; renders nothing.
 * Keyboard focus keeps the default centre.
 */
export function InkPointer() {
  useEffect(() => {
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.('.ink-bloom') as HTMLElement | null;
      // only on entry, not while moving between the button's own children
      if (!el || (e.relatedTarget instanceof Node && el.contains(e.relatedTarget))) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--ink-x', `${e.clientX - r.left}px`);
      el.style.setProperty('--ink-y', `${e.clientY - r.top}px`);
    };
    document.addEventListener('pointerover', onOver, { passive: true });
    return () => document.removeEventListener('pointerover', onOver);
  }, []);
  return null;
}
