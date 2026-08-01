import type { Contribution } from '@/payload-types';
import { Section } from '@/shared/components/ui/section';
import { getLocale, getTranslations } from 'next-intl/server';
import { getContributions } from '../api/contributions';
import { ContributionCard } from './contribution-card';

export async function ContributionsSection() {
  const t = await getTranslations('sections.contributions');
  const locale = await getLocale();
  const contributions: Contribution[] = await getContributions(locale);

  if (!contributions || contributions.length === 0) return null;

  return (
    <Section id="contributions" title={t('title')}>
      <ul className="space-y-4">
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
    </Section>
  );
}
