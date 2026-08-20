'use client';

import { AssistantStroll } from '@/features/assistant/ui/assistant-stroll';
import { Loading02Icon, MailSend02Icon, Tick01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';
import { useActionState, useRef } from 'react';
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
  const t = useTranslations('components.contactForm');
  const [state, formAction, isPending] = useActionState(sendEmail, initialState);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

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
              disabled={isPending || state.success}
              placeholder={t('namePlaceholder')}
              className="w-full px-4 py-2.5 bg-secondary/30 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50 disabled:opacity-50"
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
              disabled={isPending || state.success}
              placeholder={t('emailPlaceholder')}
              className="w-full px-4 py-2.5 bg-secondary/30 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50 disabled:opacity-50"
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
            className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50 resize-none overflow-hidden disabled:opacity-50"
          />
        </div>
        {/* Once the message is away, the bot walks it off the page. It crosses
            once and leaves: a confirmation that repeats is an animation. */}
        {state.success && (
          <div className="courier-track" aria-hidden="true">
            <AssistantStroll className="courier" carrying />
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            {state.error && (
              <p
                className="text-sm text-destructive font-medium animate-in fade-in slide-in-from-top-1"
                role="alert"
              >
                {state.error === 'Missing fields' || state.error === 'Internal Server Error'
                  ? t('error')
                  : state.error}
              </p>
            )}
            {state.success && (
              <p
                className="text-sm font-medium animate-in fade-in slide-in-from-top-1"
                role="alert"
              >
                {t('success')}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={state.success}
            className="btn btn-primary gap-2 flex items-center"
          >
            {isPending && t('sending')}
            {!isPending && state.success && <HugeiconsIcon icon={Tick01Icon} className="size-4" />}
            {!isPending && !state.success && t('submit')}

            {!state.success &&
              (isPending ? (
                <HugeiconsIcon icon={Loading02Icon} className="size-4 animate-spin" />
              ) : (
                <HugeiconsIcon icon={MailSend02Icon} className="size-4" />
              ))}
          </button>
        </div>
      </form>
    </div>
  );
}
