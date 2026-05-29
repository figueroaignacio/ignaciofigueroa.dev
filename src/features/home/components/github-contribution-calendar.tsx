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

function ContributionCell({ day, id }: { day: GithubContributionDay; id: string }) {
  return (
    <div
      key={id}
      className={cn(
        'w-2.5 h-2.5 rounded-xs transition-all duration-200 hover:scale-125 hover:z-10 relative group/cell cursor-pointer',
        getCellColorClass(day.contributionLevel),
      )}
    >
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover/cell:block bg-card text-card-foreground text-[10px] px-2 py-1 rounded-md border border-border shadow-lg whitespace-nowrap z-20 pointer-events-none transition-all">
        <span className="font-semibold text-primary">{day.contributionCount}</span> contributions on{' '}
        {day.date}
      </div>
    </div>
  );
}

function LanguageBadge({ language, count }: TopLanguage) {
  return (
    <span className="inline-flex items-center gap-1 bg-secondary/30 border border-border/40 px-2 py-0.5 rounded-full text-[10px] text-foreground">
      <span className={cn('size-1.5 rounded-full', getLanguageColorClass(language))} />
      {language}
      <span className="text-muted-foreground/60 text-[9px]">({count})</span>
    </span>
  );
}

function getCellColorClass(level: string) {
  switch (level) {
    case 'FIRST_QUARTILE':
      return 'bg-primary/20 border border-primary/10 text-primary';
    case 'SECOND_QUARTILE':
      return 'bg-primary/45 border border-primary/25 text-primary';
    case 'THIRD_QUARTILE':
      return 'bg-primary/70 border border-primary/40 text-primary-foreground';
    case 'FOURTH_QUARTILE':
      return 'bg-primary border border-primary/60 text-primary-foreground';
    default:
      return 'bg-secondary/40 dark:bg-secondary/15 border border-border/10';
  }
}

function getLanguageColorClass(lang: string) {
  switch (lang.toLowerCase()) {
    case 'typescript':
      return 'bg-blue-500';
    case 'javascript':
      return 'bg-yellow-500';
    case 'python':
      return 'bg-green-500';
    case 'css':
      return 'bg-purple-500';
    case 'html':
      return 'bg-orange-500';
    case 'java':
      return 'bg-amber-600';
    case 'c++':
    case 'cpp':
      return 'bg-rose-500';
    case 'c':
      return 'bg-gray-500';
    case 'astro':
      return 'bg-indigo-500';
    default:
      return 'bg-primary';
  }
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
          className="text-xs text-muted-foreground hover:text-primary hover:underline transition-colors flex items-center gap-1 font-medium"
        >
          github.com/figueroaignacio
        </a>
      </div>

      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border/60 scrollbar-track-transparent">
        <div className="min-w-180 py-1">
          <div className="grid grid-flow-col grid-rows-7 gap-0.75 auto-cols-max">
            {contributions.flatMap((week, wIndex) =>
              week.map((day, dIndex) => (
                <ContributionCell
                  key={`${activeYear}-${wIndex}-${dIndex}`}
                  id={`${activeYear}-${wIndex}-${dIndex}`}
                  day={day}
                />
              )),
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-border/40 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-medium text-foreground">{topLanguagesLabel}:</span>
          {topLanguages.map((lang) => (
            <LanguageBadge key={lang.language} language={lang.language} count={lang.count} />
          ))}
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto text-[10px]">
          <span>{lessLabel}</span>
          <div className="size-2.5 rounded-xs bg-secondary/40 dark:bg-secondary/15 border border-border/10" />
          <div className="size-2.5 rounded-xs bg-primary/20 border border-primary/10" />
          <div className="size-2.5 rounded-xs bg-primary/45 border border-primary/25" />
          <div className="size-2.5 rounded-xs bg-primary/70 border border-primary/40" />
          <div className="size-2.5 rounded-xs bg-primary border border-primary/60" />
          <span>{moreLabel}</span>
        </div>
      </div>
    </div>
  );
}
