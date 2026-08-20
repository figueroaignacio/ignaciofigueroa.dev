'use client';

import { useInView } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { AssistantWalker } from './assistant-walker';

export function RailBot() {
  const t = useTranslations('components.chat');
  const track = useRef<HTMLDivElement>(null);
  const onScreen = useInView(track, { once: true, margin: '0px 0px -120px 0px' });

  return (
    <div className="rail-bot-slot" ref={track}>
      {/* The tooltip is a joke; the button still has to say what it does. */}
      {onScreen && (
        <button
          type="button"
          className="rail-bot group"
          aria-label={t('railBot.label')}
          onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
        >
          <span className="rail-bot-tooltip" aria-hidden="true">
            {t('railBot.tooltip')}
          </span>
          <AssistantWalker />
        </button>
      )}
    </div>
  );
}
