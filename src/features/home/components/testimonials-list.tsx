'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface TestimonialData {
  id: number;
  testimonial: string;
  name: string;
  role: string;
}

const INITIAL_COUNT = 2;

export function TestimonialsList({ testimonials }: { testimonials: TestimonialData[] }) {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations('sections.testimonials');

  const hasMore = testimonials.length > INITIAL_COUNT;
  const visible = expanded ? testimonials : testimonials.slice(0, INITIAL_COUNT);

  return (
    <div className="relative">
      <div id="testimonials-grid" className="divide-y divide-border">
        {visible.map((testimonial) => (
          <figure key={testimonial.id} className="py-6 first:pt-0 last:pb-0 m-0 group">
            <blockquote className="prose-reading italic text-[17px] md:text-[18px] text-foreground/95 mb-3 pl-4 border-l border-border/80">
              <p>"{testimonial.testimonial}"</p>
            </blockquote>
            <figcaption className="pl-4">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
                — {testimonial.name}, {testimonial.role.toLowerCase()}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer border-0 bg-transparent px-2 py-1 underline decoration-border/60 hover:decoration-foreground"
            aria-expanded={expanded}
            aria-controls="testimonials-grid"
          >
            {expanded ? t('showLess').toLowerCase() : t('showMore').toLowerCase()}
          </button>
        </div>
      )}
    </div>
  );
}
