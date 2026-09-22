'use client';

import { DockBotIcon } from '@/features/assistant/ui/dock-bot-icon';
import { FloatingChat } from '@/features/assistant/widgets/floating-chat';
import { Link, usePathname } from '@/i18n/navigation';
import { Grain } from '@/shared/components/grain';
import { SilkParallax } from '@/shared/components/silk-parallax';
import { Dock as DockBar, useDockAutoHide } from '@/shared/components/ui/dock';
import { cn } from '@/shared/lib/cn';

import {
  Briefcase01Icon,
  Folder01Icon,
  Home01Icon,
  Mail01Icon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const SECTION_IDS = ['experience', 'projects', 'about', 'contact'] as const;

const SECTION_ICONS: Record<string, ReactNode> = {
  experience: <HugeiconsIcon icon={Briefcase01Icon} strokeWidth={1.5} />,
  projects: <HugeiconsIcon icon={Folder01Icon} strokeWidth={1.5} />,
  about: <HugeiconsIcon icon={UserIcon} strokeWidth={1.5} />,
  contact: <HugeiconsIcon icon={Mail01Icon} strokeWidth={1.5} />,
};

interface DockItem {
  key: string;
  label: string;
  icon: ReactNode;
  href?: string;
  sectionId?: string;
}

export function Dock() {
  const pathname = usePathname();
  const t = useTranslations('ui');
  const tChat = useTranslations('components.chat.header');
  const sectionLabels = useMemo(() => t.raw('sectionIndex') as Record<string, string>, [t]);
  const navigation = useMemo(
    () => t.raw('navigation') as Array<{ label: string; href: string }>,
    [t],
  );

  const items = useMemo<DockItem[]>(() => {
    const home = navigation[0];
    return [
      {
        key: 'home',
        label: home?.label ?? 'home',
        href: '/',
        icon: <HugeiconsIcon icon={Home01Icon} strokeWidth={1.5} />,
      },
      ...SECTION_IDS.map((id) => ({
        key: id,
        label: sectionLabels[id] ?? id,
        href: `/#${id}`,
        sectionId: id,
        icon: SECTION_ICONS[id],
      })),
    ];
  }, [navigation, sectionLabels]);

  const assistantLabel =
    navigation.find((item) => item.href === '/assistant')?.label ?? 'assistant';

  const [activeSection, setActiveSection] = useState<string>('/');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const autoHidden = useDockAutoHide();
  // Matches the breakpoint that opens up --chat-inset in globals.css.
  const [isDesktop, setIsDesktop] = useState(false);
  const assistantButtonRef = useRef<HTMLButtonElement>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);
  const chatWasOpen = useRef(false);
  const urlSynced = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 64rem)');
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsChatOpen(params.get('chat') === 'open');
    urlSynced.current = true;
  }, [pathname]);

  useEffect(() => {
    if (!urlSynced.current) return;
    const url = new URL(window.location.href);
    if (isChatOpen) {
      url.searchParams.set('chat', 'open');
    } else {
      url.searchParams.delete('chat');
    }
    window.history.replaceState(window.history.state, '', url);
  }, [isChatOpen]);

  useEffect(() => {
    const handleOpenChat = () => {
      setIsChatOpen(true);
    };
    window.addEventListener('open-chat', handleOpenChat);
    return () => {
      window.removeEventListener('open-chat', handleOpenChat);
    };
  }, []);

  useEffect(() => {
    // Docked, the page stays scrollable next to the rail; only the mobile
    // sheet, which covers everything, locks the body.
    const lockScroll = isChatOpen && !isDesktop;
    const shell = document.getElementById('app-shell');
    document.body.style.overflow = lockScroll ? 'hidden' : '';
    shell?.toggleAttribute('inert', lockScroll);
    return () => {
      document.body.style.overflow = '';
      shell?.removeAttribute('inert');
    };
  }, [isChatOpen, isDesktop]);

  useEffect(() => {
    if (!isChatOpen) {
      if (chatWasOpen.current) {
        chatWasOpen.current = false;
        assistantButtonRef.current?.focus();
      }
      return;
    }

    chatWasOpen.current = true;

    const frame = requestAnimationFrame(() => {
      if (!isDesktop) chatPanelRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const dialogs = document.querySelectorAll('[role="dialog"]');
      if (dialogs[dialogs.length - 1] !== chatPanelRef.current) return;
      setIsChatOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isChatOpen, isDesktop]);

  useEffect(() => {
    const root = document.documentElement;
    if (isChatOpen) {
      root.dataset.chatDocked = 'true';
    } else {
      delete root.dataset.chatDocked;
    }
    return () => {
      delete root.dataset.chatDocked;
    };
  }, [isChatOpen]);

  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection(pathname);
      return;
    }

    const cover = document.querySelector<HTMLElement>('.reveal-cover');
    let frame = 0;

    const measure = () => {
      frame = 0;
      if (window.scrollY < 80) {
        setActiveSection('/');
        return;
      }
      if (cover && cover.getBoundingClientRect().bottom < window.innerHeight * 0.55) {
        setActiveSection('/#contact');
        return;
      }
      const line = window.innerHeight * 0.4;
      let current = '/';
      for (const id of SECTION_IDS) {
        if (id === 'contact') continue;
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = `/#${id}`;
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  const chatPanel = mounted
    ? createPortal(
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              key="chat-panel"
              ref={chatPanelRef}
              role="dialog"
              aria-modal={!isDesktop}
              aria-label={tChat('panelLabel')}
              tabIndex={-1}
              initial={isDesktop ? { x: '115%' } : { opacity: 0, y: 24 }}
              animate={isDesktop ? { x: 0 } : { opacity: 1, y: 0 }}
              exit={isDesktop ? { x: '115%' } : { opacity: 0, y: 24 }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 320,
                delay: isDesktop ? 0.12 : 0,
              }}
              style={{ zIndex: 11000000 }}
              className={cn(
                'chat-rail fixed inset-0 flex flex-col overflow-hidden focus:outline-none',
                // Docked: the same floating panel as the hero, mirrored.
                'lg:inset-y-4 lg:right-4 lg:left-auto',
                'lg:w-[calc(var(--chat-panel-width)-2rem)]',
              )}
            >
              <div className="hero-waves chat-rail-waves" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <SilkParallax />
              <FloatingChat onClose={() => setIsChatOpen(false)} autoFocusInput={isDesktop} />
              <Grain className="grain-inset" />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )
    : null;

  return (
    <>
      {chatPanel}
      <div className="dock-nav">
        <DockBar floating={false} hidden={autoHidden && !isChatOpen} label="Main Navigation">
          {items.map((item) => (
            <DockBar.Item
              key={item.key}
              label={item.label}
              active={activeSection === item.href}
              asChild
            >
              <Link href={item.href ?? '/'}>{item.icon}</Link>
            </DockBar.Item>
          ))}
        </DockBar>
        <DockBar floating={false} hidden={autoHidden && !isChatOpen} label={assistantLabel}>
          <DockBar.Item
            ref={assistantButtonRef}
            label={assistantLabel}
            active={isChatOpen}
            onClick={() => setIsChatOpen((prev) => !prev)}
          >
            <DockBotIcon />
          </DockBar.Item>
        </DockBar>
      </div>
    </>
  );
}
