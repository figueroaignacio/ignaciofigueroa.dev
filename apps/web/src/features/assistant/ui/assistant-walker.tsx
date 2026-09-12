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
