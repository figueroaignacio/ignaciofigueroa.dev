'use client';

import { FloatingChat } from '@/features/assistant/components/floating-chat';
import { AssistantAvatar } from '@/features/assistant/components/ui/assistant-avatar';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/shared/lib/cn';

import { Home01Icon, Mail01Icon, UserIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

const ICON_MAP: Record<string, ReactNode> = {
  '/': <HugeiconsIcon icon={Home01Icon} className="size-5" strokeWidth={1.5} />,
  '/#about': <HugeiconsIcon icon={UserIcon} className="size-5" strokeWidth={1.5} />,
  '/#contact': <HugeiconsIcon icon={Mail01Icon} className="size-5" strokeWidth={1.5} />,
  '/assistant': <AssistantAvatar size="sm" className="scale-110" />,
};

export function Dock() {
  const pathname = usePathname();
  const t = useTranslations('ui');
  const navigation = useMemo(
    () => t.raw('navigation') as Array<{ label: string; href: string }>,
    [t],
  );

  const [activeSection, setActiveSection] = useState<string>('/');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('chat') === 'open') {
      setIsChatOpen(true);
    } else {
      setIsChatOpen(false);
      setIsChatExpanded(false);
    }
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
    document.body.style.overflow = isChatOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
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
            <>
              <motion.div
                key="chat-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsChatOpen(false)}
                style={{ zIndex: 10999999 }}
                className="fixed inset-0 bg-background/40  dark:bg-black/50"
              />
              <motion.div
                key="chat-panel"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                style={{ zIndex: 11000000 }}
                className={cn(
                  'fixed inset-0 flex flex-col overflow-hidden bg-card transition-all duration-300 ease-in-out',
                  isChatExpanded
                    ? 'sm:inset-0 sm:bottom-0 sm:left-0 sm:translate-x-0 sm:w-full sm:max-w-full sm:h-full sm:max-h-full sm:rounded-none sm:border-0'
                    : 'sm:inset-auto sm:bottom-28 sm:left-1/2 sm:-translate-x-1/2 sm:w-160 sm:max-w-[calc(100vw-2rem)] sm:h-200 sm:max-h-[calc(100vh-8rem)] sm:rounded-xl sm:border sm:border-border/40 sm:shadow-[0_32px_80px_-12px_rgba(0,0,0,0.35)] sm:dark:shadow-[0_32px_80px_-12px_rgba(0,0,0,0.8)] sm:ring-1 sm:ring-inset sm:ring-white/5',
                )}
              >
                <FloatingChat
                  onClose={() => setIsChatOpen(false)}
                  isExpanded={isChatExpanded}
                  onToggleExpand={() => setIsChatExpanded((prev) => !prev)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )
    : null;

  return (
    <>
      {chatPanel}
      <nav
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 w-max"
        aria-label="Main Navigation"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 28, stiffness: 340, delay: 0.1 }}
          className="flex items-center gap-1.5 rounded-2xl border border-border/80 bg-background/80 backdrop-blur-xl px-2 py-2 shadow-[0_24px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
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
                <span className="relative z-10 text-[11px] font-medium leading-none">
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
              active
                ? 'text-foreground font-semibold'
                : 'text-muted-foreground hover:text-foreground/80',
            );

            if (isAssistant) {
              return (
                <button
                  key={item.href}
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
