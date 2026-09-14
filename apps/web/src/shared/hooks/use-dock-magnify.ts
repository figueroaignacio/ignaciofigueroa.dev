'use client';

import { useEffect, type RefObject } from 'react';

const RADIUS = 92;
const MAX_GROWTH = 0.45;

export function useDockMagnify(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let frame = 0;
    let pointerX: number | null = null;

    const apply = () => {
      frame = 0;
      host.querySelectorAll<HTMLElement>('[data-magnet]').forEach((target) => {
        if (pointerX === null) {
          target.style.setProperty('--dock-scale', '1');
          return;
        }
        const box = target.getBoundingClientRect();
        const distance = Math.abs(pointerX - (box.left + box.width / 2));
        const falloff = Math.max(0, 1 - (distance / RADIUS) ** 2);
        target.style.setProperty('--dock-scale', (1 + MAX_GROWTH * falloff).toFixed(3));
      });
    };

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      pointerX = null;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    host.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [ref]);
}
