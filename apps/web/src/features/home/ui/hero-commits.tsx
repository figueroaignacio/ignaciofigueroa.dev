import { cn } from '@/shared/lib/cn';
import { getTranslations } from 'next-intl/server';
import { getGithubStats, type GithubContributionDay } from '../api/github-stats';

const WEEKS = 40;
const MOBILE_WEEKS = 20;

const LEVELS: Record<string, string> = {
  NONE: 'bg-foreground/[0.07]',
  FIRST_QUARTILE: 'bg-brand/30',
  SECOND_QUARTILE: 'bg-brand/55',
  THIRD_QUARTILE: 'bg-brand/80',
  FOURTH_QUARTILE: 'bg-brand',
};

function lastWeeks(days: GithubContributionDay[], weeks: number) {
  const sorted = [...new Map(days.map((day) => [day.date, day])).values()].sort((a, b) =>
    a.date.localeCompare(b.date),
  );
  let lastSunday = sorted.length - 1;
  while (lastSunday >= 0 && new Date(`${sorted[lastSunday].date}T00:00:00Z`).getUTCDay() !== 0) {
    lastSunday--;
  }
  if (lastSunday === -1) return [];
  return sorted.slice(Math.max(0, lastSunday - (weeks - 1) * 7));
}

export async function HeroCommits() {
  const [stats, t] = await Promise.all([getGithubStats(), getTranslations('sections')]);
  if (!stats) return null;

  const days = lastWeeks(
    Object.values(stats.years).flatMap((year) => year.contributions.flat()),
    WEEKS,
  );
  if (days.length === 0) return null;

  const hiddenOnMobile = (WEEKS - MOBILE_WEEKS) * 7;
  const total = days.reduce((sum, day) => sum + day.contributionCount, 0);

  return (
    <figure className="flex flex-col gap-3 [@media(max-height:44rem)]:hidden">
      <div
        role="img"
        aria-label={t('home.labels.commitsAria', { count: total })}
        className="grid grid-flow-col grid-rows-7 auto-cols-fr gap-[3px] sm:gap-1"
      >
        {days.map((day, index) => (
          <span
            key={day.date}
            className={cn(
              'aspect-square rounded-[2px]',
              LEVELS[day.contributionLevel] ?? LEVELS.NONE,
              index < hiddenOnMobile && 'max-sm:hidden',
            )}
          />
        ))}
      </div>
      <figcaption className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
        <span>
          <span aria-hidden="true" className="text-muted-foreground/60">
            ./
          </span>
          {t('home.labels.commits')}
        </span>
        <span aria-hidden="true" className="flex items-center gap-1">
          {t('github.grid.less')}
          {['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'FOURTH_QUARTILE'].map((level) => (
            <span key={level} className={cn('size-2 rounded-[2px]', LEVELS[level])} />
          ))}
          {t('github.grid.more')}
        </span>
      </figcaption>
    </figure>
  );
}
