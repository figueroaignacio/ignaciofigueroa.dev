'use client';

import { useEffect, type RefObject } from 'react';

/** How close the pointer has to get before the bot bothers looking at it. */
const REACH = 340;

/** Distance at which the eyes are already as far over as they go. */
const AIM = 90;

function aim(distance: number) {
  return Math.max(-1, Math.min(1, distance / AIM)).toFixed(2);
}

/**
 * The eyes follow the pointer while it is nearby, and go back to whatever they
 * were doing when it leaves.
 *
 * Direction is what matters, not distance, so the aim saturates well inside the
 * reach: a pointer a hundred pixels away is already "over there". The tracking
 * keeps running on its own frames rather than only on pointer events, because
 * the thing being looked at is not the only one that moves — the rail bot walks
 * out from under a perfectly still cursor.
 */
export function useGaze(ref: RefObject<SVGSVGElement | null>, enabled = true) {
  useEffect(() => {
    const node = ref.current;
    if (!enabled || !node) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let pointer: { x: number; y: number } | null = null;
    let frame = 0;

    const settle = () => {
      frame = 0;
      if (!pointer) return;

      const box = node.getBoundingClientRect();
      const dx = pointer.x - (box.left + box.width / 2);
      const dy = pointer.y - (box.top + box.height / 2);

      if (Math.hypot(dx, dy) > REACH) {
        delete node.dataset.gaze;
        return;
      }

      node.dataset.gaze = 'true';
      node.style.setProperty('--gaze-x', aim(dx));
      node.style.setProperty('--gaze-y', aim(dy));
      frame = requestAnimationFrame(settle);
    };

    const track = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(settle);
    };

    window.addEventListener('pointermove', track, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', track);
      delete node.dataset.gaze;
    };
  }, [enabled, ref]);
}
