'use client';

import { useTheme } from 'nach-themes';
import { useTranslations } from 'next-intl';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  deskStore,
  isLaptopPanel,
  OBJECT_PANEL,
  panelExists,
  useDesk,
  type DeskPanel,
} from '../lib/desk-store';
import { pathLabel } from '../lib/path-label';
import { quadFacesViewer, quadTransform } from '../lib/screen-matrix';
import type { DeskScene } from '../scene/desk-scene';
import type { DeskObjectKey, DeskView, SceneState, ScreenRect } from '../scene/types';

const LABELLED: DeskObjectKey[] = [
  'laptop',
  'ask',
  'mate',
  'badge',
  'notebook',
  'phone',
  'sheet',
  'books',
  'photos',
  'board',
];

const PEOPLE = ['joseph', 'kiefer', 'manuel', 'pia'].map(
  (name) => `/images/testimonials/${name}.jpg`,
);

function absentObjects() {
  return (Object.keys(OBJECT_PANEL) as DeskObjectKey[]).filter((key) => {
    const panel = OBJECT_PANEL[key];
    return panel ? !panelExists(panel) : false;
  });
}

const ASSETS = {
  photo: '/images/profile-photo-2026.webp',
  react: '/images/desk/react.svg',
  claude: '/images/desk/claude-code.svg',
  linux: '/images/desk/linux.svg',
  people: PEOPLE,
};

type Surface = DeskPanel | 'chat';

function fontsReady(families: string[]) {
  const loads = families.flatMap((family) =>
    ['400', '500', '700', '800'].map((weight) => document.fonts.load(`${weight} 20px ${family}`)),
  );
  const timeout = new Promise((resolve) => window.setTimeout(resolve, 1500));
  return Promise.race([Promise.allSettled(loads), timeout]);
}

function select(key: DeskObjectKey, scene: DeskScene | null) {
  const { lid } = deskStore.getState();
  if (key === 'laptop') {
    if (lid) deskStore.openPanel('projects');
    else deskStore.openLid();
    return;
  }
  if (key === 'ask') {
    scene?.pressAsk();
    window.dispatchEvent(new Event('open-chat'));
    return;
  }
  const panel = OBJECT_PANEL[key];
  if (panel) deskStore.openPanel(panel);
}

function surfaceNode(surface: Surface) {
  if (surface === 'chat') return document.querySelector<HTMLElement>('.chat-rail');
  return document.querySelector<HTMLElement>('.desk-host');
}

function release(node: HTMLElement | null) {
  if (!node) return;
  node.style.transform = '';
  node.style.width = '';
  node.style.height = '';
  node.style.visibility = '';
}

