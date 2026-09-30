import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { ScrambleText } from '@/shared/components/scramble-text';
import { getTranslations } from 'next-intl/server';
import { HeroStatus } from './hero-status';

export async function HomeHero() {
  const t = await getTranslations('sections.home');
  const [firstName = '', ...rest] = t('name').split(' ');
  const lastName = rest.join(' ');
  const [role = '', ...roleRest] = t('title').split(' ');
  const roleTail = roleRest.join(' ');

  return (
    <header className="flex min-h-0 min-w-0 flex-1 flex-col justify-end gap-7 py-8 lg:gap-9 lg:py-0 lg:pb-4">
      <h1 className="max-w-[9em] text-[clamp(3rem,min(13vw,10vh),8.5rem)] leading-[0.82] font-black tracking-[-0.075em] uppercase">
        <span className="mr-[0.22em] inline-block">
          <ScrambleText text={firstName} />
        </span>
        <span className="mr-[0.22em] inline-block">
          <ScrambleText text={lastName} />
        </span>
        <span className="mr-[0.22em] inline-block bg-brand px-[0.06em] pt-[0.06em] text-brand-foreground">
          {role}
        </span>
        {roleTail ? (
          <span className="inline-block bg-brand px-[0.06em] pt-[0.06em] text-brand-foreground">
            {roleTail}
          </span>
        ) : null}
      </h1>

      <div className="flex flex-col gap-6 border-t-2 border-foreground pt-6">
        <div className="flex max-w-[36rem] flex-col gap-4">
          <p className="text-lg leading-tight font-bold tracking-[-0.03em] text-pretty text-foreground sm:text-xl">
            {t('description')}
          </p>
          <div className="flex items-center gap-3">
            <Avatar size="sm" className="hero-avatar shrink-0 border border-border/60">
              <AvatarImage
                src="/images/profile-photo.webp"
                alt="Ignacio Figueroa"
                width={64}
                height={64}
                fetchPriority="high"
                className="object-cover object-top"
              />
              <AvatarFallback className="font-mono text-[10px]">IF</AvatarFallback>
            </Avatar>
            <HeroStatus />
          </div>
        </div>
      </div>
    </header>
  );
}
