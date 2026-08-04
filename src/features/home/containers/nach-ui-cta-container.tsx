import { getTranslations } from 'next-intl/server';
import { getNachUiComponents } from '../api/get-nach-ui-components';
import { NachUiCtaWidget } from '../widgets/nach-ui-cta-widget';

export async function NachUiCtaContainer() {
  const t = await getTranslations('sections.mateUiCta');
  const components = await getNachUiComponents();
  const count = components.length;

  const translations = {
    badge: t('badge'),
    title: t('title', { count }),
    description: t('description', { count }),
    actions: {
      viewComponents: t('actions.viewComponents'),
      viewDocumentation: t('actions.viewDocumentation'),
    },
    href: {
      components: t('href.components'),
      documentation: t('href.documentation'),
    },
    stats: {
      components: t('stats.components'),
      openSource: t('stats.openSource'),
    },
  };

  return <NachUiCtaWidget count={count} t={translations} />;
}
