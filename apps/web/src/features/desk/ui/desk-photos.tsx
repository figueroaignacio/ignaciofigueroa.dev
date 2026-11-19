'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, type CSSProperties } from 'react';
import { DeskObjectPanel } from './desk-object-panel';

export interface DeskTestimonial {
  id: string;
  name: string;
  role: string;
  company: string | null;
  testimonial: string;
  avatar: string | null;
  url: string | null;
}

const SCATTER = [
  { turn: '-7deg', drop: '0.75rem' },
  { turn: '5deg', drop: '-0.5rem' },
  { turn: '-3deg', drop: '1.5rem' },
  { turn: '8deg', drop: '0rem' },
  { turn: '-5deg', drop: '1rem' },
  { turn: '3deg', drop: '-0.25rem' },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function DeskPhotos({ path, items }: { path: string; items: DeskTestimonial[] }) {
  const t = useTranslations('sections.testimonials');
  const [picked, setPicked] = useState(0);
  const current = items[picked] ?? items[0];

  if (!current) return null;

  return (
    <DeskObjectPanel path={path} label={t('title')}>
      <div className="desk-object-body">
        <div role="tablist" aria-label={t('title')} className="desk-photos">
          {items.map((item, index) => {
            const selected = index === picked;
            const scatter = SCATTER[index % SCATTER.length]!;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className="desk-photo"
                style={
                  {
                    '--turn': scatter.turn,
                    '--drop': scatter.drop,
                    zIndex: selected ? items.length + 1 : index + 1,
                  } as CSSProperties
                }
                onClick={() => setPicked(index)}
              >
                <span className="desk-photo-frame">
                  {item.avatar ? (
                    <Image src={item.avatar} alt="" width={400} height={400} />
                  ) : (
                    <span aria-hidden="true">{initials(item.name)}</span>
                  )}
                </span>
                <span className="mt-2 block truncate text-sm leading-tight font-bold tracking-[-0.02em]">
                  {item.name}
                </span>
                <span className="font-code block truncate text-[0.6875rem] text-[#3d3d3d]">
                  {item.role}
                </span>
              </button>
            );
          })}
        </div>

        <article key={current.id} aria-live="polite" className="desk-quote">
          <span aria-hidden="true" className="desk-quote-tape" />
          <span aria-hidden="true" className="desk-quote-mark">
            “
          </span>
          <blockquote className="desk-quote-text">{current.testimonial}</blockquote>
          <footer className="desk-quote-sign">
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-base font-bold tracking-[-0.015em]">{current.name}</span>
              <span className="font-code text-xs text-muted-foreground">
                {[current.role, current.company].filter(Boolean).join(' · ')}
              </span>
            </div>
            {current.url && (
              <a
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                className="desk-pill shrink-0 font-sans text-sm font-medium"
              >
                LinkedIn ↗
              </a>
            )}
          </footer>
        </article>
      </div>
    </DeskObjectPanel>
  );
}
