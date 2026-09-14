'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const GLYPHS = '&$#@%*+=<>/\\[]{}0123456789ABCDEF';
const RADIUS = 56;
const TICK_MS = 55;
const SWEEP_MS = 1200;
const SWEEP_EVERY_MS = 9000;

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** `pointer` follows the cursor and sweeps on a timer; `in-view` sweeps once. */
  mode?: 'pointer' | 'in-view';
}

export function ScrambleText({ text, className, mode = 'pointer' }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const centers = useRef<number[]>([]);
  const hovering = useRef(false);
  const [rendered, setRendered] = useState(text);
  const [minWidth, setMinWidth] = useState<number>();

  useEffect(() => setRendered(text), [text]);

  const scrambleAt = useCallback(
    (x: number) => {
      setRendered(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return char;
            const center = centers.current[index];
            if (center === undefined || Math.abs(center - x) > RADIUS) return char;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? char;
          })
          .join(''),
      );
    },
    [text],
  );

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    const measure = () => {
      const node = host.firstChild;
      if (!node || node.nodeType !== Node.TEXT_NODE) return;
      if ((node.textContent ?? '') !== text) return;

      const box = host.getBoundingClientRect();
      const range = document.createRange();
      const next: number[] = [];

      for (let index = 0; index < text.length; index += 1) {
        range.setStart(node, index);
        range.setEnd(node, index + 1);
        const rect = range.getBoundingClientRect();
        next[index] = rect.left - box.left + rect.width / 2;
      }

      centers.current = next;
      setMinWidth(box.width);
    };

    measure();
    void document.fonts?.ready.then(measure);

    let frame = 0;
    const remeasure = () => {
      setMinWidth(undefined);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(host);
    window.addEventListener('resize', remeasure);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', remeasure);
    };
  }, [text]);

  const sweep = useCallback(() => {
    const host = ref.current;
    if (!host) return;

    const start = performance.now();
    const from = -RADIUS;
    const to = host.getBoundingClientRect().width + RADIUS;
    let lastTick = 0;
    let frame = 0;

    const step = (now: number) => {
      const progress = Math.min((now - start) / SWEEP_MS, 1);
      if (hovering.current) {
        setRendered(text);
        return;
      }
      if (now - lastTick >= TICK_MS) {
        lastTick = now;
        scrambleAt(from + (to - from) * progress);
      }
      if (progress < 1) {
        frame = requestAnimationFrame(step);
        return;
      }
      setRendered(text);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [scrambleAt, text]);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (mode !== 'pointer') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let timer: ReturnType<typeof setInterval> | null = null;
    let x = 0;

    const onMove = (event: PointerEvent) => {
      hovering.current = true;
      x = event.clientX - host.getBoundingClientRect().left;
      if (timer) return;
      timer = setInterval(() => scrambleAt(x), TICK_MS);
      scrambleAt(x);
    };

    const onLeave = () => {
      hovering.current = false;
      if (timer) clearInterval(timer);
      timer = null;
      setRendered(text);
    };

    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    return () => {
      if (timer) clearInterval(timer);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [mode, scrambleAt, text]);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (mode === 'in-view') {
      let done = false;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (done || !entry?.isIntersecting) return;
          done = true;
          observer.disconnect();
          sweep();
        },
        { threshold: 0.6 },
      );
      observer.observe(host);
      return () => observer.disconnect();
    }

    let onScreen = true;
    let stopSweep: (() => void) | undefined;
    let sweepTimer: ReturnType<typeof setTimeout> | null = null;

    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    visibility.observe(host);

    const schedule = () => {
      sweepTimer = setTimeout(() => {
        if (onScreen && !hovering.current && !document.hidden) stopSweep = sweep();
        schedule();
      }, SWEEP_EVERY_MS);
    };

    schedule();

    return () => {
      visibility.disconnect();
      stopSweep?.();
      if (sweepTimer) clearTimeout(sweepTimer);
    };
  }, [mode, sweep]);

  return (
    <span
      ref={ref}
      className={className}
      style={minWidth ? { display: 'inline-block', minWidth } : undefined}
      aria-label={text}
    >
      {rendered}
    </span>
  );
}
