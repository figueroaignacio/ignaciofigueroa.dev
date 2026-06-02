import type { Contribution } from '@/payload-types';
import { getLocale, getTranslations } from 'next-intl/server';
import { getContributions } from '../api/contributions';
import { ContributionCard } from './contribution-card';

export async function ContributionsSection() {
  const t = await getTranslations('sections.contributions');
  const locale = await getLocale();
  const contributions: Contribution[] = await getContributions(locale);

  if (!contributions || contributions.length === 0) return null;

  return (
    <section id="contributions" className="space-y-6" aria-labelledby="contributions-title">
      <div>
        <h2 id="contributions-title" className="text-xl font-bold tracking-tight text-foreground">
          {t('title')}
        </h2>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{t('description')}</p>
      </div>
      <div className="grid gap-3">
        {contributions.map((contribution) => (
          <ContributionCard
            key={contribution.id}
            title={contribution.title}
            description={contribution.description}
            technologies={contribution.technologies}
            repository={contribution.repository}
            fork={contribution.fork}
            pullRequests={contribution.pullRequests}
          />
        ))}
      </div>
    </section>
  );
}
