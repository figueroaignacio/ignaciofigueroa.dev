import { cn } from '@/shared/lib/cn';

export function Grain({ className }: { className?: string }) {
  return <div className={cn('grain', className)} aria-hidden="true" />;
}
