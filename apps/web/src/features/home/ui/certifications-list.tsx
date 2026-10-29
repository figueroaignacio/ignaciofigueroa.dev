'use client';

import { Icon, type IconName } from '@/shared/components/tech-icons';
import { Collapsible } from '@/shared/components/ui/collapsible';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export interface CertificationItem {
  title: string;
  issuer: string;
  icon?: string;
  description: string;
  skills: string[];
  credentialId: string;
  credentialUrl: string;
}

const INITIAL_COUNT = 3;

function CertificationCard({ item, cta }: { item: CertificationItem; cta: string }) {
  const iconName = item.icon?.toLowerCase() as IconName | undefined;

  return (
    <article className="grid gap-x-8 gap-y-3 sm:grid-cols-[8.5rem_minmax(0,1fr)]">
      <div className="flex items-center gap-2 pt-0.5 text-[15px] text-muted-foreground">
        {iconName && <Icon name={iconName} width={16} height={16} />}
        {item.issuer}
      </div>
      <div className="flex min-w-0 flex-col gap-3">
        <h3 className="text-lg leading-snug font-semibold tracking-[-0.02em]">{item.title}</h3>
        <p className="text-[15px] leading-relaxed">{item.description}</p>
        {item.skills.length > 0 && (
          <TechChipGroup>
            {item.skills.map((skill) => (
              <TechChip key={skill}>{skill}</TechChip>
            ))}
          </TechChipGroup>
        )}
        <a
          href={item.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${cta}: ${item.title} (${item.credentialId})`}
          className="inline-flex min-h-11 w-fit items-center text-[15px] font-medium underline decoration-border underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
        >
          {cta} ↗
        </a>
      </div>
    </article>
  );
}

export function CertificationsList({ items }: { items: CertificationItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations('sections.certifications');

  const visible = items.slice(0, INITIAL_COUNT);
  const rest = items.slice(INITIAL_COUNT);

  return (
    <div className="relative">
      <ul className="space-y-12" data-reveal>
        {visible.map((item) => (
          <li key={item.credentialId}>
            <CertificationCard item={item} cta={t('cta')} />
          </li>
        ))}
      </ul>

      {rest.length > 0 && (
        <Collapsible open={expanded} onOpenChange={setExpanded}>
          <Collapsible.Content>
            <ul className="space-y-12 pt-12">
              {rest.map((item) => (
                <li key={item.credentialId}>
                  <CertificationCard item={item} cta={t('cta')} />
                </li>
              ))}
            </ul>
          </Collapsible.Content>
          <div className="pt-8 sm:ps-[10.5rem]">
            <Collapsible.Trigger className="inline-flex min-h-11 w-auto items-center rounded-full bg-secondary px-5 text-[15px] font-medium transition-colors hover:bg-foreground hover:text-background">
              {expanded ? t('showLess') : t('showMore')}
            </Collapsible.Trigger>
          </div>
        </Collapsible>
      )}
    </div>
  );
}
