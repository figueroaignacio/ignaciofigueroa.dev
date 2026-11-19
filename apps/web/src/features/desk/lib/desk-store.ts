import { useSyncExternalStore } from 'react';
import type { DeskObjectKey } from '../scene/types';

export type DeskMode = 'reading' | 'pending' | 'on';

export type DeskPanel =
  | 'experience'
  | 'projects'
  | 'about'
  | 'education'
  | 'contact'
  | 'cv'
  | 'contributions'
  | 'stack'
  | 'testimonials';

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
  contributions: 'contributions',
  github: 'contributions',
  about: 'about',
  stack: 'stack',
  testimonials: 'testimonials',
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
  books: 'stack',
  photos: 'testimonials',
  board: 'contributions',
};

const LAPTOP_PANELS: ReadonlySet<DeskPanel> = new Set([
  'projects',
  'about',
  'experience',
  'contributions',
  'cv',
]);

export function isLaptopPanel(panel: DeskPanel) {
  return LAPTOP_PANELS.has(panel);
}

export function panelExists(panel: DeskPanel) {
  return Object.entries(SECTION_PANEL).some(
    ([id, owner]) => owner === panel && document.getElementById(id) !== null,
  );
}

function opensLid(panel: DeskPanel | null) {
  return panel !== null && isLaptopPanel(panel);
}

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
    if (window.localStorage.getItem(STORAGE_KEY) === 'desk') return true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (connection?.saveData) return false;
    return !/bot|crawl|spider|lighthouse|headless/i.test(navigator.userAgent);
  } catch {
    return false;
  }
}

function remember(desk: boolean) {
  try {
    if (desk) window.localStorage.setItem(STORAGE_KEY, 'desk');
    else window.localStorage.removeItem(STORAGE_KEY);
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
      lid: opensLid(panel),
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
    remember(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
    const panel = panelFromHash();
    commit({ mode: 'pending', panel, lid: opensLid(panel) });
  },
  leave() {
    remember(false);
    const { panel } = state;
    commit({ mode: 'reading', panel: null, chat: false });
    if (panel) document.getElementById(panel)?.scrollIntoView({ behavior: 'instant' });
  },
  openLid() {
    commit({ lid: true });
  },
  closeLid() {
    writeHash(null);
    if (state.chat) window.dispatchEvent(new Event('close-chat'));
    commit({ lid: false, panel: null, chat: false });
  },
  openPanel(panel: DeskPanel) {
    writeHash(panel);
    if (state.chat) window.dispatchEvent(new Event('close-chat'));
    commit({ panel, chat: false, lid: state.lid || opensLid(panel) });
  },
  closePanel() {
    writeHash(null);
    commit({ panel: null });
  },
  syncHash() {
    if (state.mode === 'reading') return;
    const panel = panelFromHash();
    if (panel === state.panel) return;
    commit({ panel, lid: state.lid || opensLid(panel) });
  },
  setChat(chat: boolean) {
    if (state.chat === chat) return;
    if (!chat) {
      commit({ chat });
      return;
    }
    if (state.panel) writeHash(null);
    commit({ chat, panel: null, lid: true });
  },
};

const serverSnapshot = () => IDLE;

export function useDesk() {
  return useSyncExternalStore(deskStore.subscribe, deskStore.getState, serverSnapshot);
}
