'use client';

import { AssistantAvatar } from '@/features/assistant/ui/assistant-avatar';
import { usePathname, useRouter } from '@/i18n/navigation';
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
    <div className="min-h-screen flex flex-col overflow-x-clip">
      <div className="page-frame-outer flex flex-1 flex-col">
        <main
          id="main-content"
          className="page-frame flex flex-1 flex-col items-center justify-center py-16 text-center"
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

            <div className="relative w-full pt-4">
              <div className="pointer-events-none absolute right-5 -top-2 z-0" aria-hidden="true">
                <AssistantAvatar size="lg" follow />
              </div>

              <div className="relative z-10 w-full overflow-hidden rounded-sm border border-border bg-card font-mono text-[11px] text-left">
                <div className="border-b border-rule px-4 py-2.5">
                  <span className="type-label text-muted-foreground select-none">
                    {t('codeBlockTitle')}
                  </span>
                </div>
                <div className="p-4 text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {t('codeBlockContent', { filename, query })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Dock />
    </div>
  );
}
