'use client';

import { AssistantAvatar } from '@/features/assistant/components/ui/assistant-avatar';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/shared/lib/cn';

import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { type ReactNode, useCallback, useMemo } from 'react';
import { Home01Icon, Mail01Icon, UserIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

const ICON_MAP: Record<string, ReactNode> = {
  '/': <HugeiconsIcon icon={Home01Icon} className="size-5" strokeWidth={1.5} />,
  '/about': <HugeiconsIcon icon={UserIcon} className="size-5" strokeWidth={1.5} />,
  '/contact': <HugeiconsIcon icon={Mail01Icon} className="size-5" strokeWidth={1.5} />,
  '/assistant': <AssistantAvatar size="sm" className="scale-110" />,
};

export function Dock() {
  const pathname = usePathname();
  const t = useTranslations('ui');
  const navigation = useMemo(
    () => t.raw('navigation') as Array<{ label: string; href: string }>,
    [t],
  );

  const isActive = useCallback(
    (href: string) => {
      if (href === '/') return pathname === '/';
      return pathname.startsWith(href);
    },
    [pathname],
  );

  return (
    <nav
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 w-max"
      aria-label="Main Navigation"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 28, stiffness: 340, delay: 0.1 }}
        className="flex items-center gap-2 rounded-2xl border border-foreground/10 bg-foreground px-2.5 py-2.5 shadow-2xl"
      >
        {navigation.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'group relative flex flex-col items-center justify-center gap-1 rounded-xl px-5 py-2.5',
                'min-w-[56px] min-h-[52px]',
                'transition-all duration-150 ease-out',
                'active:scale-95',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                active ? 'text-background' : 'text-background/40 hover:text-background/80',
              )}
            >
              <AnimatePresence>
                {active && (
                  <motion.span
                    layoutId="dock-indicator"
                    className="absolute inset-0 rounded-xl bg-background/10"
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
            </Link>
          );
        })}
      </motion.div>
    </nav>
  );
}
