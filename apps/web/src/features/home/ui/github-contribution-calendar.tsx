'use client';

import { AssistantStroll } from '@/features/assistant/ui/assistant-stroll';
import { Badge } from '@/shared/components/ui/badge';
import { cn } from '@/shared/lib/cn';
import { useRef, useState } from 'react';
import { GithubContributionDay, TopLanguage } from './github-stats-types';

interface GithubContributionCalendarProps {
  activeYear: string;
  contributions: GithubContributionDay[][];
  topLanguages: TopLanguage[];
  titleText: string;
  topLanguagesLabel: string;
  lessLabel: string;
  moreLabel: string;
}

const CELL_LEVELS = [
  { level: 'NONE', className: 'bg-foreground/[0.07]' },
  { level: 'FIRST_QUARTILE', className: 'bg-foreground/25' },
  { level: 'SECOND_QUARTILE', className: 'bg-foreground/45' },
  { level: 'THIRD_QUARTILE', className: 'bg-foreground/70' },
  { level: 'FOURTH_QUARTILE', className: 'bg-foreground' },
];

function getCellColorClass(level: string) {
  return (CELL_LEVELS.find((entry) => entry.level === level) ?? CELL_LEVELS[0]).className;
}

const LANGUAGE_COLORS: Record<string, string> = {
  typescript: 'bg-blue-500',
  javascript: 'bg-yellow-500',
  python: 'bg-green-500',
  css: 'bg-purple-500',
  html: 'bg-orange-500',
  java: 'bg-amber-600',
  'c++': 'bg-rose-500',
  cpp: 'bg-rose-500',
  c: 'bg-gray-500',
  astro: 'bg-indigo-500',
};

function getLanguageColorClass(lang: string) {
  return LANGUAGE_COLORS[lang.toLowerCase()] ?? 'bg-primary';
}

function ContributionCell({
  day,
  column,
  row,
}: {
  day: GithubContributionDay;
  column: number;
  row: number;
}) {
  return (
    <div
      data-week={column}
      data-day={row}
      style={{ '--col': column } as React.CSSProperties}
      className={cn(
        'contribution-cell aspect-square w-full rounded-[2px] transition-transform duration-200 hover:scale-125 hover:z-10 cursor-pointer',
        getCellColorClass(day.contributionLevel),
      )}
    />
  );
}

interface ActiveCell {
  day: GithubContributionDay;
  x: number;
  y: number;
}

function LanguageBadge({ language, count }: TopLanguage) {
  return (
    <Badge variant="secondary" className="rounded-full border-0 text-[0.8125rem] font-normal">
      <span className={cn('size-1.5 rounded-full', getLanguageColorClass(language))} />
      {language}
      <span className="text-muted-foreground">({count})</span>
    </Badge>
  );
}

export function GithubContributionCalendar({
  activeYear,
  contributions,
  topLanguages,
  titleText,
  topLanguagesLabel,
  lessLabel,
  moreLabel,
}: GithubContributionCalendarProps) {
  const field = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<ActiveCell | null>(null);
  const showCell = (event: React.PointerEvent<HTMLDivElement>) => {
    const cell = (event.target as HTMLElement).closest<HTMLElement>('[data-week]');
    const host = field.current;
    const day = cell
      ? contributions[Number(cell.dataset.week)]?.[Number(cell.dataset.day)]
      : undefined;
    if (!cell || !host || !day) return;
    if (active?.day === day) return;
    const box = cell.getBoundingClientRect();
    const origin = host.getBoundingClientRect();
    setActive({
      day,
      x: box.left - origin.left + box.width / 2,
      y: box.top - origin.top,
    });
  };

  return (
    <div data-ui className="space-y-5 rounded-xl bg-(--stage) p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[15px]">
        <span className="font-medium">
          {titleText} — {activeYear}
        </span>
        <a
          href="https://github.com/figueroaignacio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
        >
          github.com/figueroaignacio ↗
        </a>
      </div>

      <div>
        <div
          ref={field}
          className="contribution-field pt-10 pb-1"
          style={{ '--cols': contributions.length } as React.CSSProperties}
        >
          <div className="contribution-track" aria-hidden="true">
            <AssistantStroll className="contribution-walker" />
          </div>

          <div
            className="grid grid-flow-col grid-rows-7 auto-cols-fr gap-[2px] sm:gap-[3px]"
            onPointerOver={showCell}
            onPointerLeave={() => setActive(null)}
          >
            {contributions.flatMap((week, wIndex) =>
              week.map((day, dIndex) => (
                <ContributionCell
                  key={`${activeYear}-${wIndex}-${dIndex}`}
                  day={day}
                  column={wIndex}
                  row={dIndex}
                />
              )),
            )}
          </div>

          {active && (
            <div
              role="tooltip"
              className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full rounded-sm bg-foreground px-2.5 py-1 text-[0.8125rem] whitespace-nowrap text-background"
              style={{ left: active.x, top: active.y - 6 }}
            >
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 rounded-[1px] bg-foreground"
              />
              <span className="relative">
                <span className="font-semibold">{active.day.contributionCount}</span> contributions
                on {active.day.date}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-3 text-[0.8125rem] text-muted-foreground sm:flex-row sm:items-center">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-medium text-foreground">{topLanguagesLabel}:</span>
          {topLanguages.map((lang) => (
            <LanguageBadge key={lang.language} language={lang.language} count={lang.count} />
          ))}
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span>{lessLabel}</span>
          {CELL_LEVELS.map((entry) => (
            <div key={entry.level} className={cn('size-2.5 rounded-[2px]', entry.className)} />
          ))}
          <span>{moreLabel}</span>
        </div>
      </div>
    </div>
  );
}
