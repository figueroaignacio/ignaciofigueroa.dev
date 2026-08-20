import clsx from 'clsx';
import { AssistantFace } from './assistant-face';
import { AssistantLaptop } from './assistant-laptop';

type AssistantCodingProps = {
  className?: string;
};

export function AssistantCoding({ className }: AssistantCodingProps) {
  return (
    <svg
      viewBox="0 0 32 30"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
      data-expression="coding"
      className={clsx('assistant-avatar assistant-scene', className)}
    >
      <g className="assistant-lean">
        <g className="assistant-breathe">
          <g transform="translate(4 1)">
            <AssistantFace lit />
          </g>
        </g>
      </g>

      <AssistantLaptop />
    </svg>
  );
}
