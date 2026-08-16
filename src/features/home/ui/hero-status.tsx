import { PixelMate } from '@/shared/components/pixel-mate';
import { AskAiLinks } from './ask-ai-links';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import { getTranslations } from 'next-intl/server';

/**
 * The stack actually in use right now, front to back. Proper nouns only —
 * the AI chip is appended from i18n since it's the one label that translates.
 */
const CURRENT_STACK = ['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'FastAPI'];

export async function HeroStatus() {
  const t = await getTranslations('sections.home.status');
  const tAskAi = await getTranslations('sections.askAi');

  return (
    <aside
      aria-label={t('label')}
      className="flex shrink-0 flex-col gap-5 border-t border-border pt-6 md:w-56 md:border-t-0 md:border-l md:pt-1 md:pl-6 lg:w-60"
    >
      {/* Link and its aside travel together, so the rail's gap-5 spaces the
          pair as one block instead of stranding the note between them. The
          group lets the whole annotation answer to a hover on either half. */}
      <div className="group flex items-start gap-2.5">
        <span
          aria-hidden="true"
          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand ring-4 ring-brand/15"
        />
        {/* w-fit so the brace spans exactly the link's width — the rail's own
            width would leave it hanging past the end of the text, and the
            translated link is a different length in each locale. */}
        <div className="w-fit">
          {/* block, not inline: as an inline the link sits in a line box built
              from the rail's inherited 16px/1.625 (26px) rather than its own
              12px/1.625 (19.5px), which drops the text 7px and leaves the
              bullet floating above it. */}
          <a
            href={t('workingUrl')}
            target="_blank"
            rel="noopener noreferrer"
            className="block font-mono text-xs leading-relaxed text-foreground underline decoration-border underline-offset-4 transition-colors group-hover:text-brand group-hover:decoration-brand"
          >
            {t('working')}
          </a>

          {/* Borders, not an SVG: a brace drawn as a path would need its
              corner radii distorted to stretch across a variable-width link. */}
          <div aria-hidden="true" className="mt-2">
            <div className="hero-brace h-1.5 rounded-b-[5px] border-x border-b border-brand/50 transition-colors duration-300 group-hover:border-brand" />
            <div className="hero-brace-stem mx-auto h-1.5 w-px bg-brand/50 transition-colors duration-300 group-hover:bg-brand" />
          </div>

          {/* Serif italic on purpose: the rail is all mono facts, so the one
              line that's a human aside gets a different voice. */}
          <p className="hero-note mt-1 text-center font-serif text-[13.5px] leading-snug text-muted-strong italic">
            {t('madeThat')}
          </p>
        </div>
      </div>

      <div>
        <p className="type-label text-muted-foreground">{t('locationLabel')}</p>
        <p className="mt-1.5 flex items-center gap-1.5 font-mono text-xs leading-relaxed text-foreground">
          <PixelMate className="text-muted-foreground" />
          {t('location')}
        </p>
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

      <div>
        <p className="type-label text-muted-foreground">{tAskAi('heroLabel')}</p>
        {/* Stacked, not in a row: the rail is 224px and three labelled links
            wrap into a ragged block at that width. */}
        <AskAiLinks className="mt-2.5 flex-col items-start gap-y-2" />
      </div>
    </aside>
  );
}
