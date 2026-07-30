import { Badge } from '@/shared/components/ui/badge';
import { formatDate } from '@/shared/lib/format-date';
import { Experience } from '@/payload-types';
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
        className={`absolute left-0 top-1.5 size-[23px] rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
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
          <h3 className="font-semibold text-foreground tracking-tight text-sm sm:text-base">
            {experience.title}
          </h3>
          {experience.isCurrent && (
            <Badge className="text-[10px] px-1.5 py-0 bg-foreground text-background hover:opacity-90 border-none font-medium rounded-md">
              {locale === 'es' ? 'Actual' : 'Current'}
            </Badge>
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
        <p className="text-[11px] text-muted-foreground/50 font-medium">
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
        <div className="flex flex-wrap gap-1.5 pt-1">
          {experience.technologies.map((tech) => (
            <span
              key={tech.id}
              className="inline-flex items-center bg-secondary/30 border border-border/40 px-2 py-0.5 rounded-full text-[10px] font-mono text-muted-foreground"
            >
              {tech.name}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
