'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { BackgroundDecorations } from '@/shared/components/background-decorations';
import { Dock } from '@/shared/components/dock';
import { Button } from '@/shared/components/ui/button';
import { ArrowLeft01Icon, Home01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('pages.notFound');
  const router = useRouter();
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const cleanSegment = lastSegment ? lastSegment.replace(/[^a-zA-Z0-9-_]/g, '') : '';
  const query = cleanSegment || 'page';
  const filename = `${query}.tsx`;

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      <BackgroundDecorations />

      <main
        id="main-content"
        className="flex-1 container flex flex-col items-center justify-center relative z-10 py-16 text-center"
        tabIndex={-1}
      >
        <div className="space-y-6 max-w-sm flex flex-col items-center">
          <span className="text-[8rem] sm:text-[10rem] font-heading font-bold leading-none tracking-tighter text-foreground/6 select-none">
            404
          </span>

          <h1 className="-mt-16 type-page-title text-foreground">{t('title')}</h1>

          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            {t('description')}
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              variant="outline"
              leftIcon={<HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />}
              onClick={() => router.back()}
            >
              {t('actionBack')}
            </Button>
            <Button
              variant="default"
              leftIcon={<HugeiconsIcon icon={Home01Icon} className="size-4" />}
              onClick={() => router.push('/')}
            >
              {t('actionHome')}
            </Button>
          </div>

          <div className="w-full pt-4">
            <div className="w-full bg-neutral-900/90 dark:bg-neutral-950/90 border border-border/60 rounded-sm overflow-hidden font-mono text-[11px] text-left shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-neutral-800/40">
                <div className="size-2 rounded-full bg-[#ff5f56]" />
                <div className="size-2 rounded-full bg-[#ffbd2e]" />
                <div className="size-2 rounded-full bg-[#27c93f]" />
                <span className="text-[10px] text-neutral-500 ml-2 select-none">
                  {t('codeBlockTitle')}
                </span>
              </div>
              <div className="p-4 text-neutral-400 leading-relaxed whitespace-pre-wrap">
                {t('codeBlockContent', { filename, query })}
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="h-32 w-full shrink-0 relative z-10" aria-hidden="true" />
      <Dock />
    </div>
  );
}
