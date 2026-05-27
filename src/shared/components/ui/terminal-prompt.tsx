'use client';

import { usePathname } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '../theme-toggle';

const PromptPrefix = ({ path, className }: { path: string; className?: string }) => (
  <span className={className}>
    <span className="text-emerald-600 dark:text-green-500">visitor</span>
    <span className="text-muted-foreground">@</span>
    <span className="text-indigo-600 dark:text-cyan-400">ignaciofigueroa</span>
    <span className="text-foreground">:</span>
    <span className="text-amber-600 dark:text-yellow-500">{path}</span>
  </span>
);

export function TerminalPrompt() {
  const pathname = usePathname();
  const [time, setTime] = useState<string>('');

  const displayPath = pathname === '/' ? '~/home' : `~${pathname}`;

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-2 left-2 md:bottom-4 md:left-4 z-40 hidden flex-col space-y-1 font-mono text-xs md:flex select-none max-w-sm">
      <div className="flex gap-x-4 items-center">
        <span className="text-muted-foreground min-h-4">{time ? `[${time}]` : ''}</span>
        <ThemeToggle />
      </div>
      <div>
        <PromptPrefix path={displayPath} />
        <span className="text-foreground ml-1">$</span>
        <span className="animate-pulse text-foreground ml-1">_</span>
      </div>
    </div>
  );
}
