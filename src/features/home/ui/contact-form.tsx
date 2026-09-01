'use client';

import { AssistantStroll } from '@/features/assistant/ui/assistant-stroll';
import { Loading02Icon, MailSend02Icon } from '@hugeicons/core-free-icons';
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

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const fieldClassName =
    'w-full px-4 py-2.5 bg-secondary/30 border border-border rounded-md transition-all placeholder:text-muted-foreground/50 disabled:opacity-50 focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring/30';

  return (
    <div className="w-full">
      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-medium text-muted-foreground">
              {t('nameLabel')}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              disabled={isPending || state.success}
              placeholder={t('namePlaceholder')}
              className={fieldClassName}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-medium text-muted-foreground">
              {t('emailLabel')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              disabled={isPending || state.success}
              placeholder={t('emailPlaceholder')}
              className={fieldClassName}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-xs font-medium text-muted-foreground">
            {t('messageLabel')}
          </label>
          <textarea
            ref={textareaRef}
            id="message"
            name="message"
            required
            disabled={isPending || state.success}
            placeholder={t('messagePlaceholder')}
            rows={3}
            onInput={handleInput}
            className={`${fieldClassName} py-3 resize-none overflow-hidden`}
          />
        </div>
        {state.success && (
          <div className="courier-track" aria-hidden="true">
            <AssistantStroll className="courier" carrying />
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1" aria-live="polite">
            {state.error && (
              <p className="text-sm text-destructive font-medium animate-in fade-in slide-in-from-top-1">
                {state.error === 'Missing fields' || state.error === 'Internal Server Error'
                  ? t('error')
                  : state.error}
              </p>
            )}
            {state.success && (
              <p className="text-sm font-medium text-(--success-text) animate-in fade-in slide-in-from-top-1">
                {t('success')}
              </p>
            )}
          </div>
          {state.success ? (
            <button type="button" onClick={onReset} className="btn btn-outline">
              {t('sendAnother')}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-primary gap-2 flex items-center"
            >
              {isPending ? t('sending') : t('submit')}
              <HugeiconsIcon
                icon={isPending ? Loading02Icon : MailSend02Icon}
                className={`size-4${isPending ? ' animate-spin' : ''}`}
              />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
