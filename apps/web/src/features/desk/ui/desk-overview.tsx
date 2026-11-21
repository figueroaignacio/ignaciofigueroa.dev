'use client';

import { DockBotIcon } from '@/features/assistant/ui/dock-bot-icon';
import { BriefcaseIcon, FolderIcon, GitMergeIcon, UserIcon } from '@/shared/components/icons';
import { useTranslations } from 'next-intl';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import type { DeskPanel } from '../lib/desk-store';

export type DeskApp = DeskPanel | 'ask';

export const DESK_APPS: DeskApp[] = ['projects', 'about', 'experience', 'contributions', 'ask'];

const APP_ICONS: Partial<Record<DeskApp, ReactNode>> = {
  projects: <FolderIcon strokeWidth={1.6} />,
  about: <UserIcon strokeWidth={1.6} />,
  experience: <BriefcaseIcon strokeWidth={1.6} />,
  contributions: <GitMergeIcon strokeWidth={1.6} />,
  ask: <DockBotIcon />,
};

interface DeskOverviewProps {
  active: DeskApp;
  windows: DeskApp[];
  height: number;
  name: (app: DeskApp) => string;
  title: (app: DeskApp) => string;
  onPick: (app: DeskApp) => void;
  onClose: () => void;
}

export function DeskOverview({
  active,
  windows,
  height,
  name,
  title,
  onPick,
  onClose,
}: DeskOverviewProps) {
  const t = useTranslations('ui.desk');
  const [query, setQuery] = useState('');
  const [grid, setGrid] = useState(false);
  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    search.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const needle = query.trim().toLocaleLowerCase();
  const matches = (app: DeskApp) => !needle || name(app).toLocaleLowerCase().includes(needle);
  const shownWindows = windows.filter(matches);
  const shownApps = DESK_APPS.filter(matches);

  return (
    <div
      className="desk-overview"
      style={{ blockSize: height }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <input
        ref={search}
        type="search"
        className="desk-overview-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t('search')}
        aria-label={t('search')}
      />

      {grid ? (
        <div className="desk-overview-apps">
          {shownApps.map((app) => (
            <button key={app} type="button" onClick={() => onPick(app)}>
              <span className="desk-app-tile" data-app={app}>
                {APP_ICONS[app]}
              </span>
              <span>{name(app)}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="desk-overview-windows">
          {shownWindows.map((app) => (
            <button
              key={app}
              type="button"
              aria-current={app === active ? 'page' : undefined}
              onClick={() => onPick(app)}
            >
              <span className="desk-window-thumb" aria-hidden="true">
                <i />
                <span className="desk-window-head">
                  <span className="desk-app-tile" data-app={app}>
                    {APP_ICONS[app]}
                  </span>
                  {name(app)}
                </span>
                <b />
                <b />
              </span>
              <span className="desk-window-label">{title(app)}</span>
            </button>
          ))}
        </div>
      )}

      {needle && shownApps.length === 0 && <p className="desk-overview-empty">{t('noResults')}</p>}

      <nav className="desk-dash" aria-label={t('dash')}>
        {DESK_APPS.map((app) => (
          <button
            key={app}
            type="button"
            aria-label={name(app)}
            title={name(app)}
            data-running={windows.includes(app) || undefined}
            aria-current={app === active ? 'page' : undefined}
            onClick={() => onPick(app)}
          >
            <span className="desk-app-tile" data-app={app}>
              {APP_ICONS[app]}
            </span>
          </button>
        ))}
        <span className="desk-dash-rule" aria-hidden="true" />
        <button
          type="button"
          aria-label={t('showApps')}
          title={t('showApps')}
          aria-pressed={grid}
          onClick={() => setGrid((value) => !value)}
        >
          <span className="desk-app-tile" data-app="grid">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="5" cy="5" r="1.8" />
              <circle cx="12" cy="5" r="1.8" />
              <circle cx="19" cy="5" r="1.8" />
              <circle cx="5" cy="12" r="1.8" />
              <circle cx="12" cy="12" r="1.8" />
              <circle cx="19" cy="12" r="1.8" />
              <circle cx="5" cy="19" r="1.8" />
              <circle cx="12" cy="19" r="1.8" />
              <circle cx="19" cy="19" r="1.8" />
            </svg>
          </span>
        </button>
      </nav>
    </div>
  );
}
