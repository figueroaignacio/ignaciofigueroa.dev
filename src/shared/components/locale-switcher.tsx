'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';

import type { Locale } from 'next-intl';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { Tick01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

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

  const getLocaleLabel = (code: string) => {
    return LOCALE_LABELS[code] || code.toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="Change language">
        <span className="text-xs">{getLocaleLabel(locale)}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {locales.map((localeOption) => (
          <DropdownMenuItem
            key={localeOption}
            onClick={() => handleLocaleChange(localeOption as Locale)}
            disabled={isPending}
            className="justify-between"
          >
            <span className={locale === localeOption ? 'font-medium' : ''}>
              {getLocaleLabel(localeOption)}
            </span>
            {locale === localeOption && (
              <HugeiconsIcon icon={Tick01Icon} className="text-foreground ml-2 h-3.5 w-3.5" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
