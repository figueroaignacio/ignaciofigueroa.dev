'use client';

import { cn } from '@/shared/lib/cn';
import { useEffect, useState } from 'react';

const TIME_ZONE = 'America/Argentina/Buenos_Aires';

function read() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    weekday: 'short',
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const hour = Number(get('hour')) % 24;
  const working = !['Sat', 'Sun'].includes(get('weekday')) && hour >= 9 && hour < 18;
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

  if (!state) return null;

  return (
    <>
      <span className="select-none">·</span>
      <span className="tabular-nums text-foreground" title={label}>
        {state.time}
      </span>
      <span className="select-none">·</span>
      <span className={cn(state.working ? 'text-success-text' : 'text-muted-foreground/70')}>
        {state.working ? workingLabel : offLabel}
      </span>
    </>
  );
}
