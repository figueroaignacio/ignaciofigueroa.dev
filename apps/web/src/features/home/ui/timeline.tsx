import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import {
  Timeline as TimelineRoot,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineItem as TimelineRootItem,
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
    <TimelineRoot value={value} className="gap-14" data-reveal>
      {items.map((item, index) => (
        <TimelineRootItem
          key={item.key}
          step={items.length - index}
          className="grid gap-x-8 gap-y-3 ps-0 pb-0 sm:grid-cols-[8.5rem_minmax(0,1fr)]"
        >
          <TimelineDate className="flex items-center gap-2 pt-1 text-[15px] text-muted-foreground tabular-nums sm:flex-col sm:items-start sm:gap-1">
            {item.current && <span aria-hidden="true" className="size-2 bg-brand" />}
            {item.period}
          </TimelineDate>

          <div className="min-w-0">
            <TimelineHeader>
              <TimelineTitle className="text-lg leading-snug font-semibold tracking-[-0.02em] text-foreground">
                {item.title}{' '}
                <span className="font-normal text-muted-foreground">
                  {item.connector ? `${item.connector} ` : ''}
                  {item.subtitleHref ? (
                    <a
                      href={item.subtitleHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                    >
                      {item.subtitle}
                    </a>
                  ) : (
                    item.subtitle
                  )}
                </span>
              </TimelineTitle>
            </TimelineHeader>

            <TimelineContent className="text-[15px] leading-relaxed text-foreground">
              {item.description && <p className="mt-4">{item.description}</p>}

              {item.bullets && item.bullets.length > 0 && (
                <ul className="mt-4 list-none space-y-2.5">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="relative ps-5">
                      <span
                        aria-hidden="true"
                        className="absolute top-[0.6em] left-0 size-1.5 bg-muted-foreground"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {item.chips && item.chips.length > 0 && (
                <TechChipGroup className="mt-5">
                  {item.chips.map((chip, index) => (
                    <TechChip key={`${chip}-${index}`} tone={index < 3 ? 'lead' : 'muted'}>
                      {chip}
                    </TechChip>
                  ))}
                </TechChipGroup>
              )}
            </TimelineContent>
          </div>
        </TimelineRootItem>
      ))}
    </TimelineRoot>
  );
}
