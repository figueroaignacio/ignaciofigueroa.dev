'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import { Button } from '@/shared/components/ui/button';
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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleLocaleChange(localeOption as Locale)}
            disabled={isPending || locale === localeOption}
            aria-current={locale === localeOption ? 'true' : undefined}
            aria-label={`Switch to ${localeOption}`}
            className={
              locale === localeOption
                ? 'h-auto px-1.5 py-0.5 font-mono text-xs text-foreground disabled:opacity-100'
                : 'h-auto px-1.5 py-0.5 font-mono text-xs text-muted-foreground hover:text-foreground'
            }
          >
            {LOCALE_LABELS[localeOption] ?? localeOption.toUpperCase()}
          </Button>
        </span>
      ))}
    </div>
  );
}
