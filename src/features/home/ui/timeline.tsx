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
              item.current
                ? 'border-brand bg-brand ring-4 ring-brand/15'
                : 'border-border bg-background'
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
                  className="hover:text-brand transition-colors underline decoration-border hover:decoration-brand"
                >
                  {item.subtitle}
                </a>
              ) : (
                item.subtitle
              )}
            </span>
          </h3>

          {item.description && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          )}

          {item.bullets && item.bullets.length > 0 && (
            <ul className="mt-3 pl-4 space-y-2 list-disc text-sm leading-relaxed text-muted-foreground marker:text-border">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}

          {/*
           * Chips read as the role's stack: the first three lead, the tail stays quiet
           * so a long list doesn't compete with the role title.
           */}
          {item.chips && item.chips.length > 0 && (
            <TechChipGroup className="mt-4">
              {item.chips.map((chip, index) => (
                <TechChip key={chip} tone={index < 3 ? 'lead' : 'muted'}>
                  {chip}
                </TechChip>
              ))}
            </TechChipGroup>
          )}
        </li>
      ))}
    </ol>
  );
}
