'use client';

import clsx from 'clsx';
import { useRef } from 'react';
import { useBotExpression } from '../hooks/use-bot-expression';
import { useGaze } from '../hooks/use-gaze';
import type { AssistantExpression } from './assistant-avatar';
import { AssistantFace } from './assistant-face';
import { AssistantLegs } from './assistant-legs';

type PanelBotProps = {
  className?: string;
  mood?: AssistantExpression;
};

export function PanelBot({ className, mood }: PanelBotProps) {
  const ref = useRef<SVGSVGElement>(null);
  const { expression } = useBotExpression({ sleepAfterMs: 45000 });
  useGaze(ref, expression !== 'asleep');

  const shown = expression === 'awake' && mood ? mood : expression;

  return (
    <svg
      ref={ref}
      viewBox="0 0 32 24"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
      data-expression={shown}
      className={clsx('assistant-avatar assistant-perch', className)}
    >
      <g className="assistant-breathe">
        <g transform="translate(4 0)">
          <AssistantFace />
        </g>
      </g>
      <AssistantLegs walk={false} />
    </svg>
  );
}
