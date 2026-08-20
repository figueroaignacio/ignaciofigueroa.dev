'use client';

import { useInView } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { AssistantWalker } from './assistant-walker';

/**
 * The assistant pacing the rule at the foot of the section it is dropped into:
 * it walks a stretch, sits down on the line to work for a while, gets up, and
 * walks the next one, back and forth across the whole section.
 *
 * It is mounted only once that rule is on screen, which is the only thing this
 * component decides — the pacing itself is a loop in CSS, so there is no timer
 * here to drift out of sync with it. The track clips sideways and stays open
 * downwards, so the bot can never widen the page but its legs can still hang
 * over the line. It opens the same chat the dock does, through the `open-chat`
 * event the dock already listens for, so it is a second way in rather than
 * decoration.
 */
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
