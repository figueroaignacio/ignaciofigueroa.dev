import { Section } from '@/shared/components/ui/section';
import { getLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';

const FACTS = ['now', 'before', 'maintain', 'study'] as const;

const FOCUS = [
  'frontend',
  'software',
  'programming',
  'linux',
  'uxui',
  'sdd',
  'aiOrchestration',
] as const;

export async function AboutSection() {
  const [t, tSection, tHome, tFocus, locale] = await Promise.all([
    getTranslations('sections.aboutMe.content'),
    getTranslations('sections.aboutMe'),
    getTranslations('sections.home'),
    getTranslations('sections.interests.items'),
    getLocale(),
  ]);

  const rows = [
    ...FACTS.map((fact) => ({
      label: tSection(`facts.${fact}.label`),
      value: tSection(`facts.${fact}.value`),
    })),
    {
      label: tSection('facts.focus.label'),
      value: new Intl.ListFormat(locale, { type: 'conjunction' }).format(
        FOCUS.map((key) => tFocus(key)),
      ),
    },
  ];

  return (
    <Section id="about" title={tSection('title')}>
      <div className="flex flex-col gap-10" data-reveal>
        <header className="flex items-center gap-4 sm:gap-5">
          <Image
            src="/images/profile-photo.webp"
            alt={t('photoLegend')}
            width={144}
            height={144}
            className="size-15 shrink-0 object-cover object-[50%_30%] brightness-110 contrast-125 grayscale sm:size-18"
          />
          <div className="min-w-0">
            <p className="text-lg font-bold tracking-[-0.03em] sm:text-xl">{tHome('name')}</p>
            <p className="text-[15px] text-muted-foreground">
              {tHome('title')} · {tHome('status.city')}
            </p>
          </div>
        </header>

        <p className="text-lg leading-snug font-semibold tracking-[-0.02em] text-pretty sm:text-xl">
          {t('lead')}
        </p>

        <dl className="flex flex-col gap-3.5">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid gap-0.5 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-4"
            >
              <dt className="text-[15px] text-muted-foreground first-letter:uppercase">
                {row.label}
              </dt>
              <dd className="text-[15px] leading-relaxed">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="prose-reading">
          <p>{t('bio')}</p>
          <p className="mb-0">{t('more')}</p>
        </div>
      </div>
    </Section>
  );
}
