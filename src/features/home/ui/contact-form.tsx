'use client';

import { AssistantStroll } from '@/features/assistant/ui/assistant-stroll';
import { Button } from '@/shared/components/ui/button';
import { Callout } from '@/shared/components/ui/callout';
import { Input, inputVariants } from '@/shared/components/ui/input';
import { cn } from '@/shared/lib/cn';
import { MailSend02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';
import { useActionState, useRef, useState } from 'react';
import { sendEmail } from '../actions/send-email';

type ContactFormState = {
  error: string | null;
  success: boolean;
};

const initialState: ContactFormState = {
  error: null,
  success: false,
};

export function ContactForm() {
  const [attempt, setAttempt] = useState(0);

  return <ContactFormFields key={attempt} onReset={() => setAttempt((n) => n + 1)} />;
}

function ContactFormFields({ onReset }: { onReset: () => void }) {
  const t = useTranslations('components.contactForm');
  const [state, formAction, isPending] = useActionState(sendEmail, initialState);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const locked = isPending || state.success;

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const errorMessage =
    state.error === 'Missing fields' || state.error === 'Internal Server Error'
      ? t('error')
      : state.error;

  return (
    <div className="w-full">
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            disabled={locked}
            label={t('nameLabel')}
            placeholder={t('namePlaceholder')}
          />
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            disabled={locked}
            label={t('emailLabel')}
            placeholder={t('emailPlaceholder')}
          />
        </div>

        <Input.Wrapper>
          <Input.Label htmlFor="message">{t('messageLabel')}</Input.Label>
          <textarea
            ref={textareaRef}
            id="message"
            name="message"
            required
            disabled={locked}
            placeholder={t('messagePlaceholder')}
            rows={3}
            onInput={handleInput}
            className={cn(inputVariants(), 'h-auto min-h-24 py-3 resize-none overflow-hidden')}
          />
        </Input.Wrapper>

        {state.success && (
          <div className="courier-track" aria-hidden="true">
            <AssistantStroll className="courier" carrying />
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1" aria-live="polite">
            {state.error && (
              <Callout variant="danger" className="animate-in fade-in slide-in-from-top-1">
                <Callout.Content className="text-current">{errorMessage}</Callout.Content>
              </Callout>
            )}
            {state.success && (
              <Callout variant="success" className="animate-in fade-in slide-in-from-top-1">
                <Callout.Content className="text-current">{t('success')}</Callout.Content>
              </Callout>
            )}
          </div>
          {state.success ? (
            <Button type="button" variant="outline" onClick={onReset}>
              {t('sendAnother')}
            </Button>
          ) : (
            <Button
              type="submit"
              loading={isPending}
              rightIcon={<HugeiconsIcon icon={MailSend02Icon} className="size-4" />}
            >
              {isPending ? t('sending') : t('submit')}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
