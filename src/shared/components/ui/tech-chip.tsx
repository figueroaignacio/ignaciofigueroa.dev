import { cn } from '@/shared/lib/cn';

interface TechChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon?: React.ReactNode;
}

export function TechChip({ children, icon, className, ...props }: TechChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-secondary/30 px-2 py-0.5 text-[10px] font-mono text-muted-foreground',
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          aria-hidden="true"
          className="flex size-3 shrink-0 items-center justify-center [&>svg]:size-full"
        >
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}

export function TechChipGroup({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)} {...props}>
      {children}
    </div>
  );
}
