import { useSyncExternalStore } from 'react';
import type { DeskObjectKey } from '../scene/types';

export type DeskMode = 'reading' | 'pending' | 'on';

export type DeskPanel = 'experience' | 'projects' | 'about' | 'education' | 'contact' | 'cv';

export interface DeskState {
  mode: DeskMode;
  available: boolean;
  lid: boolean;
  panel: DeskPanel | null;
  chat: boolean;
}

const STORAGE_KEY = 'desk-mode';

const SECTION_PANEL: Record<string, DeskPanel> = {
  experience: 'experience',
  projects: 'projects',
  contributions: 'projects',
  github: 'projects',
  about: 'about',
  stack: 'about',
  testimonials: 'about',
  'ask-ai': 'about',
  education: 'education',
  certifications: 'education',
  contact: 'contact',
  cv: 'cv',
};

export const OBJECT_PANEL: Partial<Record<DeskObjectKey, DeskPanel>> = {
  badge: 'experience',
  mate: 'about',
  thermos: 'about',
  notebook: 'education',
  phone: 'contact',
  sheet: 'cv',
};

const IDLE: DeskState = {
  mode: 'reading',
  available: false,
  lid: false,
  panel: null,
  chat: false,
};

let state: DeskState = IDLE;
const listeners = new Set<() => void>();

function reflect() {
  if (typeof document === 'undefined') return;
  const { dataset } = document.documentElement;
  if (state.mode === 'reading') delete dataset.desk;
  else dataset.desk = state.mode;
  if (state.mode === 'on' && state.panel) dataset.deskPanel = state.panel;
  else delete dataset.deskPanel;
  if (state.mode === 'on' && state.chat) dataset.deskChat = 'true';
  else delete dataset.deskChat;
}

function commit(next: Partial<DeskState>) {
  state = { ...state, ...next };
  reflect();
  for (const listener of listeners) listener();
}

function writeHash(panel: DeskPanel | null) {
  const { pathname, search } = window.location;
  window.history.replaceState(
    window.history.state,
    '',
    `${pathname}${search}${panel ? `#${panel}` : ''}`,
  );
}

export function panelFromHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  return SECTION_PANEL[id] ?? null;
}

export function canRenderDesk() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2'));
  } catch {
    return false;
  }
}

export function prefersDesk() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'reading') return false;
    if (stored === 'desk') return true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (connection?.saveData) return false;
    return !/bot|crawl|spider|lighthouse|headless/i.test(navigator.userAgent);
  } catch {
    return false;
  }
}

function remember(mode: 'desk' | 'reading') {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    return;
  }
}

export const deskStore = {
  getState: () => state,
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  boot() {
    const available = canRenderDesk();
    const panel = panelFromHash();
    commit({
      available,
      mode: available && prefersDesk() ? 'pending' : 'reading',
      panel,
      lid: Boolean(panel),
      chat: false,
    });
  },
  shutdown() {
    commit(IDLE);
  },
  ready() {
    if (state.mode === 'pending') commit({ mode: 'on' });
  },
  fail() {
    commit({ mode: 'reading', available: false });
  },
  enter() {
    if (!state.available) return;
    remember('desk');
    window.scrollTo({ top: 0, behavior: 'instant' });
    const panel = panelFromHash();
    commit({ mode: 'pending', panel, lid: Boolean(panel) });
  },
  leave() {
    remember('reading');
    const { panel } = state;
    commit({ mode: 'reading', panel: null, chat: false });
    if (panel) document.getElementById(panel)?.scrollIntoView({ behavior: 'instant' });
  },
  openLid() {
    commit({ lid: true });
  },
  closeLid() {
    writeHash(null);
    commit({ lid: false, panel: null });
  },
  openPanel(panel: DeskPanel) {
    writeHash(panel);
    commit({ panel, lid: true });
  },
  closePanel() {
    writeHash(null);
    commit({ panel: null });
  },
  syncHash() {
    if (state.mode === 'reading') return;
    const panel = panelFromHash();
    if (panel === state.panel) return;
    commit({ panel, lid: state.lid || Boolean(panel) });
  },
  setChat(chat: boolean) {
    if (state.chat === chat) return;
    commit(chat ? { chat, lid: true } : { chat });
  },
};

const serverSnapshot = () => IDLE;

export function useDesk() {
  return useSyncExternalStore(deskStore.subscribe, deskStore.getState, serverSnapshot);
}
