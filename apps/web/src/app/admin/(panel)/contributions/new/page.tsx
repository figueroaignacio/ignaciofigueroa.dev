import { getAdminTechStack } from '@/features/admin/api/admin.server';
import { ContributionForm } from '@/features/admin/ui/contributions/contribution-form';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'new contribution' };

export default async function NewContributionPage() {
  const technologies = await getAdminTechStack();
  return <ContributionForm technologies={technologies} />;
}
