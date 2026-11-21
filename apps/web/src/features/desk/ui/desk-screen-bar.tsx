'use client';

import { HigoIcon } from '@/shared/components/icons';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { deskStore, useDesk, type DeskPanel } from '../lib/desk-store';

type Tab = DeskPanel | 'ask';

const TABS: Tab[] = ['projects', 'about', 'experience', 'ask'];

const TITLE_KEY: Partial<Record<Tab, string>> = {
  projects: 'sectionIndex.projects',
  about: 'sectionIndex.about',
  experience: 'sectionIndex.experience',
  contributions: 'desk.contributions',
  ask: 'desk.ask',
};

function capitalize(text: string) {
  return text.charAt(0).toLocaleUpperCase() + text.slice(1);
}

function Glyph({ d, size = 16 }: { d: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

function useClock(locale: string) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 20_000);
    return () => window.clearInterval(timer);
  }, []);
  const day = new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(now);
  const time = new Intl.DateTimeFormat(locale, { hour: '2-digit', minute: '2-digit' }).format(now);
  return `${day.replace(/\./g, '')}  ${time}`;
}

function openTab(tab: Tab) {
  if (tab === 'ask') window.dispatchEvent(new Event('open-chat'));
  else deskStore.openPanel(tab);
}

export function DeskScreenBar({ surface }: { surface: 'page' | 'chat' }) {
  const desk = useDesk();
  const t = useTranslations('ui');
  const tHome = useTranslations('sections.home');
  const locale = useLocale();
  const clock = useClock(locale);

  const active: Tab | null = desk.chat ? 'ask' : desk.panel;
  const shown =
    desk.mode === 'on' &&
    active !== null &&
    TITLE_KEY[active] !== undefined &&
    (surface === 'chat') === desk.chat;
  if (!shown || !active) return null;

  const tabs = TABS.includes(active) ? TABS : [...TABS.slice(0, 3), active, 'ask' as const];
  const title = (tab: Tab) => {
    const name = capitalize(t(TITLE_KEY[tab]!));
    return tab === 'ask' ? name : `${name} · ${tHome('name')}`;
  };
  const path = active === 'ask' ? `/${locale}?chat=open` : `/${locale}#${active}`;

  return (
    <div className="desk-browser">
      <div className="desk-topbar" aria-hidden="true">
        <span className="desk-workspaces">
          <HigoIcon className="desk-activities" />
          <i />
          <i />
        </span>
        <span>{clock}</span>
        <span className="desk-tray">
          <Glyph
            size={13}
            d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0M12 19.5h.01"
          />
          <Glyph size={13} d="M11 5 6 9H3v6h3l5 4zM16 9a4 4 0 0 1 0 6" />
          <span className="desk-battery">
            <i />
          </span>
          92 %
        </span>
      </div>

      <div className="desk-tabs">
        <nav aria-label={t('desk.apps')}>
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              aria-current={tab === active ? 'page' : undefined}
              onClick={() => openTab(tab)}
            >
              <HigoIcon className="desk-favicon" />
              <span className="truncate">{title(tab)}</span>
            </button>
          ))}
        </nav>
        <button
          type="button"
          className="desk-window-close"
          aria-label={t('desk.closeLaptop')}
          onClick={deskStore.closeLid}
        >
          <Glyph size={14} d="M6 6l12 12M18 6 6 18" />
        </button>
      </div>

      <div className="desk-toolbar">
        <span className="desk-nav-icons" aria-hidden="true">
          <Glyph size={17} d="M19 12H5M11 6l-6 6 6 6" />
          <Glyph size={17} d="M5 12h14M13 6l6 6-6 6" />
          <Glyph size={16} d="M20 12a8 8 0 1 1-2.4-5.7M20 4v5h-5" />
        </span>
        <span className="desk-address">
          <Glyph size={14} d="M7 11V8a5 5 0 0 1 10 0v3M5 11h14v9H5z" />
          <span className="truncate">
            ignaciofigueroa.dev<span className="text-muted-foreground">{path}</span>
          </span>
        </span>
        <Image
          src="/images/profile-photo-2026.webp"
          alt=""
          width={48}
          height={48}
          className="desk-avatar"
        />
      </div>
    </div>
  );
}
