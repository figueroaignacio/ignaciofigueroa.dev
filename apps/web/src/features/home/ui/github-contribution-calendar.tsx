import { AssistantStroll } from '@/features/assistant/ui/assistant-stroll';
import { Badge } from '@/shared/components/ui/badge';
import { Separator } from '@/shared/components/ui/separator';
import { Tooltip } from '@/shared/components/ui/tooltip';
import { cn } from '@/shared/lib/cn';
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
  { level: 'NONE', className: 'bg-secondary/40 dark:bg-secondary/15 border border-border/10' },
  { level: 'FIRST_QUARTILE', className: 'bg-primary/20 border border-primary/10' },
  { level: 'SECOND_QUARTILE', className: 'bg-primary/45 border border-primary/25' },
  { level: 'THIRD_QUARTILE', className: 'bg-primary/70 border border-primary/40' },
  { level: 'FOURTH_QUARTILE', className: 'bg-primary border border-primary/60' },
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

function ContributionCell({ day, column }: { day: GithubContributionDay; column: number }) {
  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <div
          style={{ '--col': column } as React.CSSProperties}
          className={cn(
            'contribution-cell w-2.5 h-2.5 rounded-xs transition-all duration-200 hover:scale-125 hover:z-10 cursor-pointer',
            getCellColorClass(day.contributionLevel),
          )}
        />
      </Tooltip.Trigger>
      <Tooltip.Content className="text-[10px]">
        <span className="font-semibold">{day.contributionCount}</span> contributions on {day.date}
      </Tooltip.Content>
    </Tooltip>
  );
}

function LanguageBadge({ language, count }: TopLanguage) {
  return (
    <Badge variant="outline" className="rounded-full bg-secondary/30 text-[10px] font-normal">
      <span className={cn('size-1.5 rounded-full', getLanguageColorClass(language))} />
      {language}
      <span className="text-muted-foreground/60">({count})</span>
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
  return (
    <div className="border border-border/50 bg-secondary/10 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          {titleText} — {activeYear}
        </span>
        <a
          href="https://github.com/figueroaignacio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-brand hover:underline transition-colors flex items-center gap-1 font-medium"
        >
          github.com/figueroaignacio
        </a>
      </div>

      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border/60 scrollbar-track-transparent">
        <div
          className="contribution-field min-w-180 pt-10 pb-1"
          style={{ '--cols': contributions.length } as React.CSSProperties}
        >
          <div className="contribution-track" aria-hidden="true">
            <AssistantStroll className="contribution-walker" />
          </div>

          <div className="grid grid-flow-col grid-rows-7 gap-0.75 auto-cols-max">
            {contributions.flatMap((week, wIndex) =>
              week.map((day, dIndex) => (
                <ContributionCell
                  key={`${activeYear}-${wIndex}-${dIndex}`}
                  day={day}
                  column={wIndex}
                />
              )),
            )}
          </div>
        </div>
      </div>

      <Separator className="bg-border/40" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-medium text-foreground">{topLanguagesLabel}:</span>
          {topLanguages.map((lang) => (
            <LanguageBadge key={lang.language} language={lang.language} count={lang.count} />
          ))}
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto text-[10px]">
          <span>{lessLabel}</span>
          {CELL_LEVELS.map((entry) => (
            <div key={entry.level} className={cn('size-2.5 rounded-xs', entry.className)} />
          ))}
          <span>{moreLabel}</span>
        </div>
      </div>
    </div>
  );
}
