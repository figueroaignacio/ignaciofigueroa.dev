'use client';

import { DockBotIcon } from '@/features/assistant/ui/dock-bot-icon';
import { FloatingChat } from '@/features/assistant/widgets/floating-chat';
import { Link, usePathname } from '@/i18n/navigation';
import { Grain } from '@/shared/components/grain';
import { SilkParallax } from '@/shared/components/silk-parallax';
import { Tooltip } from '@/shared/components/ui/tooltip';
import { cn } from '@/shared/lib/cn';

import {
  Analytics01Icon,
  Briefcase01Icon,
  Folder01Icon,
  Home01Icon,
  LayersIcon,
  Mail01Icon,
  MortarboardIcon,
  QuoteDownIcon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const SECTION_IDS = [
  'experience',
  'projects',
  'education',
  'stack',
  'about',
  'github',
  'testimonials',
  'contact',
] as const;

const SECTION_ICONS: Record<string, ReactNode> = {
  experience: <HugeiconsIcon icon={Briefcase01Icon} className="size-[18px]" strokeWidth={1.5} />,
  projects: <HugeiconsIcon icon={Folder01Icon} className="size-[18px]" strokeWidth={1.5} />,
  education: <HugeiconsIcon icon={MortarboardIcon} className="size-[18px]" strokeWidth={1.5} />,
  stack: <HugeiconsIcon icon={LayersIcon} className="size-[18px]" strokeWidth={1.5} />,
  about: <HugeiconsIcon icon={UserIcon} className="size-[18px]" strokeWidth={1.5} />,
  github: <HugeiconsIcon icon={Analytics01Icon} className="size-[18px]" strokeWidth={1.5} />,
  testimonials: <HugeiconsIcon icon={QuoteDownIcon} className="size-[18px]" strokeWidth={1.5} />,
  contact: <HugeiconsIcon icon={Mail01Icon} className="size-[18px]" strokeWidth={1.5} />,
};

interface DockItem {
  key: string;
  label: string;
  icon: ReactNode;
  href?: string;
  sectionId?: string;
}

const itemClass = cn(
  'group relative flex size-8 shrink-0 items-center justify-center rounded-lg sm:size-9',
  'transition-colors duration-150 ease-out',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
);

const iconClass = 'dock-icon relative z-10 group-hover:scale-125 group-active:scale-95';

const ENTRY_SPRING = { type: 'spring' as const, damping: 26, stiffness: 360 };

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
        icon: <HugeiconsIcon icon={Home01Icon} className="size-[18px]" strokeWidth={1.5} />,
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
  const [isHidden, setIsHidden] = useState(false);
  // Matches the breakpoint that opens up --chat-inset in globals.css.
  const [isDesktop, setIsDesktop] = useState(false);
  const assistantButtonRef = useRef<HTMLButtonElement>(null);
  const chatPanelRef = useRef<HTMLDivElement>(null);
  const chatWasOpen = useRef(false);

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
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < 8) return;
      lastY = y;
      setIsHidden(delta > 0 && y > 240);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsChatOpen(params.get('chat') === 'open');
  }, [pathname]);

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
                'chat-rail fixed inset-0 flex flex-col overflow-hidden bg-background focus:outline-none',
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
      <nav
        className="dock-nav"
        aria-label="Main Navigation"
        onFocusCapture={() => setIsHidden(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: isHidden && !isChatOpen ? 128 : 0, scale: 1 }}
          transition={{ type: 'spring', damping: 28, stiffness: 340, delay: 0.1 }}
          className={cn(
            'flex min-w-0 items-center gap-0.5',
            'overflow-x-auto scrollbar-none sm:overflow-x-visible',
            'rounded-2xl border border-border/80 px-1.5 py-1.5',
            'bg-background/98 supports-backdrop-filter:bg-background/88',
            'backdrop-blur-2xl backdrop-saturate-150',
            'shadow-[0_24px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.5)]',
          )}
        >
          {items.map((item, index) => {
            const active = activeSection === item.href;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ...ENTRY_SPRING, delay: 0.15 + index * 0.035 }}
              >
                <Tooltip delayDuration={120}>
                  <Tooltip.Trigger asChild>
                    <Link
                      href={item.href ?? '/'}
                      aria-label={item.label}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        itemClass,
                        active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="dock-indicator"
                          className="absolute inset-0 rounded-lg border border-border/50 bg-secondary/85"
                          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                          aria-hidden="true"
                        />
                      )}
                      <span className={iconClass} aria-hidden="true">
                        {item.icon}
                      </span>
                    </Link>
                  </Tooltip.Trigger>
                  <Tooltip.Content className="font-mono text-[11px]">{item.label}</Tooltip.Content>
                </Tooltip>
              </motion.div>
            );
          })}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: isHidden && !isChatOpen ? 128 : 0, scale: 1 }}
          transition={{ type: 'spring', damping: 28, stiffness: 340, delay: 0.18 }}
          className={cn(
            'flex shrink-0 items-center rounded-2xl border border-border/80 p-1.5',
            'bg-background/98 supports-backdrop-filter:bg-background/88',
            'backdrop-blur-2xl backdrop-saturate-150',
            'shadow-[0_24px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.5)]',
          )}
        >
          <Tooltip delayDuration={120}>
            <Tooltip.Trigger asChild>
              <button
                ref={assistantButtonRef}
                type="button"
                onClick={() => setIsChatOpen((prev) => !prev)}
                aria-label={assistantLabel}
                aria-pressed={isChatOpen}
                className={cn(
                  itemClass,
                  isChatOpen ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {isChatOpen && (
                  <motion.span
                    layoutId="assistant-indicator"
                    className="absolute inset-0 rounded-lg border border-border/50 bg-secondary/85"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    aria-hidden="true"
                  />
                )}
                <span className={iconClass} aria-hidden="true">
                  <DockBotIcon />
                </span>
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content className="font-mono text-[11px]">{assistantLabel}</Tooltip.Content>
          </Tooltip>
        </motion.div>
      </nav>
    </>
  );
}
