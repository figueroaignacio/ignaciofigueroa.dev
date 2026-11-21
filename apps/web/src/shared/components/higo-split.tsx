import { HIGO_HALVES } from '@/shared/components/icons/higo';
import { cn } from '@/shared/lib/cn';

interface HigoSplitProps {
  className?: string;
  animated?: boolean;
}

export function HigoSplit({ className, animated = false }: HigoSplitProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-24 0 304 256"
      fill="currentColor"
      aria-hidden="true"
      className={cn('higo-split', animated && 'higo-split-animated', className)}
    >
      <path className="higo-split-left" d={HIGO_HALVES.left} />
      <path className="higo-split-right" d={HIGO_HALVES.right} />
    </svg>
  );
}
