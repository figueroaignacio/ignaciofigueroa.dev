'use client';

import { useEffect, useRef, useState } from 'react';

const DURATION = 900;

export function useCountUp<T extends Element>(target: number) {
  const ref = useRef<T>(null);
  const done = useRef(false);
  const [value, setValue] = useState(target);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (done.current) {
      setValue(target);
      return;
    }
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still || document.documentElement.hasAttribute('data-desk')) {
      setValue(target);
      return;
    }

    let frame = 0;
    setValue(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        done.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / DURATION);
          setValue(Math.round(target * (1 - (1 - progress) ** 3)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return [ref, value] as const;
}
