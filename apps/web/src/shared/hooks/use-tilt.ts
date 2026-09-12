'use client';

import { useCallback, useRef } from 'react';

const MAX_DEG = 3;

export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const frame = useRef(0);

  const onPointerMove = useCallback((event: React.PointerEvent<T>) => {
    const node = ref.current;
    if (!node || event.pointerType !== 'mouse') return;
    const box = node.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width;
    const py = (event.clientY - box.top) / box.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      node.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      node.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
      node.style.setProperty('--rx', `${((py - 0.5) * -2 * MAX_DEG).toFixed(2)}deg`);
      node.style.setProperty('--ry', `${((px - 0.5) * 2 * MAX_DEG).toFixed(2)}deg`);
    });
  }, []);

  const onPointerLeave = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    cancelAnimationFrame(frame.current);
    node.style.setProperty('--rx', '0deg');
    node.style.setProperty('--ry', '0deg');
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
