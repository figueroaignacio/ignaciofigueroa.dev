import { cn } from '@/shared/lib/cn';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, title, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('scroll-mt-12', className)}>
      <div className="mb-8">
        <h2 className="type-label text-muted-foreground">{title}</h2>
        <div className="mt-3 flex h-px" aria-hidden="true">
          <span className="w-8 bg-foreground/25" />
          <span className="flex-1 bg-rule" />
        </div>
      </div>
      {children}
    </section>
  );
}
