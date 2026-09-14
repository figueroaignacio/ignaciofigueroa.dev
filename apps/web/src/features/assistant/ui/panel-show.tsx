'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useGaze } from '../hooks/use-gaze';
import { AssistantFace } from './assistant-face';
import { AssistantLaptop } from './assistant-laptop';
import { AssistantLegs } from './assistant-legs';

type Phase = 'climb' | 'walk' | 'sit' | 'code' | 'wave' | 'stand' | 'back';

const SCRIPT: Array<{ phase: Phase; ms: number }> = [
  { phase: 'climb', ms: 1800 },
  { phase: 'walk', ms: 2600 },
  { phase: 'sit', ms: 900 },
  { phase: 'code', ms: 9000 },
  { phase: 'wave', ms: 2000 },
  { phase: 'stand', ms: 900 },
  { phase: 'back', ms: 2600 },
];

const LOOP_FROM = 1;

export function PanelShow({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [step, setStep] = useState(0);
  const phase = SCRIPT[step]?.phase ?? 'sit';

  useGaze(ref, phase !== 'climb');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = setTimeout(() => {
      setStep((current) => (current + 1 >= SCRIPT.length ? LOOP_FROM : current + 1));
    }, SCRIPT[step]?.ms ?? 2000);

    return () => clearTimeout(timer);
  }, [step]);

  const walking = phase === 'climb' || phase === 'walk' || phase === 'back';

  return (
    <div className={clsx('panel-show', className)} data-phase={phase}>
      <svg
        ref={ref}
        viewBox="0 0 32 30"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        aria-hidden="true"
        data-expression={phase === 'code' ? 'coding' : 'awake'}
        className="assistant-avatar assistant-scene panel-show-bot"
      >
        <g className="panel-show-body">
          <g className="assistant-breathe">
            <g transform="translate(4 1)">
              <AssistantFace lit={phase === 'code'} />
            </g>
          </g>
          <g className="panel-show-arm">
            <rect x="24" y="10" width="2" height="5" fill="#E8845A" />
            <rect x="24" y="9" width="3" height="2" fill="#D4704A" />
          </g>
          <AssistantLegs walk={walking} dangle={!walking} />
        </g>

        <g className="panel-show-laptop">
          <AssistantLaptop />
        </g>
      </svg>
    </div>
  );
}
