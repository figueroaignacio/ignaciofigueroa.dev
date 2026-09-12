import { getLocale, getTranslations } from 'next-intl/server';
import { getContributions } from '../api/contributions';
import { ContributionsWidget } from '../widgets/contributions-widget';

export async function ContributionsContainer() {
  const t = await getTranslations('sections.contributions');
  const locale = await getLocale();
  const contributions = await getContributions(locale);

  return (
    <ContributionsWidget id="contributions" title={t('title')} contributions={contributions} />
  );
}
