import clsx from 'clsx';
import { AssistantFace } from './assistant-face';
import { AssistantLegs } from './assistant-legs';

type AssistantStrollProps = {
  className?: string;
};

/**
 * The bot with nowhere to sit: it just walks, on whatever it has been put on
 * top of. Same grid and same walk cycle as the one that paces the section rule,
 * minus the laptop and the seated pose — where this one goes it is passing
 * through, not settling in.
 */
export function AssistantStroll({ className }: AssistantStrollProps) {
  return (
    <svg
      viewBox="0 0 32 28"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={clsx('assistant-avatar assistant-strolling', className)}
    >
      <g className="assistant-gait">
        <g className="assistant-breathe">
          <g transform="translate(4 0)">
            <AssistantFace />
          </g>
        </g>
        <AssistantLegs dangle={false} />
      </g>
    </svg>
  );
}
