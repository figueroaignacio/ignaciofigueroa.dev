import { Section } from '@/shared/components/ui/section';
import { getTranslations } from 'next-intl/server';
import { AskAiLinks } from './ask-ai-links';

export async function AskAiSection() {
  const t = await getTranslations('sections.askAi');

  return (
    <Section id="ask-ai" title={t('title')}>
      <div className="flex flex-col gap-8" data-reveal>
        <p className="max-w-[52ch] text-lg leading-snug font-medium tracking-[-0.015em] text-pretty">
          {t('description')}
        </p>
        <AskAiLinks />
      </div>
    </Section>
  );
}
