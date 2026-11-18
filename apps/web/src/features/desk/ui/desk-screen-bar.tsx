'use client';

import { useTranslations } from 'next-intl';
import { deskStore, useDesk, type DeskPanel } from '../lib/desk-store';
import { pathLabel } from '../lib/path-label';

const APPS = ['projects', 'about', 'experience'] as const;

const PATH_KEY: Partial<Record<DeskPanel, string>> = {
  projects: 'sectionIndex.projects',
  about: 'sectionIndex.about',
  experience: 'sectionIndex.experience',
  contributions: 'desk.contributions',
  cv: 'desk.cv',
};

export function DeskScreenBar() {
  const desk = useDesk();
  const t = useTranslations('ui');

  const key = desk.panel ? PATH_KEY[desk.panel] : undefined;
  if (desk.mode !== 'on' || !key) return null;

  return (
    <div className="desk-bar">
      <span className="desk-pill">
        <i aria-hidden="true" />
        nacho@fedora
        <span className="text-muted-foreground">~{pathLabel(t(key)).slice(1)}</span>
      </span>
      <nav aria-label={t('desk.apps')} className="desk-pill desk-apps">
        {APPS.map((panel) => (
          <button
            key={panel}
            type="button"
            aria-current={desk.panel === panel ? 'page' : undefined}
            onClick={() => deskStore.openPanel(panel)}
          >
            {t(`sectionIndex.${panel}`)}
          </button>
        ))}
        <button type="button" onClick={() => window.dispatchEvent(new Event('open-chat'))}>
          {t('desk.ask')}
        </button>
      </nav>
      <button type="button" className="desk-pill" onClick={deskStore.closeLid}>
        {t('desk.closeLaptop').toLowerCase()}
        <kbd>esc</kbd>
      </button>
    </div>
  );
}
