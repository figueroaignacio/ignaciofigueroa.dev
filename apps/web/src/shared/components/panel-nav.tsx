'use client';

import type { AssistantExpression } from '@/features/assistant/ui/assistant-avatar';
import { PanelBot } from '@/features/assistant/ui/panel-bot';
import { cn } from '@/shared/lib/cn';
import { useEffect, useState } from 'react';

export interface PanelNavItem {
  id: string;
  label: string;
}

const MOODS: Record<string, AssistantExpression> = {
  education: 'reading',
  certifications: 'reading',
  about: 'reading',
  testimonials: 'reading',
};

export function PanelNav({ items }: { items: PanelNavItem[] }) {
  const [present, setPresent] = useState<PanelNavItem[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const found = items.filter((item) => document.getElementById(item.id));
    setPresent(found);
    if (found.length === 0) return;

    const cover = document.querySelector<HTMLElement>('.reveal-cover');
    let frame = 0;

    const measure = () => {
      frame = 0;
      if (window.scrollY < 80) {
        setActive(null);
        return;
      }
      const line = window.innerHeight * 0.4;
      if (cover && cover.getBoundingClientRect().bottom < window.innerHeight * 0.55) {
        setActive(found.some((item) => item.id === 'contact') ? 'contact' : null);
        return;
      }
      let current: string | null = null;
      for (const item of found) {
        if (item.id === 'contact') continue;
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      setActive(current);
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
  }, [items]);

  if (present.length < 2) return null;

  return (
    <div className="panel-nav">
      <PanelBot className="panel-nav-bot" mood={active ? MOODS[active] : undefined} />
      <ul className="flex flex-col gap-1.5 font-mono text-[11px]">
        {present.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'group flex items-center gap-2.5 py-0.5 transition-colors duration-200',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'h-px bg-current transition-[width] duration-300 ease-out',
                    isActive ? 'w-6' : 'w-3 group-hover:w-5',
                  )}
                />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
