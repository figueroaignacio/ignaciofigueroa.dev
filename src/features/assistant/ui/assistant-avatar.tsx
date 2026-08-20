'use client';

import clsx from 'clsx';
import { useRef } from 'react';
import { useGaze } from '../hooks/use-gaze';
import { AssistantFace } from './assistant-face';

const SIZES = {
  sm: 'size-4',
  md: 'size-8',
  lg: 'size-10',
  xl: 'size-12',
} as const;

export type AssistantExpression = 'awake' | 'asleep' | 'dazzled' | 'startled' | 'reading';

type AssistantAvatarProps = {
  size?: keyof typeof SIZES;
  className?: string;
  expression?: AssistantExpression;
  /**
   * Follow the pointer with its eyes. Worth it on the big ones; at `sm` the
   * eyes are four pixels wide and the whole effect lands under a pixel.
   */
  follow?: boolean;
};

export function AssistantAvatar({
  size = 'md',
  className,
  expression = 'awake',
  follow = false,
}: AssistantAvatarProps) {
  const ref = useRef<SVGSVGElement>(null);
  useGaze(ref, follow);

  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Nacho's Assistant"
      data-expression={expression}
      className={clsx('assistant-avatar overflow-visible', SIZES[size], className)}
    >
      <title>Portfolio AI</title>
      <AssistantFace />
    </svg>
  );
}
