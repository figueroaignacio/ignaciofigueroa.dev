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
    <article className="space-y-3">
      <div
        className={`absolute left-0 top-1.5 size-[23px] rounded-full border-2 flex items-center justify-center ${
          experience.isCurrent ? 'border-foreground bg-foreground' : 'border-border bg-card'
        }`}
      >
        <HugeiconsIcon
          icon={Briefcase01Icon}
          className={`size-3 ${experience.isCurrent ? 'text-background' : 'text-muted-foreground'}`}
        />
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-semibold text-foreground">{experience.title}</h3>
          {experience.isCurrent && (
            <Badge variant="default" className="text-[10px] px-1.5 py-0">
              {locale === 'es' ? 'Actual' : 'Current'}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          {experience.link ? (
            <a
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              {experience.company}
              <HugeiconsIcon icon={LinkSquare02Icon} className="size-3" />
            </a>
          ) : (
            <span className="text-muted-foreground">{experience.company}</span>
          )}
          {experience.location && (
            <>
              <span className="text-muted-foreground/40">·</span>
              <span className="text-muted-foreground">{experience.location}</span>
            </>
          )}
        </div>
        <p className="text-xs text-muted-foreground/70">
          {formatDate(experience.startDate, locale)} —{' '}
          {experience.endDate
            ? formatDate(experience.endDate, locale)
            : locale === 'es'
              ? 'Presente'
              : 'Present'}
        </p>
      </div>

      {experience.tasks && experience.tasks.length > 0 && (
        <ul className="space-y-1.5">
          {experience.tasks.map((task) => (
            <li key={task.id} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
              <span className="text-muted-foreground/40 mt-0.5 shrink-0">▸</span>
              {task.item}
            </li>
          ))}
        </ul>
      )}

      {experience.technologies && experience.technologies.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {experience.technologies.map((tech) => (
            <Badge key={tech.id} variant="secondary" className="text-[11px]">
              {tech.name}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
