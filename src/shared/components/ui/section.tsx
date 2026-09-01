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

/**
 * The geometry every home section shares, in one place.
 *
 * A section is two sibling elements, deliberately: the rule bleeds out to the
 * viewport, the content stays on the centered column. Merging them would drag
 * one or the other to the wrong width.
 *
 * The rule running the full width of the page — crossing both rails on its way
 * out — is the whole effect. A separator that stops at the rail reads as a
 * stack of closed boxes; one that runs past it reads as a single drawn grid.
 *
 * Skeletons render through this same shell so a loading section occupies the
 * exact geometry of the real one: same measure, same rhythm, same rule, no
 * layout shift when the content arrives. Duplicating this markup is how the
 * skeletons previously drifted into spanning the whole frame.
 */
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
      <div className="frame-column pt-8 pb-10 md:pt-10">
        {label}
        <div className="mt-5 scroll-blur-in">{children}</div>
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
      label={<h2 className="type-label scroll-blur-label text-muted-foreground">{title}</h2>}
    >
      {children}
    </SectionShell>
  );
}
