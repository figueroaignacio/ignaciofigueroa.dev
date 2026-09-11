'use client';

import { cn } from '@/shared/lib/cn';
import { useEffect, useState } from 'react';

const TIME_ZONE = 'America/Argentina/Buenos_Aires';

function read() {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    weekday: 'short',
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const hour = Number(get('hour')) % 24;
  const weekday = get('weekday');
  const working = !['Sat', 'Sun'].includes(weekday) && hour >= 9 && hour < 18;
  return { time: `${String(hour).padStart(2, '0')}:${get('minute')}`, working };
}

interface LocalClockProps {
  label: string;
  workingLabel: string;
  offLabel: string;
}

export function LocalClock({ label, workingLabel, offLabel }: LocalClockProps) {
  const [state, setState] = useState<ReturnType<typeof read> | null>(null);

  useEffect(() => {
    setState(read());
    const timer = setInterval(() => setState(read()), 30_000);
    return () => clearInterval(timer);
  }, []);

  if (!state) return <div className="mt-5 h-4" aria-hidden="true" />;

  return (
    <p className="mt-5 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
      <span
        aria-hidden="true"
        className={cn(
          'size-1.5 shrink-0 rounded-full',
          state.working ? 'bg-success ring-4 ring-success/15' : 'bg-muted-foreground/50',
        )}
      />
      <span className="tabular-nums text-foreground">{state.time}</span>
      <span>· {label}</span>
      <span className="text-muted-foreground/70">· {state.working ? workingLabel : offLabel}</span>
    </p>
  );
}
