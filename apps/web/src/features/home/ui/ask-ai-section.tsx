import { Section } from '@/shared/components/ui/section';
import { getTranslations } from 'next-intl/server';
import { AskAiLinks } from './ask-ai-links';

export async function AskAiSection() {
  const t = await getTranslations('sections.askAi');

  return (
    <Section id="ask-ai" title={t('title')}>
      <div className="prose-reading">
        <p>{t('description')}</p>
      </div>
      <AskAiLinks className="mt-6" />
    </Section>
  );
}
