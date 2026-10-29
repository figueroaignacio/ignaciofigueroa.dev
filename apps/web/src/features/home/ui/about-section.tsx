import { Section } from '@/shared/components/ui/section';
import { getTranslations } from 'next-intl/server';
import { DevBadge } from './dev-badge';
import { FocusAreas } from './interests';

export const FOCUS_LEAD = ['React', 'Next.js', 'TypeScript', 'Node.js'];

const FACTS = ['now', 'before', 'maintain', 'study'] as const;

export async function AboutSection() {
  const t = await getTranslations('sections.aboutMe.content');
  const tSection = await getTranslations('sections.aboutMe');
  const tHome = await getTranslations('sections.home');

  return (
    <Section id="about" title={tSection('title')}>
      <div className="flex flex-col gap-12" data-reveal>
        <p className="text-lg leading-snug font-semibold tracking-[-0.02em] text-pretty sm:text-xl">
          {t('lead')}
        </p>

        <div className="grid items-start gap-10 sm:grid-cols-[15.3rem_minmax(0,1fr)] sm:gap-x-10">
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
          <dl className="flex flex-col gap-4 rounded-xl bg-(--stage) p-6 sm:mt-14">
            {FACTS.map((fact) => (
              <div key={fact} className="flex flex-col gap-0.5">
                <dt className="text-[15px] text-muted-foreground first-letter:uppercase">
                  {tSection(`facts.${fact}.label`)}
                </dt>
                <dd className="text-[15px]">{tSection(`facts.${fact}.value`)}</dd>
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <dt className="text-[15px] text-muted-foreground first-letter:uppercase">
                {tSection('facts.focus.label')}
              </dt>
              <dd>
                <FocusAreas />
              </dd>
            </div>
          </dl>
        </div>

        <div className="prose-reading">
          <p>{t('bio')}</p>
          <p>{t('more')}</p>
          <p className="mt-6 mb-0 text-lg font-semibold tracking-[-0.02em]">
            {tHome('name')}
            <span className="block text-[15px] font-normal text-muted-foreground">
              {tHome('title')}, {tHome('status.city')}
            </span>
          </p>
        </div>
      </div>
    </Section>
  );
}
