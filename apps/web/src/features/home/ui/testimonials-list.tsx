'use client';

import { Collapsible } from '@/shared/components/ui/collapsible';
import { cn } from '@/shared/lib/cn';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface TestimonialData {
  id: string;
  testimonial: string;
  name: string;
  role: string;
  avatar: string | null;
  url: string | null;
}

const INITIAL_COUNT = 2;

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function TestimonialCard({
  testimonial,
  lead = false,
}: {
  testimonial: TestimonialData;
  lead?: boolean;
}) {
  return (
    <figure data-ui className={cn('m-0 flex gap-4', !lead && 'sm:ps-14')}>
      {testimonial.avatar ? (
        <Image
          src={testimonial.avatar}
          alt=""
          width={80}
          height={80}
          className={cn('shrink-0 rounded-full object-cover', lead ? 'size-10' : 'size-9')}
        />
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full bg-foreground font-semibold text-background',
            lead ? 'size-10 text-[15px]' : 'size-9 text-[0.8125rem]',
          )}
        >
          {initials(testimonial.name)}
        </span>
      )}
      <div className="flex min-w-0 flex-col gap-2">
        <figcaption className="flex flex-col text-[15px] leading-snug">
          {testimonial.url ? (
            <a
              href={testimonial.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit font-semibold underline-offset-4 hover:underline"
            >
              {testimonial.name}
              <span aria-hidden="true" className="text-muted-foreground">
                {' '}
                ↗
              </span>
            </a>
          ) : (
            <span className="font-semibold">{testimonial.name}</span>
          )}
          <span className="text-muted-foreground">{testimonial.role}</span>
        </figcaption>
        <blockquote
          className={cn(
            'm-0 rounded-xl rounded-tl-none bg-(--stage) px-5 py-4 text-pretty',
            lead
              ? 'text-lg leading-snug font-medium tracking-[-0.015em]'
              : 'text-[15px] leading-relaxed',
          )}
        >
          <p>{testimonial.testimonial}</p>
        </blockquote>
      </div>
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
      <div className="flex flex-col gap-y-8" data-reveal>
        {visible.map((testimonial, index) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} lead={index === 0} />
        ))}
      </div>

      {rest.length > 0 && (
        <Collapsible open={expanded} onOpenChange={setExpanded}>
          <Collapsible.Content>
            <div className="flex flex-col gap-y-8 pt-8">
              {rest.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </Collapsible.Content>
          <div className="pt-8 sm:ps-14">
            <Collapsible.Trigger className="inline-flex min-h-11 w-auto items-center rounded-full bg-secondary px-5 text-[15px] font-medium transition-colors hover:bg-foreground hover:text-background">
              {expanded ? t('showLess') : t('showMore')}
            </Collapsible.Trigger>
          </div>
        </Collapsible>
      )}
    </div>
  );
}
