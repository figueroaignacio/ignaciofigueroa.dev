'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const GLYPHS = '&$#@%*+=<>/\\[]{}0123456789ABCDEF';
const RADIUS = 56;
const TICK_MS = 55;

interface ScrambleTextProps {
  text: string;
  className?: string;
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

export function ScrambleText({ text, className }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const centers = useRef<number[]>([]);
  const pointerX = useRef<number | null>(null);
  const [rendered, setRendered] = useState(text);
  const [widths, setWidths] = useState<number[]>([]);

  const words = useMemo(() => toWords(rendered), [rendered]);

  useEffect(() => setRendered(text), [text]);

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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let timer: ReturnType<typeof setInterval> | null = null;

    const scramble = () => {
      const x = pointerX.current;
      if (x === null) return;
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
    };

    const onMove = (event: PointerEvent) => {
      pointerX.current = event.clientX - host.getBoundingClientRect().left;
      if (timer) return;
      timer = setInterval(scramble, TICK_MS);
      scramble();
    };

    const onLeave = () => {
      pointerX.current = null;
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
  }, [text]);

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
