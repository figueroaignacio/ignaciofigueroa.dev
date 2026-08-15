'use client';

import { useTranslations } from 'next-intl';
import { useBotExpression } from '../hooks/use-bot-expression';
import { AssistantAvatar } from './assistant-avatar';

/**
 * The assistant hiding under the bottom-right corner of the section it is
 * dropped into: scroll brings it up to a peek, hover brings it all the way out.
 *
 * The slot clips to that corner, so the bot is genuinely behind the edge rather
 * than faded out in mid-air, and the riser exists so the scroll animation and
 * the hover transition each own their own element instead of fighting over one
 * `translate`. It opens the same chat the dock does, through the `open-chat`
 * event the dock already listens for, so it is a second way in rather than
 * decoration.
 */
export function RailBot() {
  const t = useTranslations('components.chat');
  const { expression, wake } = useBotExpression({ sleepAfterMs: 20_000 });

  return (
    <div className="rail-bot-slot" onPointerEnter={wake}>
      <div className="rail-bot-riser">
        {/* The tooltip is a joke; the button still has to say what it does. */}
        <button
          type="button"
          className="rail-bot group"
          aria-label={t('railBot.label')}
          onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
        >
          <span className="rail-bot-tooltip" aria-hidden="true">
            {t('railBot.tooltip')}
          </span>
          <AssistantAvatar
            size="xl"
            expression={expression}
            className="transition-transform group-hover:-rotate-6"
          />
        </button>
      </div>
    </div>
  );
}
