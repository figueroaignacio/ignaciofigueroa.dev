import { Experience } from '@/payload-types';
import { Badge } from '@/shared/components/ui/badge';
import { TechChip, TechChipGroup } from '@/shared/components/ui/tech-chip';
import { Timeline } from '@/shared/components/ui/timeline';
import { formatDate } from '@/shared/lib/format-date';
import { Briefcase01Icon, LinkSquare02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface ChatExperienceCardProps {
  experience: Experience;
  locale: string;
  step: number;
}

export function ChatExperienceCard({ experience, locale, step }: ChatExperienceCardProps) {
  const start = formatDate(experience.startDate, locale);
  const end = experience.endDate
    ? formatDate(experience.endDate, locale)
    : locale === 'es'
      ? 'Presente'
      : 'Present';

  return (
    <Timeline.Item step={step} className="group ps-10 pb-8">
      <Timeline.Indicator className="size-6 border-2 [&_svg]:size-3">
        {experience.isCurrent && (
          <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-30" />
        )}
        <HugeiconsIcon icon={Briefcase01Icon} />
      </Timeline.Indicator>
      <Timeline.Separator />

      <Timeline.Header className="gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <Timeline.Title className="text-sm tracking-tight sm:text-base">
            {experience.title}
          </Timeline.Title>
          {experience.isCurrent && (
            <Badge variant="secondary">{locale === 'es' ? 'actual' : 'current'}</Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm">
          {experience.link ? (
            <a
              href={experience.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
            >
              {experience.company}
              <HugeiconsIcon icon={LinkSquare02Icon} className="size-3" />
            </a>
          ) : (
            <span className="font-medium text-muted-foreground">{experience.company}</span>
          )}
          {experience.location && (
            <>
              <span className="text-muted-foreground/30">·</span>
              <span className="text-muted-foreground/80">{experience.location}</span>
            </>
          )}
        </div>
        <Timeline.Date dateTime={experience.startDate} className="type-meta tracking-wider">
          {start} — {end}
        </Timeline.Date>
      </Timeline.Header>

      {((experience.tasks && experience.tasks.length > 0) ||
        (experience.technologies && experience.technologies.length > 0)) && (
        <Timeline.Content className="mt-2 space-y-3 text-foreground/80">
          {experience.tasks && experience.tasks.length > 0 && (
            <ul className="list-disc space-y-1.5 pl-4 text-[13px] leading-relaxed marker:text-muted-foreground/45">
              {experience.tasks.map((task) => (
                <li key={task.id}>{task.item}</li>
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
        </Timeline.Content>
      )}
    </Timeline.Item>
  );
}
