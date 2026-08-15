'use client';

import { useBotExpression } from '../hooks/use-bot-expression';
import { AssistantAvatar } from './assistant-avatar';

/**
 * The dock's copy of the bot. It never sleeps — it is navigation, and a dozing
 * nav item reads as broken — but it does react to the theme toggle, which is
 * the point of putting the reaction here: the toggle lives in the footer, and
 * the dock is the only avatar on screen when you reach for it.
 */
export function DockBotIcon() {
  const { expression } = useBotExpression();

  return <AssistantAvatar size="sm" expression={expression} className="scale-110" />;
}
