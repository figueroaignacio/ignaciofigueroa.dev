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
    <section id="contributions" className="scroll-mt-12">
      <div className="mb-8">
        <h2 className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted">
          {t('title')}
        </h2>
        <div className="mt-3 h-px bg-rule" />
      </div>
      <ul className="divide-y divide-border">
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
      </ul>
    </section>
  );
}
