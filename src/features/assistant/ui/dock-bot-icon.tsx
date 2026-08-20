'use client';

import { useBotExpression } from '../hooks/use-bot-expression';
import { AssistantAvatar } from './assistant-avatar';

export function DockBotIcon() {
  const { expression } = useBotExpression();

  return <AssistantAvatar size="sm" expression={expression} className="scale-110" />;
}
