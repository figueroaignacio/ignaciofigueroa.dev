'use client';

import { BoxIcon } from '@/shared/components/icons';
import { useTranslations } from 'next-intl';
import { deskStore, useDesk } from '../lib/desk-store';

export function DeskEnterLink({ className }: { className?: string }) {
  const desk = useDesk();
  const t = useTranslations('ui.desk');

  if (!desk.available || desk.mode !== 'reading') return null;

  return (
    <button type="button" className={className} onClick={deskStore.enter}>
      <BoxIcon
        size={16}
        className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5"
      />
      {t('deskMode')}
    </button>
  );
}
