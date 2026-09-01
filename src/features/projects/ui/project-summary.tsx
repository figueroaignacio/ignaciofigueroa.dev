'use client';

import type { Project } from '@/payload-types';
import { Button } from '@/shared/components/ui/button';
import { Callout } from '@/shared/components/ui/callout';
import { Card } from '@/shared/components/ui/card';
import { ASSISTANT_API_URL } from '@/shared/lib/constants';
import { AiBeautifyIcon, Cancel01Icon } from '@hugeicons/core-free-icons';
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
      <Card className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both">
        <Card.Header
          compact
          className="flex-row items-center justify-between space-y-0 border-b border-border/40"
        >
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
            <Card.Title as="h2" className="type-label text-muted-foreground">
              {t('title')}
            </Card.Title>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setStatus('idle')}
            aria-label={t('dismiss')}
            className="size-6 rounded-full text-muted-foreground/40 hover:text-muted-foreground"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="size-3" strokeWidth={2} />
          </Button>
        </Card.Header>
        <Card.Content compact>
          <p className="text-sm leading-relaxed text-foreground/70 font-light">{summary}</p>
        </Card.Content>
      </Card>
    );
  }

  if (status === 'error') {
    return (
      <Callout variant="danger" className="max-w-2xl">
        <Callout.Content className="flex flex-wrap items-center justify-between gap-3">
          <p>{t('error')}</p>
          <Button variant="outline" size="sm" onClick={handleSummarize}>
            {t('retry')}
          </Button>
        </Callout.Content>
      </Callout>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      loading={status === 'loading'}
      onClick={handleSummarize}
      className="border-dashed text-muted-foreground hover:text-foreground"
      leftIcon={<HugeiconsIcon icon={AiBeautifyIcon} className="size-3.5" strokeWidth={1.5} />}
    >
      {status === 'loading' ? t('loading') : t('button')}
    </Button>
  );
}
