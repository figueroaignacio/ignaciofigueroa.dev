'use client';

import { cn } from '@/shared/lib/cn';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { QuoteUpIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

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
      <div id="testimonials-grid" className="grid gap-4">
        {visible.map((testimonial) => (
          <figure
            key={testimonial.id}
            className="p-6 bg-card rounded-2xl border border-border/80 m-0 group transition-all duration-300 hover:border-primary/20 hover:-translate-y-[2px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.02)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 transition-opacity">
              <HugeiconsIcon icon={QuoteUpIcon} className="size-12 rotate-12" />
            </div>
            <HugeiconsIcon
              icon={QuoteUpIcon}
              className="h-6 w-6 text-muted-foreground/30 mb-4 transition-colors duration-300"
              aria-hidden="true"
            />
            <blockquote className="text-foreground/90 leading-relaxed mb-6 relative z-10">
              <p>{testimonial.testimonial}</p>
            </blockquote>
            <figcaption className="flex items-center gap-3 relative z-10">
              <div className="size-8 rounded-full bg-secondary border border-border/60 flex items-center justify-center text-[10px] font-bold text-primary uppercase">
                {testimonial.name.substring(0, 2)}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground transition-colors duration-300">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      {hasMore && !expanded && (
        <div className="relative mt-0">
          <div className="absolute -top-24 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent pointer-events-none" />
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setExpanded(true)}
              className="btn btn-outline transition-all"
              aria-expanded={expanded}
              aria-controls="testimonials-grid"
            >
              {t('showMore')}
            </button>
          </div>
        </div>
      )}
      {hasMore && expanded && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setExpanded(false)}
            className={cn('btn btn-outline transition-all')}
            aria-expanded={expanded}
            aria-controls="testimonials-grid"
          >
            {t('showLess')}
          </button>
        </div>
      )}
    </div>
  );
}
