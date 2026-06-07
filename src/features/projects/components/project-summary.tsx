'use client';

import type { Project } from '@/payload-types';
import { ASSISTANT_API_URL } from '@/shared/lib/constants';
import { AiBeautifyIcon, Cancel01Icon, Loading03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface ProjectSummaryProps {
  body: Project['body'];
  locale: string;
}

type Status = 'idle' | 'loading' | 'done' | 'error';

export function ProjectSummary({ body, locale }: ProjectSummaryProps) {
  const t = useTranslations('components.projectSummary');
  const [status, setStatus] = useState<Status>('idle');
  const [summary, setSummary] = useState<string>('');

  async function handleSummarize() {
    setStatus('loading');
    setSummary('');

    try {
      const res = await fetch(`${ASSISTANT_API_URL}/portfolio/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body, locale }),
      });

      if (!res.ok) {
        setStatus('error');
        return;
      }

      const data = (await res.json()) as { summary: string };
      setSummary(data.summary);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done' && summary) {
    return (
      <div
        className="group/card relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-500"
        style={{ animationFillMode: 'both' }}
      >
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-muted/20 via-transparent to-transparent" />

        <div className="relative flex items-center justify-between border-b border-border/40 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-foreground/30 duration-1000" />
              <span className="relative inline-flex size-1.5 rounded-full bg-foreground/50" />
            </span>
            <HugeiconsIcon
              icon={AiBeautifyIcon}
              className="size-3.5 text-muted-foreground"
              strokeWidth={1.5}
            />
            <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              {t('title')}
            </span>
          </div>
          <button
            onClick={() => setStatus('idle')}
            aria-label="Dismiss summary"
            className="flex size-6 items-center justify-center rounded-full text-muted-foreground/40 transition-all hover:bg-muted hover:text-muted-foreground"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-3" strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="relative px-4 py-4">
          <p className="text-sm leading-relaxed text-foreground/70 font-light">{summary}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {status === 'idle' && (
        <button
          onClick={handleSummarize}
          className="group inline-flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-sm text-muted-foreground transition-all duration-200 hover:border-border/80 hover:bg-muted/50 hover:text-foreground"
        >
          <HugeiconsIcon
            icon={AiBeautifyIcon}
            className="size-3.5 transition-transform duration-300 group-hover:rotate-12"
            strokeWidth={1.5}
          />
          {t('button')}
        </button>
      )}

      {status === 'loading' && (
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-4 py-2 text-sm text-muted-foreground">
          <HugeiconsIcon icon={Loading03Icon} className="size-3.5 animate-spin" strokeWidth={2} />
          {t('loading')}
        </div>
      )}

      {status === 'error' && (
        <button
          onClick={handleSummarize}
          className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm text-destructive/70 transition-colors hover:bg-destructive/10"
        >
          {t('error')}
          <span className="text-xs opacity-60">↩ retry</span>
        </button>
      )}
    </div>
  );
}
