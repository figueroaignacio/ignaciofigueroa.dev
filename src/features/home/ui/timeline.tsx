import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';

export interface TimelineItem {
  key: string;
  title: string;
  subtitle: string;
  subtitleHref?: string | null;
  connector?: string;
  period: string;
  current: boolean;
  description?: string | null;
  bullets?: string[];
  chips?: string[];
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative ml-1 space-y-10 border-l border-border pl-6">
      {items.map((item) => (
        <li key={item.key} className="relative">
          <span
            aria-hidden
            className={`absolute top-2 left-[-28.5px] size-2 rounded-full border ${
              item.current ? 'border-foreground bg-foreground' : 'border-border bg-background'
            }`}
          />

          <span className="type-meta text-muted-foreground tracking-wider">{item.period}</span>

          <h3 className="type-item-title text-foreground mt-1">
            {item.title}{' '}
            <span className="text-base font-normal text-muted-foreground">
              {item.connector ? `${item.connector} ` : ''}
              {item.subtitleHref ? (
                <a
                  href={item.subtitleHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors underline decoration-border hover:decoration-primary"
                >
                  {item.subtitle}
                </a>
              ) : (
                item.subtitle
              )}
            </span>
          </h3>

          {item.description && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground/90">
              {item.description}
            </p>
          )}

          {item.bullets && item.bullets.length > 0 && (
            <ul className="mt-3 pl-4 space-y-1.5 list-disc text-sm leading-relaxed text-muted-foreground/90">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}

          {item.chips && item.chips.length > 0 && (
            <TechChipGroup className="mt-3">
              {item.chips.map((chip) => (
                <TechChip key={chip}>{chip}</TechChip>
              ))}
            </TechChipGroup>
          )}
        </li>
      ))}
    </ol>
  );
}
