import { ScrambleText } from '@/shared/components/scramble-text';
import { cn } from '@/shared/lib/cn';

interface SectionShellProps {
  children: React.ReactNode;
  /** The mono label — or a skeleton bar standing in for one while loading. */
  label: React.ReactNode;
  id?: string;
  className?: string;
  busy?: boolean;
  /**
   * Absolutely-positioned chrome (e.g. the rail bot) anchored to the section
   * itself. Must render outside the blur-reveal wrapper: the wrapper's
   * `filter` would otherwise become the accessory's containing block and pull
   * it off the section edge.
   */
  accessory?: React.ReactNode;
}

export function SectionShell({
  children,
  label,
  id,
  className,
  busy,
  accessory,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-12', className)}
      aria-hidden={busy || undefined}
      aria-busy={busy || undefined}
    >
      <div className="rule-bleed" aria-hidden="true" />
      <div className="frame-column pt-7 pb-8 md:pt-8 md:pb-9">
        {label}
        <div className="mt-4 scroll-blur-in">{children}</div>
      </div>
      {accessory}
    </section>
  );
}

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  accessory?: React.ReactNode;
}

export function Section({ id, title, children, className, accessory }: SectionProps) {
  return (
    <SectionShell
      id={id}
      className={className}
      accessory={accessory}
      label={
        <h2 className="type-label scroll-blur-label lowercase text-muted-foreground">
          <span aria-hidden="true" className="text-muted-foreground/60">
            ./
          </span>
          <ScrambleText text={title} mode="in-view" />
        </h2>
      }
    >
      {children}
    </SectionShell>
  );
}
