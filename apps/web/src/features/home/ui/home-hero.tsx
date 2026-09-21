import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { getTranslations } from 'next-intl/server';
import { HeroStatus } from './hero-status';
import { ScrambleText } from '@/shared/components/scramble-text';
import { HeroActions } from './home-hero-actions';

export async function HomeHero() {
  const t = await getTranslations('sections.home');
  const tCv = await getTranslations('components.ctaCv');

  return (
    <header className="flex min-w-0 flex-1 flex-col justify-center py-10 lg:py-0">
      <Avatar
        size="lg"
        className="hero-avatar mb-5 size-16 border border-border/60 shadow-[0_12px_32px_-16px_oklch(0%_0_0/0.6)] lg:size-20"
      >
        <AvatarImage
          src="/images/profile-photo.webp"
          alt="Ignacio Figueroa"
          width={160}
          height={160}
          fetchPriority="high"
          className="object-cover object-top"
        />
        <AvatarFallback className="font-mono text-sm">IF</AvatarFallback>
      </Avatar>
      <h1 className="type-display text-foreground lg:text-[2.5rem] xl:text-[3rem]">
        <ScrambleText text={t('name')} />
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted-strong">{t('title')}</p>
      <div className="prose-reading mt-4 max-w-md">
        <p>{t('description')}</p>
      </div>
      <HeroStatus />
      <HeroActions cvLabel={tCv('cta.text')} cvUrl={tCv('url')} />
    </header>
  );
}
