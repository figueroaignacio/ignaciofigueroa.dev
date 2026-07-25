import { getLocale, getTranslations } from 'next-intl/server';

interface EducationItem {
  title: string;
  institution: string;
  description: string;
  skills: string[];
  startDate: string;
  endDate: string | null;
}

function formatDate(dateString: string, locale: string): string {
  return new Date(dateString).toLocaleDateString(locale, {
    month: 'short',
    year: 'numeric',
  });
}

export async function EducationSection() {
  const t = await getTranslations('sections.education');
  const locale = await getLocale();
  const items = t.raw('items') as EducationItem[];

  if (!items || items.length === 0) return null;

  return (
    <section id="education" className="scroll-mt-12">
      <div className="mb-8">
        <h2 className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted">
          {t('title')}
        </h2>
        <div className="mt-3 h-px bg-rule" />
      </div>

      <ul className="divide-y divide-border">
        {items.map((item) => (
          <li key={item.title} className="py-6 first:pt-0 last:pb-0">
            <article className="space-y-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-[19px] md:text-[20px] font-medium text-foreground">
                  {item.title}{' '}
                  <span className="text-base font-normal text-muted-foreground">
                    {item.institution}
                  </span>
                </h3>
                <span className="shrink-0 text-[11px] font-mono tabular-nums text-muted tracking-wider">
                  {formatDate(item.startDate, locale)} —{' '}
                  {item.endDate ? formatDate(item.endDate, locale) : t('present')}
                </span>
              </div>
              {item.description && (
                <p className="text-sm text-muted-foreground/90 leading-relaxed">
                  {item.description}
                </p>
              )}
              {item.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center bg-secondary/30 border border-border/40 px-2 py-0.5 rounded-full text-[10px] font-mono text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
