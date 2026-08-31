'use client';

import { DockBotIcon } from '@/features/assistant/ui/dock-bot-icon';
import { FloatingChat } from '@/features/assistant/widgets/floating-chat';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/shared/lib/cn';

import { Home01Icon, Mail01Icon, UserIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const ICON_MAP: Record<string, ReactNode> = {
  '/': <HugeiconsIcon icon={Home01Icon} className="size-5" strokeWidth={1.5} />,
  '/#about': <HugeiconsIcon icon={UserIcon} className="size-5" strokeWidth={1.5} />,
  '/#contact': <HugeiconsIcon icon={Mail01Icon} className="size-5" strokeWidth={1.5} />,
  '/assistant': <DockBotIcon />,
};

export function Dock() {
  const pathname = usePathname();
  const t = useTranslations('ui');
  const tChat = useTranslations('components.chat.header');
  const navigation = useMemo(
    () => t.raw('navigation') as Array<{ label: string; href: string }>,
    [t],
  );

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

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'about') {
            setActiveSection('/#about');
          } else if (id === 'contact') {
            setActiveSection('/#contact');
          }
        }
      });
    };

    const handleScroll = () => {
      if (window.scrollY < 100) {
        setActiveSection('/');
      }
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const aboutEl = document.getElementById('about');
    const contactEl = document.getElementById('contact');

    if (aboutEl) observer.observe(aboutEl);
    if (contactEl) observer.observe(contactEl);
    window.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
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
              initial={isDesktop ? { x: '100%' } : { opacity: 0, y: 24 }}
              animate={isDesktop ? { x: 0 } : { opacity: 1, y: 0 }}
              exit={isDesktop ? { x: '100%' } : { opacity: 0, y: 24 }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              style={{ zIndex: 11000000 }}
              className={cn(
                'fixed inset-0 flex flex-col overflow-hidden bg-background focus:outline-none',
                // Docked: a full-height rail flush with the viewport edge, its
                // left border sitting directly against the pushed-over page.
                'lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[var(--chat-panel-width)]',
                'lg:border-l lg:border-border',
              )}
            >
              <FloatingChat onClose={() => setIsChatOpen(false)} autoFocusInput={isDesktop} />
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
        className="fixed bottom-6 z-50 -translate-x-1/2 w-max transition-[left] duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        /* Stays centered on the page, not the viewport, once the rail claims
           its slice. --chat-inset is 0 whenever the rail isn't docked. */
        style={{ left: 'calc(50% - var(--chat-inset) / 2)' }}
        aria-label="Main Navigation"
        onFocusCapture={() => setIsHidden(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: isHidden && !isChatOpen ? 128 : 0, scale: 1 }}
          transition={{ type: 'spring', damping: 28, stiffness: 340, delay: 0.1 }}
          className={cn(
            'flex items-center gap-1.5 rounded-2xl border border-border/80 px-2 py-2',
            'bg-background/98 supports-backdrop-filter:bg-background/88',
            'backdrop-blur-2xl backdrop-saturate-150',
            'shadow-[0_24px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.5)]',
          )}
        >
          {navigation.map((item) => {
            const isAssistant = item.href === '/assistant';
            const active = isAssistant ? isChatOpen : activeSection === item.href;

            const content = (
              <>
                <AnimatePresence>
                  {active && (
                    <motion.span
                      layoutId="dock-indicator"
                      className="absolute inset-0 rounded-xl bg-secondary/85 border border-border/50"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      aria-hidden="true"
                    />
                  )}
                </AnimatePresence>
                <span
                  className="relative z-10 transition-transform duration-150 group-hover:scale-110"
                  aria-hidden="true"
                >
                  {ICON_MAP[item.href] ?? (
                    <span className="text-sm font-semibold uppercase leading-none">
                      {item.label.charAt(0)}
                    </span>
                  )}
                </span>
                <span className="relative z-10 font-mono text-[11px] leading-none">
                  {item.label}
                </span>
              </>
            );

            const className = cn(
              'group relative flex flex-col items-center justify-center gap-1 rounded-xl px-5 py-2.5',
              'min-w-[56px] min-h-[52px]',
              'transition-all duration-150 ease-out',
              'active:scale-95',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
              active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              // Inset ring instead of a border so the assistant doesn't shift the row by 2px.
              isAssistant && 'ring-1 ring-inset ring-brand/45 hover:ring-brand',
            );

            if (isAssistant) {
              return (
                <button
                  key={item.href}
                  ref={assistantButtonRef}
                  type="button"
                  onClick={() => setIsChatOpen((prev) => !prev)}
                  aria-current={active ? 'page' : undefined}
                  className={className}
                >
                  {content}
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={className}
              >
                {content}
              </Link>
            );
          })}
        </motion.div>
      </nav>
    </>
  );
}
