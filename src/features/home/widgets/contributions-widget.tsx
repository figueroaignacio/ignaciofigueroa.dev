import type { Contribution } from '@/payload-types';
import { Section } from '@/shared/components/ui/section';
import { ContributionCard } from '../ui/contribution-card';
import { ContributionsSkeleton } from '../ui/contributions-skeleton';

interface ContributionsWidgetProps {
  id: string;
  title?: string;
  contributions?: Contribution[] | null;
}

export function ContributionsWidget({ id, title = '', contributions }: ContributionsWidgetProps) {
  if (contributions === undefined) return <ContributionsSkeleton />;
  if (contributions === null || contributions.length === 0) return null;

  return (
    <Section id={id} title={title}>
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
