'use client';

import clsx from 'clsx';
import { useRef } from 'react';
import { useGaze } from '../hooks/use-gaze';
import { AssistantFace } from './assistant-face';
import { AssistantLaptop } from './assistant-laptop';
import { AssistantLegs } from './assistant-legs';

type AssistantWalkerProps = {
  className?: string;
};

/**
 * The bot pacing a rule: walking it, sitting down on it to work, and getting
 * back up to walk some more — and looking up at your pointer when it comes
 * near, which is what makes stopping it on hover feel like being noticed.
 *
 * The grid ends at y28 — where its feet are — so the element's bottom edge is
 * the line it walks on and nothing has to be nudged into place by hand. Sitting
 * drops the whole body four units, which is exactly the length of its legs, so
 * the hips land on the line the feet were standing on and the legs end up
 * hanging over the edge. That overhang lives outside the grid, hence the
 * visible overflow.
 *
 * The laptop, the light and the typing are the same drawings the chat's waiting
 * state uses, but on a different clock: here they loop with the walk instead of
 * playing once, and that loop is timed by the `.rail-bot` around it.
 */
export function AssistantWalker({ className }: AssistantWalkerProps) {
  const ref = useRef<SVGSVGElement>(null);
  useGaze(ref);

  return (
    <svg
      ref={ref}
      viewBox="0 0 32 28"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      aria-hidden="true"
      data-expression="coding"
      className={clsx('assistant-avatar assistant-scene assistant-walker', className)}
    >
      <g className="assistant-sit">
        <g className="assistant-gait">
          <g className="assistant-lean">
            <g className="assistant-breathe">
              <g transform="translate(4 0)">
                <AssistantFace lit />
              </g>
            </g>
          </g>
          <AssistantLegs />
        </g>

        <g transform="translate(0 -1)">
          <AssistantLaptop />
        </g>
      </g>
    </svg>
  );
}
