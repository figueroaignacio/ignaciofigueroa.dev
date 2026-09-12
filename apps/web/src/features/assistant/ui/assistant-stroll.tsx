import clsx from 'clsx';
import { AssistantFace } from './assistant-face';
import { AssistantLegs } from './assistant-legs';

type AssistantStrollProps = {
  className?: string;
  carrying?: boolean;
};

export function AssistantStroll({ className, carrying = false }: AssistantStrollProps) {
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

        {carrying && (
          <g>
            <rect x="21" y="19" width="7" height="5" fill="#F5F0E8" />
            <rect x="21" y="19" width="7" height="1" fill="#D4704A" />
            <rect x="23" y="21" width="3" height="1" fill="#D4704A" />
          </g>
        )}
      </g>
    </svg>
  );
}
