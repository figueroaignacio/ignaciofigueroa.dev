import { AssistantPerch } from '@/features/assistant/ui/assistant-perch';
import { LogoMark } from '@/shared/components/logo';
import { Section } from '@/shared/components/ui/section';
import { useTranslations } from 'next-intl';

/**
 * The mark, stated once.
 *
 * One line and the glyph — the same sentence the corner logo reveals on hover
 * and the footer signs off with. Explaining a monogram at length would break
 * the rule the monogram is built on.
 */
export function MarkSection() {
  const t = useTranslations();

  return (
    <Section id="mark" title={t('sections.mark.title')}>
      <div className="group flex items-center gap-5 sm:gap-6">
        {/* Same hairline square the rest of the page is built from, so the
            glyph reads as a specimen rather than a decoration. */}
        <div className="relative flex size-20 shrink-0 items-center justify-center rounded-sm border border-border bg-card sm:size-24">
          {/* Sat on the rim, looking in at the specimen. Kept small and to one
              side: this section argues for restraint, and a mascot in the
              middle of it would be arguing back. */}
          <AssistantPerch className="mark-perch" expression="reading" />
          <LogoMark size={44} className="logo-mark text-foreground" />
        </div>
        <p className="prose-reading min-w-0 text-muted-foreground">
          {t('components.logo.tagline')}
        </p>
      </div>
    </Section>
  );
}
