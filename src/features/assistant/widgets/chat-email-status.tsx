'use client';

import { Callout } from '@/shared/components/ui/callout';
import { IconTile } from '@/shared/components/ui/icon-tile';
import { Progress } from '@/shared/components/ui/progress';
import { Separator } from '@/shared/components/ui/separator';
import { Loading02Icon, Tick01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

interface ChatEmailStatusProps {
  emailSending?: boolean;
  emailSuccess?: boolean;
  emailError?: boolean;
  emailErrorMessage?: string;
  emailSuccessData?: { name: string; email: string; message: string } | null;
}

export function ChatEmailStatus({
  emailSending,
  emailSuccess,
  emailError,
  emailErrorMessage,
  emailSuccessData,
}: ChatEmailStatusProps) {
  const t = useTranslations('components.chat.messages');

  if (emailSending) {
    return (
      <motion.div
        key="email-sending"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 w-full"
      >
        <Callout
          variant="info"
          aria-busy="true"
          icon={
            <IconTile variant="soft" tone="info" size="sm">
              <HugeiconsIcon icon={Loading02Icon} className="animate-spin" />
            </IconTile>
          }
        >
          <Callout.Title className="text-xs tracking-wide">{t('emailSending')}</Callout.Title>
          <Callout.Content>
            <span className="type-chip block leading-none">&gt; resend.emails.send()</span>
            <Progress className="mt-3 h-0.5 rounded-full" />
          </Callout.Content>
        </Callout>
      </motion.div>
    );
  }

  if (emailSuccess) {
    return (
      <motion.div
        key="email-success"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-2 w-full max-w-xs sm:max-w-sm"
      >
        <Callout
          variant="success"
          icon={
            <IconTile variant="soft" tone="success" size="sm">
              <HugeiconsIcon icon={Tick01Icon} className="stroke-[2.5]" />
            </IconTile>
          }
        >
          <Callout.Title className="text-xs tracking-wide">{t('emailSuccess')}</Callout.Title>
          <Callout.Content>
            <span className="type-chip block leading-none">STATUS: 200 DELIVERED</span>
            {emailSuccessData && (
              <div className="mt-3 flex flex-col gap-2 rounded-lg border border-border bg-background p-3 text-[11px] leading-relaxed text-foreground">
                <div className="grid grid-cols-4 gap-1">
                  <span className="font-mono font-semibold text-muted-foreground">FROM</span>
                  <span className="col-span-3 truncate font-medium">{emailSuccessData.name}</span>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  <span className="font-mono font-semibold text-muted-foreground">EMAIL</span>
                  <span className="col-span-3 truncate font-medium select-all">
                    {emailSuccessData.email}
                  </span>
                </div>
                <Separator className="my-1" />
                <div className="flex flex-col gap-1">
                  <span className="font-mono font-semibold text-muted-foreground">MESSAGE</span>
                  <p className="line-clamp-3 border-l border-border/40 pl-2 leading-normal whitespace-pre-wrap text-foreground/90 italic select-text">
                    "{emailSuccessData.message}"
                  </p>
                </div>
              </div>
            )}
          </Callout.Content>
        </Callout>
      </motion.div>
    );
  }

  if (emailError) {
    return (
      <Callout
        key="email-error"
        variant="danger"
        role="alert"
        className="mt-2 max-w-xs sm:max-w-sm"
      >
        <Callout.Title className="text-xs">{t('emailError')}</Callout.Title>
        {emailErrorMessage && (
          <Callout.Content className="font-mono text-[11.5px] leading-normal break-all">
            {emailErrorMessage}
          </Callout.Content>
        )}
      </Callout>
    );
  }

  return null;
}
