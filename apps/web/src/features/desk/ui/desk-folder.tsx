'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { DeskObjectPanel } from './desk-object-panel';

const CV = {
  es: {
    label: 'Español',
    pdf: '/pdf/cv_ignacio_figueroa_frontend_product_engineer_es.pdf',
    page: '/images/desk/cv-es.webp',
  },
  en: {
    label: 'English',
    pdf: '/pdf/cv_ignacio_figueroa_frontend_product_engineer_en.pdf',
    page: '/images/desk/cv-en.webp',
  },
} as const;

type CvLocale = keyof typeof CV;

export function DeskFolder({ path }: { path: string }) {
  const t = useTranslations('ui.desk.folder');
  const tHome = useTranslations('sections.home');
  const locale = useLocale();
  const [language, setLanguage] = useState<CvLocale>(locale === 'en' ? 'en' : 'es');
  const cv = CV[language];

  return (
    <DeskObjectPanel path={path} label={t('meta')} closeLabel={t('close')}>
      <div className="desk-object-body desk-folder">
        <div className="desk-folder-spread">
          <div className="desk-folder-leaf desk-folder-left" aria-hidden="true">
            <p className="desk-folder-note">
              {t('note')}
              <span>{t('sign')}</span>
            </p>
            <div className="desk-folder-card">
              <span className="desk-folder-card-name">
                {tHome('name')}
                <i />
              </span>
              <span className="text-[0.8125rem] text-[#4a4a4a]">Frontend Product Engineer</span>
              <span className="font-code mt-auto text-[0.6875rem] leading-relaxed text-[#3d3d3d]">
                contact@ignaciofigueroa.dev
                <br />
                ignaciofigueroa.dev
              </span>
            </div>
            <span className="desk-folder-pocket" />
          </div>
          <div className="desk-folder-leaf desk-folder-right">
            <span className="desk-folder-tab" aria-hidden="true" />
            <a
              href={cv.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="desk-folder-page"
              aria-label={t('open')}
            >
              <Image
                key={cv.page}
                src={cv.page}
                alt={t('alt')}
                width={1100}
                height={1424}
                sizes="(min-width: 64rem) 26rem, 80vw"
              />
            </a>
            <span className="desk-folder-clip" aria-hidden="true" />
          </div>
        </div>

        <aside className="desk-island desk-folder-actions">
          <span className="font-code px-1.5 text-xs text-muted-foreground">{t('meta')}</span>
          <a href={cv.pdf} download className="desk-folder-action desk-folder-primary">
            {t('download')}
            <span aria-hidden="true">↓</span>
          </a>
          <div role="radiogroup" aria-label={t('languages')} className="desk-folder-languages">
            {(Object.keys(CV) as CvLocale[]).map((key) => (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={language === key}
                onClick={() => setLanguage(key)}
              >
                {CV[key].label}
              </button>
            ))}
          </div>
          <a href={cv.pdf} target="_blank" rel="noopener noreferrer" className="desk-folder-action">
            {t('open')}
            <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </div>
    </DeskObjectPanel>
  );
}
