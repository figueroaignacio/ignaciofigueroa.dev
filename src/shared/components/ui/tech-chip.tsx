import { cn } from '@/shared/lib/cn';

/**
 * Two weights so a wall of chips reads as a hierarchy instead of noise:
 * `lead` for the stack someone should remember, `muted` for everything else.
 */
export type TechChipTone = 'lead' | 'muted';

const toneStyles: Record<TechChipTone, string> = {
  lead: 'border-border bg-secondary/70 px-2.5 py-1 text-[11px] text-foreground',
  muted: 'border-border/40 bg-secondary/25 px-2 py-0.5 text-[10px] text-muted-foreground',
};

/* Lead icons keep their brand colors; the tail is desaturated so a long list
 * doesn't turn into a rainbow competing with the amber accent. */
const toneIconStyles: Record<TechChipTone, string> = {
  lead: 'size-3.5',
  muted: 'size-3 grayscale opacity-70',
};

interface TechChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon?: React.ReactNode;
  tone?: TechChipTone;
}

export function TechChip({ children, icon, tone = 'muted', className, ...props }: TechChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-mono tracking-wide',
        toneStyles[tone],
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          aria-hidden="true"
          className={cn(
            'flex shrink-0 items-center justify-center [&>svg]:size-full',
            toneIconStyles[tone],
          )}
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
    <div className={cn('flex flex-wrap items-center gap-1.5', className)} {...props}>
      {children}
    </div>
  );
}
