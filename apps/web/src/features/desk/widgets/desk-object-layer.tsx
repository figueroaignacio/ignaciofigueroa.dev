'use client';

import { useTranslations } from 'next-intl';
import { isLaptopPanel, useDesk } from '../lib/desk-store';
import { pathLabel } from '../lib/path-label';
import { DeskBooks } from '../ui/desk-books';
import { DeskNotebook } from '../ui/desk-notebook';
import { DeskPhone } from '../ui/desk-phone';
import { DeskPhotos, type DeskTestimonial } from '../ui/desk-photos';

export function DeskObjectLayer({ testimonials }: { testimonials: DeskTestimonial[] }) {
  const desk = useDesk();
  const t = useTranslations('ui.sectionIndex');

  if (desk.mode !== 'on' || !desk.panel || isLaptopPanel(desk.panel)) return null;

  switch (desk.panel) {
    case 'education':
      return <DeskNotebook path={pathLabel(t('education'))} />;
    case 'stack':
      return <DeskBooks path={pathLabel(t('stack'))} />;
    case 'testimonials':
      return <DeskPhotos path={pathLabel(t('testimonials'))} items={testimonials} />;
    case 'contact':
      return <DeskPhone path={pathLabel(t('contact'))} />;
    default:
      return null;
  }
}
