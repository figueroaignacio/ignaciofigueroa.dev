'use client';

import { ItemCard } from '@/shared/components/ui/item-card';
import { Section } from '@/shared/components/ui/section';

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
    },
    {
      label: t.actions.viewDocumentation,
      href: t.href.documentation,
    },
  ];

  return (
    <Section id="nachui" title={t.badge}>
      <ItemCard
        header={
          <h3 className="type-item-title text-foreground">
            {t.title.replace('{count}', count.toString())}
          </h3>
        }
      >
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-muted-foreground">{t.description}</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
            {actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-muted-foreground hover:text-brand transition-colors underline decoration-border/60 hover:decoration-brand"
              >
                {action.label.toLowerCase()}
              </a>
            ))}
            <span className="text-xs font-mono text-muted-foreground/60">
              ({count} {t.stats.components} · 100% {t.stats.openSource})
            </span>
          </div>
        </div>
      </ItemCard>
    </Section>
  );
}
