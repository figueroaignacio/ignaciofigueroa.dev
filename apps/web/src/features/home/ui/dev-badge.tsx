'use client';

import { cn } from '@/shared/lib/cn';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import Image from 'next/image';
import { useRef, useState, type PointerEvent } from 'react';

const BARS = [3, 1, 1, 2, 4, 1, 2, 1, 1, 3, 1, 2, 2, 1, 4, 1, 1, 2, 3, 1, 2, 1];

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
  name: string;
  role: string;
  company: string;
  city: string;
  stack: string[];
  labels: DevBadgeLabels;
  className?: string;
  strapClassName?: string;
}

const face =
  'absolute inset-0 flex flex-col overflow-hidden rounded-[0.75em] bg-foreground text-left text-background backface-hidden';
const micro = 'font-mono text-[0.6875em]';
const label = cn(micro, 'tracking-[0.08em] text-background/55 uppercase');
const accent = 'text-brand dark:text-[color-mix(in_oklch,var(--brand),black_40%)]';

function Band({ left, right }: { left: string; right: string }) {
  return (
    <span className="relative flex h-[3.25em] shrink-0 items-end justify-between bg-brand px-[1.25em] pb-[0.55em] text-brand-foreground">
      <span
        aria-hidden="true"
        className="absolute top-[0.7em] left-1/2 h-[0.45em] w-[2.75em] -translate-x-1/2 rounded-full bg-background"
      />
      <span className={cn(micro, 'tracking-[0.08em] uppercase')}>{left}</span>
      <span className={cn(micro, 'tracking-[0.08em] uppercase')}>{right}</span>
    </span>
  );
}

function Field({ name, value }: { name: string; value: string }) {
  return (
    <span className="flex flex-col gap-[0.3em]">
      <span className={label}>{name}</span>
      <span className={micro}>{value}</span>
    </span>
  );
}

export function DevBadge({
  name,
  role,
  company,
  city,
  stack,
  labels,
  className,
  strapClassName,
}: DevBadgeProps) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const panned = useRef(false);
  const pull = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const target = useTransform(() => clamp(velocity.get() / 400, 5) + clamp(pull.get() / 10, 14));
  const rotate = useSpring(target, { stiffness: 120, damping: 7, mass: 0.8 });

  const tiltX = useSpring(0, { stiffness: 220, damping: 22 });
  const tiltY = useSpring(0, { stiffness: 220, damping: 22 });
  const shine = useSpring(50, { stiffness: 220, damping: 30 });
  const shinePosition = useMotionTemplate`${shine}% 50%`;

  const [firstName = '', ...rest] = name.split(' ');
  const lastName = rest.join(' ');

  const tilt = (event: PointerEvent<HTMLButtonElement>) => {
    if (reduce || event.pointerType !== 'mouse') return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width;
    const y = (event.clientY - box.top) / box.height;
    tiltY.set((x - 0.5) * 16);
    tiltX.set((0.5 - y) * 10);
    shine.set(100 - x * 100);
  };

  const settle = () => {
    tiltX.set(0);
    tiltY.set(0);
    shine.set(50);
  };

  return (
    <div className={cn('relative flex w-[17.5em] flex-col items-center', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'flex h-24 w-[2.1em] justify-center overflow-hidden bg-brand text-brand-foreground',
          strapClassName,
        )}
      >
        <span className="pt-[0.6em] font-mono text-[0.62em] leading-none font-medium tracking-[0.28em] whitespace-nowrap uppercase [writing-mode:vertical-rl]">
          {'ignaciofigueroa.dev · '.repeat(8)}
        </span>
      </span>
      <motion.div
        className="flex flex-col items-center perspective-[1400px]"
        style={{ rotate: reduce ? 0 : rotate, transformOrigin: '50% 0' }}
        viewport={{ once: true, amount: 0.4 }}
        onViewportEnter={() => {
          if (reduce) return;
          rotate.jump(-12);
          rotate.set(target.get());
        }}
      >
        <span
          aria-hidden="true"
          className="flex h-[1.4em] w-[2.4em] items-center justify-center rounded-[0.35em] border border-foreground/25 bg-muted"
        >
          <span className="h-[0.3em] w-[1.2em] rounded-full bg-foreground/30" />
        </span>
        <span
          aria-hidden="true"
          className="relative z-10 -mb-[0.6em] h-[1.3em] w-[0.7em] rounded-full border-[0.18em] border-foreground/40"
        />
        <motion.button
          type="button"
          aria-label={labels.flip}
          aria-pressed={flipped}
          className="group relative h-[26.25em] w-[17.5em] cursor-grab touch-pan-y rounded-[0.75em] transform-3d focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand active:cursor-grabbing"
          style={{ rotateX: tiltX, rotateY: tiltY }}
          onPointerMove={tilt}
          onPointerLeave={settle}
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
              <Band left={labels.id} right="Nº 0001" />
              <span className="flex flex-1 flex-col p-[1.25em]">
                <span className="flex gap-[1em]">
                  <Image
                    src="/images/profile-photo.webp"
                    alt=""
                    width={160}
                    height={160}
                    draggable={false}
                    className="size-[8em] shrink-0 rounded-[0.3em] object-cover object-[50%_30%] brightness-110 contrast-125 grayscale"
                  />
                  <span className="flex min-w-0 flex-col justify-end gap-[0.9em]">
                    <Field name={labels.now} value={company} />
                    <Field name={labels.base} value={city} />
                  </span>
                </span>
                <span className="flex-1" />
                <span className="text-[2.6em] leading-[0.82] font-black tracking-[-0.075em] uppercase">
                  {firstName}
                  <br />
                  {lastName}
                </span>
                <span className={cn(micro, accent, 'mt-[0.9em] tracking-[0.12em] uppercase')}>
                  {role}
                </span>
                <span className="mt-[1.1em] flex items-end justify-between gap-[1em] border-t border-background/15 pt-[0.9em]">
                  <span className="flex h-[1.6em] gap-[0.125em]">
                    {BARS.map((width, index) => (
                      <span
                        key={index}
                        className="bg-background"
                        style={{ width: `${width * 0.0625}em` }}
                      />
                    ))}
                  </span>
                  <span className={cn(micro, 'text-background/55')}>ignaciofigueroa.dev</span>
                </span>
              </span>
            </span>

            <span className={cn(face, 'rotate-y-180')}>
              <Band left={labels.stack} right={String(stack.length).padStart(2, '0')} />
              <span className="flex flex-1 flex-col p-[1.25em]">
                <span className="mt-[0.5em] flex flex-col gap-[0.08em] text-[1.9em] leading-[0.9] font-black tracking-[-0.06em] uppercase">
                  {stack.map((item, index) => (
                    <span key={item} className={cn(index === stack.length - 1 && accent)}>
                      {item}
                    </span>
                  ))}
                </span>
                <span className="flex-1" />
                <span className="flex flex-col gap-[0.4em] border-t border-background/15 pt-[0.9em]">
                  <span className={label}>{labels.found}</span>
                  <span className="font-mono text-[0.875em]">ignaciofigueroa.dev</span>
                </span>
              </span>
            </span>
          </motion.span>
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[0.75em] bg-[linear-gradient(105deg,transparent_38%,rgb(255_255_255/0.13)_50%,transparent_62%)] bg-size-[250%_100%] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ backgroundPosition: shinePosition }}
          />
        </motion.button>
      </motion.div>
    </div>
  );
}
