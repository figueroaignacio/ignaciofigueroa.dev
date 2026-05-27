import { cn } from '@/shared/lib/cn';
import { Loading02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

function Spinner({ className, strokeWidth = 2.5, ...props }: React.ComponentProps<'svg'>) {
  return (
    <HugeiconsIcon
      icon={Loading02Icon}
      className={cn('animate-spin text-muted-foreground', className)}
      strokeWidth={Number(strokeWidth)}
      {...props}
    />
  );
}

export { Spinner };
