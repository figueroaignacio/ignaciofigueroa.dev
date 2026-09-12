'use client';

import { useTheme } from 'nach-themes';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { AssistantExpression } from '../ui/assistant-avatar';

interface UseBotExpressionOptions {
  sleepAfterMs?: number;
}

const REACTION_MS = 900;

export function useBotExpression({ sleepAfterMs }: UseBotExpressionOptions = {}) {
  const { resolvedTheme } = useTheme();
  const [asleep, setAsleep] = useState(false);
  const [reaction, setReaction] = useState<AssistantExpression | null>(null);
  const lastTheme = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!sleepAfterMs) return;

    let timer: ReturnType<typeof setTimeout>;

    const reset = () => {
      setAsleep(false);
      clearTimeout(timer);
      timer = setTimeout(() => setAsleep(true), sleepAfterMs);
    };

    const events = ['pointermove', 'pointerdown', 'keydown', 'scroll'] as const;
    events.forEach((event) => window.addEventListener(event, reset, { passive: true }));
    reset();

    return () => {
      clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, reset));
    };
  }, [sleepAfterMs]);

  useEffect(() => {
    if (!resolvedTheme) return;

    const previous = lastTheme.current;
    lastTheme.current = resolvedTheme;
    if (!previous || previous === resolvedTheme) return;

    setAsleep(false);
    setReaction(resolvedTheme === 'light' ? 'dazzled' : 'startled');
    const timer = setTimeout(() => setReaction(null), REACTION_MS);

    return () => clearTimeout(timer);
  }, [resolvedTheme]);

  const wake = useCallback(() => setAsleep(false), []);

  const expression: AssistantExpression = reaction ?? (asleep ? 'asleep' : 'awake');

  return { expression, wake };
}
