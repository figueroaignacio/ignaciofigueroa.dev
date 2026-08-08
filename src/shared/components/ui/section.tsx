import { cn } from '@/shared/lib/cn';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Every home section opens with a rule that runs the full width of the page,
 * crossing both rails on its way out. That crossing is the whole point: a
 * separator stopping at the rail reads as a stack of closed boxes, one that
 * runs past it reads as a single drawn grid.
 *
 * Two elements, deliberately: the rule bleeds to the viewport, the content
 * sits in the centered column. Merging them would drag one or the other to
 * the wrong width.
 */
export function Section({ id, title, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-12', className)}>
      <div className="rule-bleed" aria-hidden="true" />
      <div className="frame-column pt-10 pb-14 md:pt-12">
        <h2 className="type-label text-muted-foreground">{title}</h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
