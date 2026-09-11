'use client';

import { useEffect, useRef } from 'react';

export function SilkParallax() {
  const anchor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = anchor.current?.parentElement;
    if (!host) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let target = { x: 0, y: 0 };

    const paint = () => {
      frame = 0;
      host.style.setProperty('--silk-x', target.x.toFixed(3));
      host.style.setProperty('--silk-y', target.y.toFixed(3));
    };

    const move = (event: PointerEvent) => {
      const box = host.getBoundingClientRect();
      target = {
        x: ((event.clientX - box.left) / box.width - 0.5) * 2,
        y: ((event.clientY - box.top) / box.height - 0.5) * 2,
      };
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const leave = () => {
      target = { x: 0, y: 0 };
      if (!frame) frame = requestAnimationFrame(paint);
    };

    host.addEventListener('pointermove', move, { passive: true });
    host.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerleave', leave);
      host.style.removeProperty('--silk-x');
      host.style.removeProperty('--silk-y');
    };
  }, []);

  return <span ref={anchor} hidden />;
}
