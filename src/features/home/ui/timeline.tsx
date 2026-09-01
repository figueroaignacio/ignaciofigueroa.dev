import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import {
  Timeline as TimelineRoot,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem as TimelineRootItem,
  TimelineSeparator,
  TimelineTitle,
} from '@/shared/components/ui/timeline';

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
  const currentIndex = items.findIndex((item) => item.current);
  const value = currentIndex === -1 ? 0 : items.length - currentIndex;

  return (
    <TimelineRoot value={value} className="ml-1">
      {items.map((item, index) => (
        <TimelineRootItem
          key={item.key}
          step={items.length - index}
          className="ps-6 pb-10 last:pb-0"
        >
          <TimelineIndicator
            data-current={item.current || undefined}
            className="top-2 left-0 size-2 border group-data-[active]/item:border-brand group-data-[active]/item:bg-brand group-data-[active]/item:ring-4 group-data-[active]/item:ring-brand/15"
          />
          <TimelineSeparator className="top-2 left-0 bg-border group-data-[completed]/item:bg-border" />
          <TimelineHeader>
            <TimelineDate className="type-meta text-muted-foreground tracking-wider">
              {item.period}
            </TimelineDate>
            <TimelineTitle className="type-item-title text-foreground mt-1">
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
            </TimelineTitle>
          </TimelineHeader>

          <TimelineContent className="leading-relaxed">
            {item.description && <p className="mt-3">{item.description}</p>}

            {item.bullets && item.bullets.length > 0 && (
              <ul className="mt-3 pl-4 space-y-2 list-disc marker:text-border">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}

            {item.chips && item.chips.length > 0 && (
              <TechChipGroup className="mt-4">
                {item.chips.map((chip, index) => (
                  <TechChip key={chip} tone={index < 3 ? 'lead' : 'muted'}>
                    {chip}
                  </TechChip>
                ))}
              </TechChipGroup>
            )}
          </TimelineContent>
        </TimelineRootItem>
      ))}
    </TimelineRoot>
  );
}
