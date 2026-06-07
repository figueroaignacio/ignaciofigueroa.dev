'use client';

import { ASSISTANT_API_URL } from '@/shared/lib/constants';
import type { Project } from '@/payload-types';
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

  return (
    <div className="mt-8 mb-4">
      {status === 'idle' && (
        <button
          onClick={handleSummarize}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 hover:bg-muted transition-all duration-200 group"
        >
          <SparklesIcon className="size-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
          {t('button')}
        </button>
      )}

      {status === 'loading' && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm text-muted-foreground">
          <SpinnerIcon className="size-3.5 animate-spin" />
          {t('loading')}
        </div>
      )}

      {status === 'error' && (
        <p className="text-sm text-destructive/80">{t('error')}</p>
      )}

      {status === 'done' && summary && (
        <div className="rounded-xl border border-border/50 bg-muted/30 p-5 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-3">
            <SparklesIcon className="size-3.5 text-muted-foreground" />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {t('title')}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/80 font-light">{summary}</p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-3 text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors underline underline-offset-2"
          >
            ✕ dismiss
          </button>
        </div>
      )}
    </div>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}

function SpinnerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
