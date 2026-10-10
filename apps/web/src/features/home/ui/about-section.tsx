import { Section } from '@/shared/components/ui/section';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import { getTranslations } from 'next-intl/server';
import { Fragment } from 'react';
import { DevBadge } from './dev-badge';

export const FOCUS_LEAD = ['React', 'Next.js', 'TypeScript', 'Node.js'];
const FOCUS_SUPPORT = ['AI Integration', 'Clean Architecture', 'Linux', 'Fedora'];

const FACTS = ['now', 'before', 'maintain', 'study'] as const;

const factLabel = 'border-t border-rule py-3 font-mono text-xs text-muted-foreground';
const factValue = 'border-t border-rule py-3';

function FactLabel({ label }: { label: string }) {
  return (
    <dt className={factLabel}>
      <span aria-hidden="true" className="text-muted-foreground/60">
        ./
      </span>
      {label}
    </dt>
  );
}

export async function AboutSection() {
  const t = await getTranslations('sections.aboutMe.content');
  const tSection = await getTranslations('sections.aboutMe');
  const tHome = await getTranslations('sections.home');

  return (
    <Section id="about" title={tSection('title')}>
      <div className="grid gap-10 sm:grid-cols-[15.3rem_minmax(0,1fr)] sm:gap-x-12">
        <DevBadge
          name={tHome('name')}
          role={tHome('title')}
          company={tHome('status.company')}
          city={tHome('status.city')}
          stack={FOCUS_LEAD}
          labels={{
            id: tSection('badge.id'),
            now: tSection('badge.now'),
            base: tSection('badge.base'),
            stack: tSection('badge.stack'),
            found: tSection('badge.found'),
            flip: tSection('badge.flip'),
          }}
          strapClassName="h-10"
          className="mx-auto text-[0.875rem] sm:mx-0"
        />

        <div className="flex min-w-0 flex-col gap-7 sm:pt-14">
          <p className="text-xl leading-snug font-medium tracking-[-0.02em] text-pretty text-foreground">
            {t('lead')}
          </p>
          <dl className="grid grid-cols-[6.5rem_minmax(0,1fr)] text-sm">
            {FACTS.map((fact) => (
              <Fragment key={fact}>
                <FactLabel label={tSection(`facts.${fact}.label`)} />
                <dd className={factValue}>{tSection(`facts.${fact}.value`)}</dd>
              </Fragment>
            ))}
            <FactLabel label={tSection('facts.focus.label')} />
            <dd className="border-t border-rule py-2.5">
              <TechChipGroup>
                {FOCUS_LEAD.map((item) => (
                  <TechChip key={item} tone="lead">
                    {item}
                  </TechChip>
                ))}
                {FOCUS_SUPPORT.map((item) => (
                  <TechChip key={item}>{item}</TechChip>
                ))}
              </TechChipGroup>
            </dd>
          </dl>
        </div>
      </div>

      <div className="prose-reading mt-12">
        <p>{t('bio')}</p>
        <p className="text-muted-foreground">{t('more')}</p>
      </div>
    </Section>
  );
}
