import clsx from 'clsx';
import { AssistantFace } from './assistant-face';

const SIZES = {
  sm: 'size-4',
  md: 'size-8',
  lg: 'size-10',
  xl: 'size-12',
} as const;

export type AssistantExpression = 'awake' | 'asleep' | 'dazzled' | 'startled';

type AssistantAvatarProps = {
  size?: keyof typeof SIZES;
  className?: string;
  expression?: AssistantExpression;
};

export function AssistantAvatar({
  size = 'md',
  className,
  expression = 'awake',
}: AssistantAvatarProps) {
  return (
    <svg
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
