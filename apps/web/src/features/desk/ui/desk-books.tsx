'use client';

import { STACK } from '@/features/home/ui/tech-stack';
import { useTranslations } from 'next-intl';
import { DeskObjectPanel } from './desk-object-panel';

const COVERS = [
  { background: '#26303c', color: '#f5f5f4', turn: '-1.5deg' },
  { background: '#17171a', color: '#f5f5f4', turn: '1deg' },
  { background: '#7cc4ee', color: '#08222f', turn: '-0.8deg' },
  { background: '#e6e2d8', color: '#141414', turn: '1.4deg' },
  { background: '#2a2a2a', color: '#f5f5f4', turn: '-1deg' },
];

export function DeskBooks({ path }: { path: string }) {
  const t = useTranslations('sections.stack');

  return (
    <DeskObjectPanel path={path} label={t('title')}>
      <div className="desk-object-body">
        <h2 className="desk-object-title">
          {t('title')}
          <span aria-hidden="true" />
        </h2>
        <div className="desk-books">
          {STACK.map((group, index) => {
            const cover = COVERS[index % COVERS.length]!;
            return (
              <article
                key={group.key}
                className="desk-book"
                style={{ background: cover.background, color: cover.color, rotate: cover.turn }}
              >
                <span className="font-code text-xs opacity-80">0{index + 1}</span>
                <h3 className="text-2xl leading-none font-bold tracking-[-0.03em]">
                  {t(`categories.${group.key}`)}
                </h3>
                <ul className="flex flex-col gap-1 text-base font-semibold tracking-[-0.01em]">
                  {group.core.map((tech) => (
                    <li key={tech.name}>{tech.name}</li>
                  ))}
                </ul>
                <ul className="flex flex-col gap-0.5 border-t border-current/25 pt-3 text-sm opacity-85">
                  {group.rest.map((tech) => (
                    <li key={tech.name}>{tech.name}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </DeskObjectPanel>
  );
}
