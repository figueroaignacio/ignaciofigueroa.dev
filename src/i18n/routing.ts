import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'es'] as const;

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localeDetection: true,
});
