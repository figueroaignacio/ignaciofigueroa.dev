import clsx from 'clsx';
import { AssistantFace } from './assistant-face';
import { AssistantLaptop } from './assistant-laptop';

type AssistantCodingProps = {
  className?: string;
};

/**
 * The bot at work: it pulls out a laptop, the lid opens, the screen lights its
 * face, and it reads left to right while its hands type.
 *
 * The scene is 32x30 so there is room under the shoulders for the laptop; the
 * face keeps its own 24x24 grid and is nudged into place, which is why it can
 * stay the same drawing the plain avatar uses. Decorative on purpose — whatever
 * wait this stands for has to say so in text, not in a picture.
 */
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
