'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useQueryTab(key: string, values: readonly string[], fallback: string) {
  const searchParams = useSearchParams();
  const requested = searchParams.get(key);
  const value = requested && values.includes(requested) ? requested : fallback;

  const setValue = useCallback(
    (next: string) => {
      const params = new URLSearchParams(window.location.search);
      if (next === fallback) params.delete(key);
      else params.set(key, next);
      const query = params.toString();
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`,
      );
    },
    [key, fallback],
  );

  return [value, setValue] as const;
}
