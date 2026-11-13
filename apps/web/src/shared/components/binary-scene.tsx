'use client';

import {
  buildGrid,
  DECODE_SECONDS,
  makeGlyphs,
  SceneRenderer,
  type Grid,
  type Motion,
  type SceneId,
} from '@/shared/lib/binary-scene';
import { cn } from '@/shared/lib/cn';
import { useEffect, useRef } from 'react';

interface BinarySceneProps {
  scene: SceneId;
  motion: Motion;
  className?: string;
}

export function BinaryScene({ scene, motion, className }: BinarySceneProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;

    let grid: Grid | null = null;
    let renderer: SceneRenderer | null = null;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let color = '';
    let font = '';
    let opacity = 0.3;
    let ready = false;
    let visible = false;
    let started = 0;
    let raf = 0;
    let last = 0;
    const pointer = { x: 0, y: 0, inside: false };
    const spot = { x: Number.NaN, y: Number.NaN };

    const readLook = () => {
      const style = getComputedStyle(canvas);
      color = style.color;
      font = style.fontFamily;
      opacity = Number.parseFloat(style.getPropertyValue('--scene-opacity')) || 0.3;
      renderer = null;
    };

    const measure = () => {
      const box = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      if (box.width === width && box.height === height && ratio === dpr) return;
      width = box.width;
      height = box.height;
      dpr = ratio;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      grid = width && height ? buildGrid(scene, width, height) : null;
      renderer = null;
    };

    const draw = (now: number) => {
      if (!grid) return;
      if (!renderer) {
        renderer = new SceneRenderer(
          grid,
          makeGlyphs(grid, color, font, dpr),
          width,
          height,
          dpr,
          opacity,
        );
      }
      const time = still ? Number.POSITIVE_INFINITY : (now - started) / 1000;

      let target: { x: number; y: number } | null = null;
      if (motion === 'spotlight' && !still) {
        target =
          canHover && pointer.inside
            ? { x: pointer.x, y: pointer.y }
            : {
                x: width * (0.5 + 0.32 * Math.sin(time * 0.35)),
                y: height * (0.62 + 0.18 * Math.sin(time * 0.6)),
              };
        if (Number.isNaN(spot.x)) Object.assign(spot, target);
        spot.x += (target.x - spot.x) * 0.18;
        spot.y += (target.y - spot.y) * 0.18;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (still) renderer.still(ctx);
      else if (motion === 'decode') renderer.decode(ctx, time);
      else renderer.spotlight(ctx, spot);
    };

    const interval = (now: number) => {
      if (motion === 'spotlight') return 33;
      return (now - started) / 1000 < DECODE_SECONDS ? 33 : 320;
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < interval(now)) return;
      last = now;
      draw(now);
    };

    const play = () => {
      if (!ready || !visible || document.hidden) return;
      if (!started) started = performance.now();
      if (still) {
        draw(performance.now());
        return;
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const redraw = () => {
      measure();
      if (ready && started && (still || !raf)) draw(performance.now());
    };

    const onPointer = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      pointer.x = event.clientX - box.left;
      pointer.y = event.clientY - box.top;
      pointer.inside =
        pointer.x >= 0 && pointer.y >= 0 && pointer.x <= box.width && pointer.y <= box.height;
    };

    const onVisibility = () => (document.hidden ? pause() : play());

    const resize = new ResizeObserver(() => redraw());
    const theme = new MutationObserver(() => {
      readLook();
      redraw();
    });
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else pause();
    });

    readLook();
    measure();
    resize.observe(canvas);
    seen.observe(canvas);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    document.addEventListener('visibilitychange', onVisibility);
    if (motion === 'spotlight' && canHover)
      window.addEventListener('pointermove', onPointer, { passive: true });

    const fonts = document.fonts?.ready ?? Promise.resolve();
    fonts.then(() => {
      ready = true;
      readLook();
      play();
    });

    return () => {
      pause();
      resize.disconnect();
      seen.disconnect();
      theme.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
    };
  }, [scene, motion]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none block font-mono text-foreground select-none', className)}
    />
  );
}
