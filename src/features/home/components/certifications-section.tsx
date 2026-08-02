import { Icon, type IconName } from '@/shared/components/tech-icons';
import { ItemCard } from '@/shared/components/ui/item-card';
import { Section } from '@/shared/components/ui/section';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import { getTranslations } from 'next-intl/server';

interface CertificationItem {
  title: string;
  issuer: string;
  icon?: string;
  description: string;
  skills: string[];
  credentialId: string;
  credentialUrl: string;
}

export async function CertificationsSection() {
  const t = await getTranslations('sections.certifications');
  const items = t.raw('items') as CertificationItem[];

  if (!items || items.length === 0) return null;

  return (
    <Section id="certifications" title={t('title')}>
      <ul className="space-y-4">
        {items.map((item) => {
          const iconName = item.icon?.toLowerCase() as IconName | undefined;

          return (
            <li key={item.credentialId}>
              <ItemCard
                header={
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="flex items-center gap-2 type-item-title text-foreground">
                      {iconName && <Icon name={iconName} width={20} height={20} />}
                      {item.title}{' '}
                      <span className="text-base font-normal text-muted-foreground">
                        · {item.issuer}
                      </span>
                    </h3>
                    <span className="shrink-0 type-meta text-muted-foreground tracking-wider">
                      {item.credentialId}
                    </span>
                  </div>
                }
              >
                <article className="space-y-2">
                  <p className="text-sm text-muted-foreground/90 leading-relaxed">
                    {item.description}
                  </p>
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
                      className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors underline decoration-border/60 hover:decoration-primary"
                    >
                      {t('cta')} ↗
                    </a>
                  </div>
                </article>
              </ItemCard>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
