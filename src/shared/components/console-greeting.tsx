'use client';

import { BASE_URL } from '@/shared/lib/constants';
import { CONTACT_EMAIL } from '@/shared/lib/schema';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

let printed = false;

const FACE = ['┌────────┐', '│  ●  ●  │', '│        │', '└────────┘'].join('\n');

export function ConsoleGreeting() {
  const t = useTranslations('components.console');

  useEffect(() => {
    if (printed) return;
    printed = true;

    const mono = 'font-family: monospace; line-height: 1.35;';

    console.log(`%c${FACE}`, `${mono} color: #E8845A;`);
    console.log(`%c${t('greeting')}`, `${mono} font-weight: bold;`);
    console.log(`%c${t('cta')} %c${CONTACT_EMAIL}`, mono, `${mono} font-weight: bold;`);
    console.log(`%c${t('hint')} %c${BASE_URL}/llms.txt`, mono, `${mono} font-weight: bold;`);
  }, [t]);

  return null;
}
