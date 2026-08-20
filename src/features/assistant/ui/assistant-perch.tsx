import clsx from 'clsx';
import type { AssistantExpression } from './assistant-avatar';
import { AssistantFace } from './assistant-face';
import { AssistantLegs } from './assistant-legs';

type AssistantPerchProps = {
  className?: string;
  expression?: AssistantExpression;
};

export function AssistantPerch({ className, expression = 'awake' }: AssistantPerchProps) {
  return (
    <svg
      viewBox="0 0 32 24"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
      data-expression={expression}
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
