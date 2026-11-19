'use client';

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { deskStore } from '../lib/desk-store';

interface DeskObjectPanelProps {
  path: string;
  label: string;
  closeLabel?: string;
  children: ReactNode;
}

export function DeskObjectPanel({ path, label, closeLabel, children }: DeskObjectPanelProps) {
  const t = useTranslations('ui.desk');

  return (
    <section
      aria-label={label}
      className="desk-object dark"
      onClick={(event) => {
        if (event.target === event.currentTarget) deskStore.closePanel();
      }}
    >
      <header className="desk-object-bar">
        <span className="desk-pill">
          <i aria-hidden="true" />
          {path}
        </span>
        <button type="button" className="desk-pill" onClick={deskStore.closePanel}>
          {closeLabel ?? t('back')}
          <kbd>esc</kbd>
        </button>
      </header>
      {children}
    </section>
  );
}