export function DeskStage() {
  const desk = useDesk();
  const t = useTranslations('ui');
  const tHome = useTranslations('sections.home');
  const { resolvedTheme } = useTheme();
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<DeskScene | null>(null);
  const labelRefs = useRef<Partial<Record<DeskObjectKey, HTMLSpanElement | null>>>({});
  const gluedRef = useRef<HTMLElement | null>(null);
  const [hover, setHover] = useState<DeskObjectKey | null>(null);
  const [focused, setFocused] = useState<DeskObjectKey | null>(null);
  const [coarse, setCoarse] = useState(false);
  const [still, setStill] = useState(false);
  const [rest, setRest] = useState<ScreenRect | null>(null);
  const [absent, setAbsent] = useState<DeskObjectKey[]>([]);

  const active = desk.mode !== 'reading';
  const browsing = desk.mode === 'on' && !desk.panel && !desk.chat;
  const screenPanel = desk.panel && isLaptopPanel(desk.panel) ? desk.panel : null;
  const surface: Surface | null = desk.mode !== 'on' ? null : desk.chat ? 'chat' : screenPanel;
  const onScreen = rest !== null;

  const labels = useMemo<Record<DeskObjectKey, string>>(
    () => ({
      laptop: t('sectionIndex.projects'),
      ask: t('desk.ask'),
      mate: t('sectionIndex.about'),
      thermos: t('sectionIndex.about'),
      badge: t('sectionIndex.experience'),
      notebook: t('sectionIndex.education'),
      phone: t('sectionIndex.contact'),
      sheet: t('desk.cv'),
      books: t('sectionIndex.stack'),
      photos: t('sectionIndex.testimonials'),
      board: t('desk.contributions'),
    }),
    [t],
  );

  const sceneState = useMemo<SceneState>(() => {
    const onLaptop = desk.chat || Boolean(screenPanel);
    const view: DeskView = !desk.lid ? 'top' : onLaptop ? 'screen' : 'desk';
    return {
      lid: desk.lid,
      view,
      covered: onScreen && onLaptop,
      absent,
      hover: focused,
      theme: resolvedTheme === 'light' ? 'light' : 'dark',
      still,
    };
  }, [absent, desk.lid, desk.chat, screenPanel, focused, onScreen, resolvedTheme, still]);

  const reachable = useMemo(() => LABELLED.filter((key) => !absent.includes(key)), [absent]);

  const stateRef = useRef(sceneState);
  stateRef.current = sceneState;

  const shownRef = useRef<DeskObjectKey[]>([]);
  shownRef.current =
    !browsing || !desk.lid
      ? []
      : coarse
        ? reachable
        : hover
          ? [hover === 'thermos' ? 'mate' : hover]
          : [];

  const glueRef = useRef<{ surface: Surface | null; rest: ScreenRect | null }>({
    surface: null,
    rest: null,
  });
  glueRef.current = { surface, rest };

  useLayoutEffect(() => {
    deskStore.boot();
    return () => deskStore.shutdown();
  }, []);

  useEffect(() => {
    const host = document.querySelector('.desk-host');
    const sync = () => {
      const next = absentObjects();
      setAbsent((current) => (current.join() === next.join() ? current : next));
    };
    sync();
    if (!host) return;
    const observer = new MutationObserver(sync);
    observer.observe(host, { childList: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pointer = window.matchMedia('(pointer: coarse)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      setCoarse(pointer.matches);
      setStill(motion.matches);
    };
    sync();
    pointer.addEventListener('change', sync);
    motion.addEventListener('change', sync);
    return () => {
      pointer.removeEventListener('change', sync);
      motion.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    let cancelled = false;
    let scene: DeskScene | null = null;
    let observer: ResizeObserver | null = null;

    const paintLabels = () => {
      if (!scene) return;
      for (const key of LABELLED) {
        const node = labelRefs.current[key];
        if (!node) continue;
        if (!shownRef.current.includes(key)) {
          node.style.opacity = '0';
          continue;
        }
        const point = scene.project(key);
        node.style.opacity = point.visible ? '1' : '0';
        node.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -100%)`;
      }
    };

    const glue = () => {
      const { surface: current, rest: size } = glueRef.current;
      if (!scene || !current || !size) return;
      let node = gluedRef.current;
      if (!node || !node.isConnected) {
        node = surfaceNode(current);
        gluedRef.current = node;
        if (!node) return;
        node.style.width = `${size.width}px`;
        node.style.height = `${size.height}px`;
      }
      const quad = scene.screenQuad();
      if (!quad || !quadFacesViewer(quad)) {
        node.style.visibility = 'hidden';
        return;
      }
      node.style.visibility = '';
      node.style.transform = quadTransform(size.width, size.height, quad);
    };

    const measure = () => {
      if (!scene) return;
      scene.resize(stage.clientWidth, stage.clientHeight);
      setRest(scene.isWide() && stage.clientWidth >= 1024 ? scene.screenRest() : null);
    };

    const start = async () => {
      const style = getComputedStyle(document.body);
      const fonts = {
        sans: style.getPropertyValue('--font-hanken').trim() || 'sans-serif',
        mono: style.getPropertyValue('--font-dm-mono').trim() || 'monospace',
      };
      const [{ DeskScene: Scene }] = await Promise.all([
        import('../scene/desk-scene'),
        fontsReady([fonts.sans, fonts.mono]),
      ]);
      if (cancelled) return;
      scene = new Scene({
        canvas,
        fonts,
        assets: ASSETS,
        strings: {
          openTag: t('desk.open'),
          name: tHome('name'),
          role: tHome('title'),
          city: tHome('status.city'),
          message: t('desk.message'),
        },
        onHover: setHover,
        onSelect: (key) => select(key, scene),
        onDismiss: () => {
          if (deskStore.getState().panel) deskStore.closePanel();
        },
        onFrame: () => {
          paintLabels();
          glue();
        },
      });
      sceneRef.current = scene;
      scene.update(stateRef.current);
      observer = new ResizeObserver(measure);
      observer.observe(stage);
      measure();
      deskStore.ready();
    };

    start().catch(() => {
      if (!cancelled) deskStore.fail();
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      scene?.dispose();
      sceneRef.current = null;
      setHover(null);
      setRest(null);
    };
  }, [active, t, tHome]);

  useEffect(() => {
    sceneRef.current?.update(sceneState);
  }, [sceneState]);

  useEffect(() => {
    const root = document.documentElement;
    if (desk.mode === 'on') root.dataset.deskFit = onScreen ? 'screen' : 'sheet';
    return () => {
      delete root.dataset.deskFit;
    };
  }, [desk.mode, onScreen]);

  useEffect(() => {
    release(gluedRef.current);
    gluedRef.current = null;
    sceneRef.current?.update(stateRef.current);
    return () => {
      release(gluedRef.current);
      gluedRef.current = null;
    };
  }, [surface, rest]);

  useEffect(() => {
    if (desk.mode !== 'on') return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const state = deskStore.getState();
      if (event.key === 'Escape') {
        if (state.chat) return;
        if (state.panel) deskStore.closePanel();
        else if (state.lid) deskStore.closeLid();
        return;
      }
      if (event.key !== 'Enter' || state.lid) return;
      if (event.target === document.body || event.target === document.documentElement) {
        deskStore.openLid();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('hashchange', deskStore.syncHash);
    window.addEventListener('popstate', deskStore.syncHash);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('hashchange', deskStore.syncHash);
      window.removeEventListener('popstate', deskStore.syncHash);
    };
  }, [desk.mode]);

  useEffect(() => {
    if (desk.mode !== 'on' || !desk.panel) return;
    const host = isLaptopPanel(desk.panel)
      ? surfaceNode(desk.panel)
      : document.querySelector<HTMLElement>('.desk-object');
    if (!host) return;
    host.scrollTop = 0;
    host.tabIndex = -1;
    const timer = window.setTimeout(() => host.focus({ preventScroll: true }), 450);
    return () => {
      window.clearTimeout(timer);
      host.removeAttribute('tabindex');
    };
  }, [desk.mode, desk.panel]);

  return (
    <div
      ref={stageRef}
      className="desk-stage"
      data-lid={desk.lid ? 'open' : 'closed'}
      data-busy={browsing ? undefined : 'true'}
    >
      <canvas ref={canvasRef} className="desk-canvas" aria-hidden="true" />
      <div className="desk-vignette" aria-hidden="true" />

      <div className="desk-head">
        <p role="heading" aria-level={1} className="desk-name">
          {tHome('name')}
          <span aria-hidden="true" />
        </p>
        <p className="desk-lead">{tHome('lead')}</p>
      </div>

      {desk.mode === 'on' && (
        <nav aria-label={t('desk.objects')} className="desk-objects">
          {reachable.map((key) => (
            <button
              key={key}
              type="button"
              tabIndex={browsing ? 0 : -1}
              onFocus={() => setFocused(key)}
              onBlur={() => setFocused(null)}
              onClick={() => select(key, sceneRef.current)}
            >
              {labels[key]}
            </button>
          ))}
        </nav>
      )}

      <div className="desk-labels" aria-hidden="true">
        {LABELLED.map((key) => (
          <span
            key={key}
            ref={(node) => {
              labelRefs.current[key] = node;
            }}
          >
            <i />
            {pathLabel(labels[key])}
          </span>
        ))}
      </div>

      {desk.mode === 'pending' && <p className="desk-note">{t('desk.loading')}</p>}

      {browsing && (
        <p className="desk-note">
          {desk.lid ? (
            <>
              <i aria-hidden="true" />
              {t('desk.objectsHint')}
            </>
          ) : (
            <>
              <kbd>enter</kbd>
              {t('desk.openHint')}
            </>
          )}
        </p>
      )}

      {browsing && (
        <div className="desk-actions">
          {desk.lid && (
            <button type="button" onClick={deskStore.closeLid}>
              {t('desk.closeLaptop').toLowerCase()}
            </button>
          )}
          <button type="button" onClick={deskStore.leave}>
            {t('desk.readingMode').toLowerCase()}
          </button>
        </div>
      )}
    </div>
  );
}
