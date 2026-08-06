import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import { getTranslations } from 'next-intl/server';

/**
 * The stack actually in use right now, front to back. Proper nouns only —
 * the AI chip is appended from i18n since it's the one label that translates.
 */
const CURRENT_STACK = ['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'FastAPI'];

export async function HeroStatus() {
  const t = await getTranslations('sections.home.status');

  return (
    <aside
      aria-label={t('label')}
      className="flex shrink-0 flex-col gap-5 border-t border-border pt-6 md:w-56 md:border-t-0 md:border-l md:pt-1 md:pl-6 lg:w-60"
    >
      <p className="flex items-start gap-2.5">
        <span
          aria-hidden="true"
          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand ring-4 ring-brand/15"
        />
        <a
          href={t('workingUrl')}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs leading-relaxed text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
        >
          {t('working')}
        </a>
      </p>

      {/* The one line in serif here: facts stay mono, the voice doesn't. */}
      <p className="font-serif text-[15px] leading-relaxed text-muted-strong italic">
        {t('motto')}
      </p>

      <div>
        <p className="type-label text-muted-foreground">{t('locationLabel')}</p>
        <p className="mt-1.5 font-mono text-xs leading-relaxed text-foreground">{t('location')}</p>
      </div>

      <div>
        <p className="type-label text-muted-foreground">{t('stackLabel')}</p>
        <TechChipGroup className="mt-2.5">
          {[...CURRENT_STACK, t('stackAi')].map((name) => (
            <TechChip key={name} tone="lead">
              {name}
            </TechChip>
          ))}
        </TechChipGroup>
      </div>
    </aside>
  );
}
