'use client';

import { Collapsible } from '@/shared/components/ui/collapsible';
import { Frame } from '@/shared/components/ui/frame';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface TestimonialData {
  id: number;
  testimonial: string;
  name: string;
  role: string;
}

const INITIAL_COUNT = 2;

function TestimonialCard({ testimonial }: { testimonial: TestimonialData }) {
  return (
    <figure className="m-0">
      <Frame>
        <Frame.Panel className="bg-background">
          <blockquote className="prose-reading italic text-[15px] md:text-[16px] text-foreground/95">
            <p>"{testimonial.testimonial}"</p>
          </blockquote>
        </Frame.Panel>
        <Frame.Footer>
          <figcaption className="text-xs font-mono text-muted-foreground uppercase tracking-wide">
            — {testimonial.name}, {testimonial.role.toLowerCase()}
          </figcaption>
        </Frame.Footer>
      </Frame>
    </figure>
  );
}

export function TestimonialsList({ testimonials }: { testimonials: TestimonialData[] }) {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations('sections.testimonials');

  const visible = testimonials.slice(0, INITIAL_COUNT);
  const rest = testimonials.slice(INITIAL_COUNT);

  return (
    <div className="relative">
      <div className="scroll-stagger flex flex-col gap-y-4">
        {visible.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {rest.length > 0 && (
        <Collapsible open={expanded} onOpenChange={setExpanded}>
          <Collapsible.Content>
            <div className="flex flex-col gap-y-4 pt-4">
              {rest.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </Collapsible.Content>
          <div className="flex justify-center pt-6">
            <Collapsible.Trigger className="w-auto text-xs font-mono text-muted-foreground hover:text-foreground underline decoration-border/60 hover:decoration-foreground">
              {expanded ? t('showLess').toLowerCase() : t('showMore').toLowerCase()}
            </Collapsible.Trigger>
          </div>
        </Collapsible>
      )}
    </div>
  );
}
