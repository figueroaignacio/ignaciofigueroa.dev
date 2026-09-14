'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

function toWords(value: string) {
  const words: Array<Array<{ char: string; index: number }>> = [];
  let current: Array<{ char: string; index: number }> = [];

  value.split('').forEach((char, index) => {
    if (char === ' ') {
      words.push(current);
      current = [];
      return;
    }
    current.push({ char, index });
  });
  words.push(current);
  return words;
}

export function ScrambleText({ text, className, mode = 'pointer' }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const centers = useRef<number[]>([]);
  const width = useRef(0);
  const hovering = useRef(false);
  const [rendered, setRendered] = useState(text);
  const [widths, setWidths] = useState<number[]>([]);

  const words = useMemo(() => toWords(rendered), [rendered]);

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
      const chars = Array.from(host.querySelectorAll<HTMLElement>('[data-index]'));
      const box = host.getBoundingClientRect();
      const nextCenters: number[] = [];
      const nextWidths: number[] = [];

      chars.forEach((char) => {
        const index = Number(char.dataset.index);
        const rect = char.getBoundingClientRect();
        nextCenters[index] = rect.left - box.left + rect.width / 2;
        nextWidths[index] = rect.width;
      });

      centers.current = nextCenters;
      width.current = box.width;
      if (widths.length === 0) setWidths(nextWidths);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => observer.disconnect();
  }, [text, widths.length]);

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

  const sweep = useCallback(() => {
    const start = performance.now();
    const from = -RADIUS;
    const to = width.current + RADIUS;
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
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {wordIndex > 0 ? <span aria-hidden="true">&nbsp;</span> : null}
          {word.map(({ char, index }) => (
            <span
              key={index}
              data-index={index}
              aria-hidden="true"
              className="inline-block text-center"
              style={widths[index] ? { width: widths[index] } : undefined}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
