import { Markdown } from '@/shared/components/markdown';

export interface ExperienceEntry {
  key: string;
  title: string;
  company: string;
  companyHref?: string | null;
  employmentType?: string | null;
  period: string;
  location?: string | null;
  description?: string | null;
  tasks: string[];
  skills: string[];
  moreSkills?: string;
}

export function ExperienceList({ items }: { items: ExperienceEntry[] }) {
  return (
    <ul className="flex flex-col gap-12" data-reveal>
      {items.map((item) => (
        <li key={item.key}>
          <article className="flex items-start gap-4 sm:gap-5">
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center bg-secondary text-[17px] font-bold sm:size-12 sm:text-xl"
            >
              {item.company.trim().charAt(0).toUpperCase()}
            </span>

            <div className="min-w-0 flex-1">
              <h3 className="text-lg leading-snug font-semibold tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="text-[15px]">
                {item.companyHref ? (
                  <a
                    href={item.companyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-border underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                  >
                    {item.company}
                  </a>
                ) : (
                  item.company
                )}
                {item.employmentType && ` · ${item.employmentType}`}
              </p>
              <p className="text-[15px] text-muted-foreground tabular-nums">{item.period}</p>
              {item.location && (
                <p className="text-[15px] text-muted-foreground">{item.location}</p>
              )}

              {item.description && (
                <div className="mt-4 text-[15px] leading-relaxed sm:text-base [&_li]:mt-1.5 [&_p]:mt-3 [&_p:first-child]:mt-0 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:ps-5">
                  <Markdown>{item.description}</Markdown>
                </div>
              )}

              {item.tasks.length > 0 && (
                <ul className="mt-3 list-disc space-y-1.5 ps-5 text-[15px] leading-relaxed sm:text-base">
                  {item.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              )}

              {item.companyHref && (
                <a
                  href={item.companyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium underline decoration-border underline-offset-4 transition-colors hover:text-brand hover:decoration-brand"
                >
                  → {new URL(item.companyHref).host.replace(/^www\./, '')}
                </a>
              )}

              {item.skills.length > 0 && (
                <p className="mt-2 text-[15px] font-semibold">
                  {item.skills.join(' · ')}
                  {item.moreSkills && (
                    <span className="font-normal text-muted-foreground"> {item.moreSkills}</span>
                  )}
                </p>
              )}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
