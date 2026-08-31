'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import type { Locale } from 'next-intl';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';

const LOCALE_LABELS: Record<string, string> = {
  es: 'ES',
  en: 'EN',
};

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  function handleLocaleChange(newLocale: Locale) {
    startTransition(() => {
      router.replace({ pathname }, { locale: newLocale });
    });
  }

  return (
    <div className="flex items-center gap-1 font-mono text-xs">
      {locales.map((localeOption, index) => (
        <span key={localeOption} className="flex items-center gap-1">
          {index > 0 && <span className="text-border select-none">/</span>}
          <button
            type="button"
            onClick={() => handleLocaleChange(localeOption as Locale)}
            disabled={isPending || locale === localeOption}
            className={
              locale === localeOption
                ? 'text-foreground cursor-default'
                : 'rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
            }
            aria-label={`Switch to ${localeOption}`}
          >
            {LOCALE_LABELS[localeOption] ?? localeOption.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
