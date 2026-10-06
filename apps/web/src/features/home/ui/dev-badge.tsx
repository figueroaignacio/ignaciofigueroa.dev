'use client';

import { cn } from '@/shared/lib/cn';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import Image from 'next/image';
import { useRef, useState } from 'react';

const BARS = [3, 1, 1, 2, 4, 1, 2, 1, 1, 3, 1, 2, 2, 1, 4, 1, 1, 2, 3, 1, 2, 1, 1, 4, 2, 1];

const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value));

export interface DevBadgeLabels {
  id: string;
  now: string;
  base: string;
  stack: string;
  found: string;
  flip: string;
}

interface DevBadgeProps {
  company: string;
  city: string;
  stack: string[];
  labels: DevBadgeLabels;
  className?: string;
}

const face =
  'absolute inset-0 flex flex-col bg-foreground p-[1.25em] text-left text-background backface-hidden';
const micro = 'font-mono text-[0.6875em]';
const label = cn(micro, 'tracking-[0.08em] text-background/60 uppercase');

function Slot() {
  return (
    <span
      aria-hidden="true"
      className="absolute top-[0.875em] left-1/2 h-[0.5em] w-[3em] -translate-x-1/2 rounded-full bg-(--wave-base)"
    />
  );
}

function MetaRow({ left, right }: { left: string; right: string }) {
  return (
    <span className="mt-[1.125em] flex justify-between">
      <span className={label}>{left}</span>
      <span className={label}>{right}</span>
    </span>
  );
}

export function DevBadge({ company, city, stack, labels, className }: DevBadgeProps) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const panned = useRef(false);
  const pull = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const target = useTransform(() => clamp(velocity.get() / 400, 5) + clamp(pull.get() / 10, 14));
  const rotate = useSpring(target, { stiffness: 120, damping: 7, mass: 0.8 });

  return (
    <div className={cn('relative flex w-[17.5em] flex-col items-center', className)}>
      <span
        aria-hidden="true"
        className="absolute bottom-full left-1/2 h-dvh w-px -translate-x-1/2 bg-foreground"
      />
      <motion.div
        className="flex flex-col items-center"
        style={{ rotate: reduce ? 0 : rotate, transformOrigin: '50% 0' }}
        viewport={{ once: true, amount: 0.4 }}
        onViewportEnter={() => {
          if (reduce) return;
          rotate.jump(-12);
          rotate.set(target.get());
        }}
      >
        <span aria-hidden="true" className="h-[0.875em] w-[1.75em] border border-foreground" />
        <motion.button
          type="button"
          aria-label={labels.flip}
          aria-pressed={flipped}
          className="relative h-[26.25em] w-[17.5em] cursor-grab touch-pan-y perspective-[1200px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand active:cursor-grabbing"
          onPanStart={() => {
            panned.current = true;
          }}
          onPan={(_, info) => pull.set(info.offset.x)}
          onPanEnd={() => pull.set(0)}
          onClick={() => {
            if (panned.current) {
              panned.current = false;
              return;
            }
            setFlipped((value) => !value);
          }}
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 block transform-3d"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 18 }}
          >
            <span className={face}>
              <Slot />
              <MetaRow left={labels.id} right="Nº 0001" />
              <Image
                src="/images/profile-photo.webp"
                alt=""
                width={240}
                height={240}
                priority
                draggable={false}
                className="mt-[0.875em] aspect-square w-full object-cover object-[50%_30%] brightness-110 contrast-125 grayscale"
              />
              <span className="flex-1" />
              <span className="grid grid-cols-2 gap-[0.75em]">
                <span className="flex flex-col gap-[0.25em]">
                  <span className={label}>{labels.now}</span>
                  <span className={micro}>{company}</span>
                </span>
                <span className="flex flex-col gap-[0.25em]">
                  <span className={label}>{labels.base}</span>
                  <span className={micro}>{city}</span>
                </span>
              </span>
              <span className="mt-[0.875em] flex h-[1.5em] gap-[0.125em]">
                {BARS.map((width, index) => (
                  <span
                    key={index}
                    className="bg-background"
                    style={{ width: `${width * 0.0625}em` }}
                  />
                ))}
              </span>
            </span>

            <span className={cn(face, 'rotate-y-180')}>
              <Slot />
              <MetaRow left={labels.stack} right={String(stack.length).padStart(2, '0')} />
              <span className="mt-[1em] flex flex-col gap-[0.07em] text-[1.75em] leading-[0.9] font-black tracking-[-0.06em] uppercase">
                {stack.map((item, index) => (
                  <span
                    key={item}
                    className={cn(
                      index === stack.length - 1 &&
                        'text-brand dark:text-[color-mix(in_oklch,var(--brand),black_40%)]',
                    )}
                  >
                    {item}
                  </span>
                ))}
              </span>
              <span className="flex-1" />
              <span className="flex flex-col gap-[0.375em] border-t border-background/20 pt-[0.875em]">
                <span className={label}>{labels.found}</span>
                <span className="font-mono text-[0.875em]">ignaciofigueroa.dev</span>
              </span>
            </span>
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
}
