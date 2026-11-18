'use client';

import { formatDate } from '@/shared/lib/format-date';
import { useLocale, useTranslations } from 'next-intl';
import { DeskObjectPanel } from './desk-object-panel';

interface EducationItem {
  title: string;
  institution: string;
  description: string;
  startDate: string;
  endDate: string | null;
}

interface CertificationItem {
  title: string;
  issuer: string;
  issueDate?: string;
  credentialUrl: string;
}

export function DeskNotebook({ path }: { path: string }) {
  const t = useTranslations('sections');
  const locale = useLocale();
  const education = t.raw('education.items') as EducationItem[];
  const certifications = t.raw('certifications.items') as CertificationItem[];

  return (
    <DeskObjectPanel path={path} label={t('education.title')}>
      <div className="desk-object-body">
        <div className="desk-notebook">
          <section className="desk-page">
            <h2 className="text-3xl leading-none font-bold tracking-[-0.035em]">
              {t('education.title')}
            </h2>
            {education.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-1.5 border-b border-black/15 pb-5 last:border-0"
              >
                <span className="font-code text-xs text-[#4a4a4a]">
                  {formatDate(item.startDate, locale)} —{' '}
                  {item.endDate ? formatDate(item.endDate, locale) : t('education.present')}
                </span>
                <h3 className="text-xl leading-snug font-semibold tracking-[-0.02em]">
                  {item.title}
                </h3>
                <span className="text-[15px] text-[#3d3d3d]">
                  {t('education.connector')} {item.institution}
                </span>
                <p className="text-sm leading-relaxed text-[#2b2b2b]">{item.description}</p>
              </div>
            ))}
          </section>
          <section className="desk-page">
            <h2 className="text-3xl leading-none font-bold tracking-[-0.035em]">
              {t('certifications.title')}
            </h2>
            <ul className="flex flex-col border-t border-black/15">
              {certifications.map((item) => (
                <li key={item.title} className="border-b border-black/15">
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid min-h-12 grid-cols-[4.75rem_minmax(0,1fr)_auto] items-center gap-2.5 py-1.5"
                  >
                    <span className="font-code text-xs text-[#4a4a4a]">{item.issuer}</span>
                    <span className="text-[15px] leading-snug font-semibold tracking-[-0.01em]">
                      {item.title}
                    </span>
                    <span className="font-code text-[0.6875rem] text-[#4a4a4a]">
                      {item.issueDate ?? ''}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </DeskObjectPanel>
  );
}
