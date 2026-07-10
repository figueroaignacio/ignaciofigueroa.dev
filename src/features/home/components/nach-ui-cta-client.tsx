'use client';

import { Fragment } from 'react/jsx-runtime';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface NachUICtaProps {
  t: {
    badge: string;
    title: string;
    description: string;
    actions: {
      viewComponents: string;
      viewDocumentation: string;
    };
    href: {
      components: string;
      documentation: string;
    };
    stats: {
      components: string;
      openSource: string;
    };
  };
  count: number;
}

export function NachUICtaClient({ t, count }: NachUICtaProps) {
  const actions = [
    {
      label: t.actions.viewComponents,
      href: t.href.components,
      icon: (
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      ),
      className: 'btn btn-primary group',
    },
    {
      label: t.actions.viewDocumentation,
      href: t.href.documentation,
      icon: (
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      ),
      className: 'btn btn-outline group',
    },
  ];

  const stats = [
    {
      value: count,
      label: t.stats.components,
    },
    {
      value: '100%',
      label: t.stats.openSource,
    },
  ];

  return (
    <section id="nachui" className="scroll-mt-12">
      <div className="mb-8">
        <h2 className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted">
          {t.badge}
        </h2>
        <div className="mt-3 h-px bg-rule" />
      </div>

      <div className="space-y-4">
        <h3 className="text-[20px] md:text-[22px] font-medium text-foreground tracking-tight leading-tight">
          {t.title.replace('{count}', count.toString())}
        </h3>
        <div className="prose-reading">
          <p>{t.description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2">
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors underline decoration-border/60 hover:decoration-primary"
            >
              {action.label.toLowerCase()}
            </a>
          ))}
          <span className="text-xs font-mono text-muted-foreground/60">
            ({count} {t.stats.components} · 100% {t.stats.openSource})
          </span>
        </div>
      </div>
    </section>
  );
}
