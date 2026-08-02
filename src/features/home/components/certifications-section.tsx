import { Section } from '@/shared/components/ui/section';
import { getTranslations } from 'next-intl/server';
import { CertificationsList, type CertificationItem } from './certifications-list';

export async function CertificationsSection() {
  const t = await getTranslations('sections.certifications');
  const items = t.raw('items') as CertificationItem[];

  if (!items || items.length === 0) return null;

  return (
    <Section id="certifications" title={t('title')}>
      <CertificationsList items={items} />
    </Section>
  );
}
