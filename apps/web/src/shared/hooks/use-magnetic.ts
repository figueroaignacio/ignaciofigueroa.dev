'use client';

import { useEffect, type RefObject } from 'react';

const RADIUS = 78;
const PULL = 0.32;
const MAX = 5;

export function useMagnetic(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const apply = () => {
      frame = 0;
      const targets = host.querySelectorAll<HTMLElement>('[data-magnet]');

      targets.forEach((target) => {
        if (!pointer) {
          target.style.setProperty('--magnet-x', '0px');
          target.style.setProperty('--magnet-y', '0px');
          return;
        }

        const box = target.getBoundingClientRect();
        const dx = pointer.x - (box.left + box.width / 2);
        const dy = pointer.y - (box.top + box.height / 2);
        const distance = Math.hypot(dx, dy);
        const strength = distance > RADIUS ? 0 : 1 - distance / RADIUS;

        target.style.setProperty(
          '--magnet-x',
          `${Math.max(-MAX, Math.min(MAX, dx * PULL * strength)).toFixed(2)}px`,
        );
        target.style.setProperty(
          '--magnet-y',
          `${Math.max(-MAX, Math.min(MAX, dy * PULL * strength)).toFixed(2)}px`,
        );
      });
    };

    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      pointer = null;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [ref]);
}
