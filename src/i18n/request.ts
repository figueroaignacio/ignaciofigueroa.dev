import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

const NAMESPACES = ['metadata', 'sections', 'pages', 'ui', 'components'] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const namespaceModules = await Promise.all(
    NAMESPACES.map((ns) => import(`../locales/${locale}/${ns}.json`)),
  );

  const messages = Object.fromEntries(NAMESPACES.map((ns, i) => [ns, namespaceModules[i].default]));

  return { locale, messages };
});
