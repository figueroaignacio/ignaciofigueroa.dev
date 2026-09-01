'use client';

import { Icon, type IconName } from '@/shared/components/tech-icons';
import { Collapsible } from '@/shared/components/ui/collapsible';
import { Frame } from '@/shared/components/ui/frame';
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
    <Frame>
      <Frame.Header className="flex-row flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <Frame.Title className="flex items-center gap-2 type-item-title text-foreground">
          {iconName && <Icon name={iconName} width={20} height={20} />}
          {item.title}{' '}
          <span className="text-base font-normal text-muted-foreground">· {item.issuer}</span>
        </Frame.Title>
        <span className="shrink-0 type-meta text-muted-foreground tracking-wider">
          {item.credentialId}
        </span>
      </Frame.Header>
      <Frame.Panel>
        <article className="space-y-2">
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          {item.skills.length > 0 && (
            <TechChipGroup className="pt-1">
              {item.skills.map((skill) => (
                <TechChip key={skill}>{skill}</TechChip>
              ))}
            </TechChipGroup>
          )}
          <div className="pt-1">
            <a
              href={item.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-muted-foreground hover:text-brand transition-colors underline decoration-border/60 hover:decoration-brand"
            >
              {cta} ↗
            </a>
          </div>
        </article>
      </Frame.Panel>
    </Frame>
  );
}

export function CertificationsList({ items }: { items: CertificationItem[] }) {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations('sections.certifications');

  const visible = items.slice(0, INITIAL_COUNT);
  const rest = items.slice(INITIAL_COUNT);

  return (
    <div className="relative">
      <ul className="scroll-stagger space-y-4">
        {visible.map((item) => (
          <li key={item.credentialId}>
            <CertificationCard item={item} cta={t('cta')} />
          </li>
        ))}
      </ul>

      {rest.length > 0 && (
        <Collapsible open={expanded} onOpenChange={setExpanded}>
          <Collapsible.Content>
            <ul className="space-y-4 pt-4">
              {rest.map((item) => (
                <li key={item.credentialId}>
                  <CertificationCard item={item} cta={t('cta')} />
                </li>
              ))}
            </ul>
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
