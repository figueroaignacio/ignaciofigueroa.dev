'use client';

import { XIcon } from '@/shared/components/icons';
import { useTheme } from 'nach-themes';
import { useTranslations } from 'next-intl';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { deskStore, OBJECT_PANEL, PANEL_OBJECT, useDesk } from '../lib/desk-store';
import type { DeskScene } from '../scene/desk-scene';
import type { DeskObjectKey, DeskView, SceneState } from '../scene/types';

const LABELLED: DeskObjectKey[] = ['laptop', 'ask', 'mate', 'badge', 'notebook', 'phone', 'sheet'];

const ASSETS = {
  photo: '/images/profile-photo-2026.webp',
  react: '/images/desk/react.svg',
  claude: '/images/desk/claude-code.svg',
  linux: '/images/desk/linux.svg',
};

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

export function DeskStage() {
  const desk = useDesk();
  const t = useTranslations('ui');
  const tHome = useTranslations('sections.home');
  const { resolvedTheme } = useTheme();
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<DeskScene | null>(null);
  const labelRefs = useRef<Partial<Record<DeskObjectKey, HTMLSpanElement | null>>>({});
  const [hover, setHover] = useState<DeskObjectKey | null>(null);
  const [focused, setFocused] = useState<DeskObjectKey | null>(null);
  const [coarse, setCoarse] = useState(false);
  const [still, setStill] = useState(false);

  const active = desk.mode !== 'reading';
  const browsing = desk.mode === 'on' && !desk.panel && !desk.chat;

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
    }),
    [t],
  );

  const sceneState = useMemo<SceneState>(() => {
    const view: DeskView = !desk.lid
      ? 'top'
      : desk.chat || desk.panel === 'projects'
        ? 'screen'
        : desk.panel
          ? 'focus'
          : 'desk';
    return {
      lid: desk.lid,
      view,
      focus: desk.panel ? PANEL_OBJECT[desk.panel] : null,
      hover: focused,
      theme: resolvedTheme === 'light' ? 'light' : 'dark',
      still,
    };
  }, [desk.lid, desk.chat, desk.panel, focused, resolvedTheme, still]);

  const stateRef = useRef(sceneState);
  stateRef.current = sceneState;

  const shownRef = useRef<DeskObjectKey[]>([]);
  shownRef.current =
    !browsing || !desk.lid
      ? []
      : coarse
        ? LABELLED
        : hover
          ? [hover === 'thermos' ? 'mate' : hover]
          : [];

  useLayoutEffect(() => {
    deskStore.boot();
    return () => deskStore.shutdown();
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
        onFrame: paintLabels,
      });
      sceneRef.current = scene;
      scene.update(stateRef.current);
      observer = new ResizeObserver(() => scene?.resize(stage.clientWidth, stage.clientHeight));
      observer.observe(stage);
      scene.resize(stage.clientWidth, stage.clientHeight);
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
    };
  }, [active, t, tHome]);

  useEffect(() => {
    sceneRef.current?.update(sceneState);
  }, [sceneState]);

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
    const host = document.querySelector<HTMLElement>(
      desk.panel === 'contact' ? '#app-shell > .reveal' : '.desk-host',
    );
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

      <div className="desk-head">
        <p role="heading" aria-level={1} className="desk-name">
          {tHome('name')}
          <span aria-hidden="true" />
        </p>
        <p className="desk-lead">{tHome('lead')}</p>
      </div>

      {desk.mode === 'on' && (
        <nav aria-label={t('desk.objects')} className="desk-objects">
          {LABELLED.map((key) => (
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
            {labels[key]}
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
              {t('desk.closeLaptop')}
            </button>
          )}
          <button type="button" onClick={deskStore.leave}>
            {t('desk.readingMode')}
          </button>
        </div>
      )}

      {desk.mode === 'on' && desk.panel && (
        <button
          type="button"
          className="desk-close"
          data-panel={desk.panel}
          aria-label={t('desk.close')}
          onClick={deskStore.closePanel}
        >
          <XIcon size={18} />
          <kbd>esc</kbd>
        </button>
      )}
    </div>
  );
}
