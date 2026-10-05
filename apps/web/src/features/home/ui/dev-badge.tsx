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
  name: string;
  role: string;
  company: string;
  city: string;
  stack: string[];
  labels: DevBadgeLabels;
  className?: string;
}

const face =
  'absolute inset-0 flex flex-col bg-foreground p-5 text-left text-background backface-hidden';

function Slot() {
  return (
    <span
      aria-hidden="true"
      className="absolute top-3.5 left-1/2 h-2 w-12 -translate-x-1/2 rounded-full bg-background"
    />
  );
}

function MetaRow({ left, right }: { left: string; right: string }) {
  return (
    <span className="mt-4 flex justify-between font-mono text-[11px] tracking-[0.08em] text-background/60 uppercase">
      <span>{left}</span>
      <span>{right}</span>
    </span>
  );
}

export function DevBadge({ name, role, company, city, stack, labels, className }: DevBadgeProps) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const panned = useRef(false);
  const pull = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const target = useTransform(() => clamp(velocity.get() / 400, 5) + clamp(pull.get() / 10, 14));
  const rotate = useSpring(target, { stiffness: 120, damping: 7, mass: 0.8 });

  const [firstName = '', ...rest] = name.split(' ');
  const lastName = rest.join(' ');

  return (
    <motion.div
      className={cn('flex w-60 flex-col items-center', className)}
      style={{ rotate: reduce ? 0 : rotate, transformOrigin: '50% 0' }}
      viewport={{ once: true, amount: 0.4 }}
      onViewportEnter={() => {
        if (!reduce) rotate.jump(-12);
      }}
    >
      <span aria-hidden="true" className="h-24 w-px bg-foreground" />
      <span aria-hidden="true" className="h-3.5 w-7 border border-foreground" />
      <motion.button
        type="button"
        aria-label={labels.flip}
        aria-pressed={flipped}
        className="relative h-96 w-60 cursor-grab touch-pan-y perspective-[1200px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand active:cursor-grabbing"
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
              width={80}
              height={80}
              draggable={false}
              className="mt-3 size-20 object-cover object-[50%_30%] brightness-110 contrast-125 grayscale"
            />
            <span className="flex-1" />
            <span className="text-[2.5rem] leading-[0.82] font-black tracking-[-0.075em] uppercase">
              {firstName}
              <br />
              {lastName}
            </span>
            <span className="mt-3 self-start bg-brand px-1.5 pt-1 pb-0.5 text-xl leading-[0.9] font-black tracking-[-0.05em] text-brand-foreground uppercase">
              {role}
            </span>
            <span className="mt-5 grid grid-cols-2 gap-3 font-mono text-[11px]">
              <span className="flex flex-col gap-1">
                <span className="text-background/60 uppercase">{labels.now}</span>
                {company}
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-background/60 uppercase">{labels.base}</span>
                {city}
              </span>
            </span>
            <span className="mt-3 flex h-6 gap-0.5">
              {BARS.map((width, index) => (
                <span key={index} className="bg-background" style={{ width }} />
              ))}
            </span>
          </span>

          <span className={cn(face, 'rotate-y-180')}>
            <Slot />
            <MetaRow left={labels.stack} right={String(stack.length).padStart(2, '0')} />
            <span className="mt-7 flex flex-col gap-0.5 text-[1.75rem] leading-[0.9] font-black tracking-[-0.06em] uppercase">
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
            <span className="flex flex-col gap-1.5 border-t border-background/20 pt-3.5 font-mono text-[11px]">
              <span className="text-background/60 uppercase">{labels.found}</span>
              <span className="text-sm">ignaciofigueroa.dev</span>
            </span>
          </span>
        </motion.span>
      </motion.button>
    </motion.div>
  );
}
