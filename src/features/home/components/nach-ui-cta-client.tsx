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
    <div className="relative overflow-hidden">
      <div className="card-outline text-center relative z-10 overflow-hidden group">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute -right-20 -top-20 size-60 bg-primary/10 blur-[100px] rounded-full" />
        <div className="absolute -left-20 -bottom-20 size-60 bg-primary/5 blur-[100px] rounded-full" />

        <div className="relative z-20">
          <div className="inline-flex items-center gap-2 bg-secondary/50 backdrop-blur-sm border border-border rounded-full px-4 py-1 text-xs text-muted-foreground mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {t.badge}
          </div>

          <h2 className="text-3xl font-normal text-foreground mb-3 leading-tight tracking-tight">
            {t.title.replace('{count}', count.toString())}
          </h2>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-8 leading-relaxed text-balance">
            {t.description}
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            {actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className={action.className}
              >
                {action.label}
                {action.icon}
              </a>
            ))}
          </div>

          <div className="flex gap-6 justify-center mt-10 pt-8 border-t border-border/50">
            {stats.map((stat, index) => (
              <Fragment key={stat.label}>
                <div className="text-center group/stat">
                  <p className="text-2xl font-bold text-foreground group-hover/stat:text-primary transition-colors duration-300">
                    {stat.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
                {index < stats.length - 1 && <div className="w-px bg-border/50 my-2" />}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
