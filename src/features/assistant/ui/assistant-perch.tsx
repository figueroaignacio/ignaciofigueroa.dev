import clsx from 'clsx';
import type { AssistantExpression } from './assistant-avatar';
import { AssistantFace } from './assistant-face';
import { AssistantLegs } from './assistant-legs';

type AssistantPerchProps = {
  className?: string;
  expression?: AssistantExpression;
};

/**
 * The bot sitting on the edge of something, legs over the side.
 *
 * The grid stops at its hips, so the element's bottom edge is the edge it is
 * sitting on: put it at the top of a box or the bottom of a section and it
 * lands on that line with nothing to nudge. The legs hang past the grid, which
 * is what the visible overflow is for.
 */
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
