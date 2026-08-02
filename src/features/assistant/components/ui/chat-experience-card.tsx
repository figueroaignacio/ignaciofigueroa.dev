import { Experience } from '@/payload-types';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import { formatDate } from '@/shared/lib/format-date';
import { Briefcase01Icon, LinkSquare02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface ChatExperienceCardProps {
  experience: Experience;
  locale: string;
}

export function ChatExperienceCard({ experience, locale }: ChatExperienceCardProps) {
  return (
    <article className="space-y-3 relative group">
      {}
      <div
        className={`absolute left-0 top-1.5 size-5.75 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
          experience.isCurrent
            ? 'border-foreground bg-foreground'
            : 'border-border/60 bg-muted/40 group-hover:border-foreground/50'
        }`}
      >
        {experience.isCurrent && (
          <span className="absolute inset-0 rounded-full bg-foreground opacity-30 animate-ping" />
        )}
        <HugeiconsIcon
          icon={Briefcase01Icon}
          className={`size-3 transition-colors ${experience.isCurrent ? 'text-background' : 'text-muted-foreground'}`}
        />
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-medium text-foreground tracking-tight text-sm sm:text-base">
            {experience.title}
          </h3>
          {experience.isCurrent && (
            <span className="inline-flex items-center rounded-full bg-accent text-accent-foreground px-2 py-0.5 type-chip">
              {locale === 'es' ? 'actual' : 'current'}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          {experience.link ? (
            <a
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground hover:underline underline-offset-2 transition-colors inline-flex items-center gap-1 font-medium"
            >
              {experience.company}
              <HugeiconsIcon icon={LinkSquare02Icon} className="size-3" />
            </a>
          ) : (
            <span className="text-muted-foreground font-medium">{experience.company}</span>
          )}
          {experience.location && (
            <>
              <span className="text-muted-foreground/30">·</span>
              <span className="text-muted-foreground/80">{experience.location}</span>
            </>
          )}
        </div>
        <p className="type-meta text-muted-foreground tracking-wider">
          {formatDate(experience.startDate, locale)} —{' '}
          {experience.endDate
            ? formatDate(experience.endDate, locale)
            : locale === 'es'
              ? 'Presente'
              : 'Present'}
        </p>
      </div>

      {experience.tasks && experience.tasks.length > 0 && (
        <ul className="space-y-1.5 mt-2">
          {experience.tasks.map((task) => (
            <li
              key={task.id}
              className="text-[13px] text-foreground/80 leading-relaxed flex gap-2 items-start"
            >
              <span className="text-muted-foreground/40 mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-muted-foreground/45 block" />
              <span>{task.item}</span>
            </li>
          ))}
        </ul>
      )}

      {experience.technologies && experience.technologies.length > 0 && (
        <TechChipGroup className="gap-1.5 pt-1">
          {experience.technologies.map((tech) => (
            <TechChip key={tech.id}>{tech.name}</TechChip>
          ))}
        </TechChipGroup>
      )}
    </article>
  );
}
