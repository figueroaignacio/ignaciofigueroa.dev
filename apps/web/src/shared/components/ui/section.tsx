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
      className={cn('scroll-mt-20', className)}
      aria-hidden={busy || undefined}
      aria-busy={busy || undefined}
    >
      <div className="frame-column py-14 lg:py-16" data-reveal>
        {label}
        <div className="mt-8">{children}</div>
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
        <h2 className="type-section">
          <ScrambleText text={title} mode="in-view" />
        </h2>
      }
    >
      {children}
    </SectionShell>
  );
}
