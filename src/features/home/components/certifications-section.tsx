import { Icon, type IconName } from '@/shared/components/tech-icons';
import { ItemCard } from '@/shared/components/ui/item-card';
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
    <section id="certifications" className="scroll-mt-12">
      <div className="mb-8">
        <h2 className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted">
          {t('title')}
        </h2>
        <div className="mt-3 h-px bg-rule" />
      </div>

      <ul className="space-y-4">
        {items.map((item) => {
          const iconName = item.icon?.toLowerCase() as IconName | undefined;

          return (
            <li key={item.credentialId}>
              <ItemCard
                header={
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="flex items-center gap-2 text-[19px] md:text-[20px] font-medium text-foreground">
                      {iconName && <Icon name={iconName} width={20} height={20} />}
                      {item.title}{' '}
                      <span className="text-base font-normal text-muted-foreground">
                        · {item.issuer}
                      </span>
                    </h3>
                    <span className="shrink-0 text-[11px] font-mono tabular-nums text-muted tracking-wider">
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
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center bg-secondary/30 border border-border/40 px-2 py-0.5 rounded-full text-[10px] font-mono text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
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
    </section>
  );
}
