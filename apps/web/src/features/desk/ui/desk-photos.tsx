'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { DeskObjectPanel } from './desk-object-panel';

export interface DeskTestimonial {
  id: string;
  name: string;
  role: string;
  testimonial: string;
  avatar: string | null;
  url: string | null;
}

const TURNS = ['-5deg', '3deg', '-2deg', '4deg', '-3deg', '2deg'];

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
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className="desk-photo"
                style={{ rotate: selected ? '0deg' : TURNS[index % TURNS.length] }}
                onClick={() => setPicked(index)}
              >
                <span className="desk-photo-frame">
                  {item.avatar ? (
                    <Image src={item.avatar} alt="" width={400} height={400} />
                  ) : (
                    <span aria-hidden="true">{initials(item.name)}</span>
                  )}
                </span>
                <span className="mt-3 block text-base leading-tight font-bold tracking-[-0.02em]">
                  {item.name}
                </span>
                <span className="font-code block text-[0.6875rem] text-[#3d3d3d]">{item.role}</span>
              </button>
            );
          })}
        </div>

        <div aria-live="polite" className="desk-island desk-quote">
          <div className="desk-card flex flex-col gap-1.5 p-5">
            <span className="font-code text-xs text-muted-foreground">{t('title')}</span>
            <h2 className="text-2xl leading-tight font-bold tracking-[-0.03em]">{current.name}</h2>
            <span className="text-sm text-muted-foreground">{current.role}</span>
            {current.url && (
              <a
                href={current.url}
                target="_blank"
                rel="noopener noreferrer"
                className="desk-pill mt-auto w-fit"
              >
                LinkedIn ↗
              </a>
            )}
          </div>
          <blockquote className="m-0 p-5 text-lg leading-normal font-medium tracking-[-0.012em] text-pretty">
            {current.testimonial}
          </blockquote>
        </div>
      </div>
    </DeskObjectPanel>
  );
}
