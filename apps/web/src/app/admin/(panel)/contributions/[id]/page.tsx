import { getAdminContribution, getAdminTechStack } from '@/features/admin/api/admin.server';
import { ContributionForm } from '@/features/admin/ui/contributions/contribution-form';
import { ApiError } from '@/shared/lib/api-error';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function load(id: string) {
  try {
    return await getAdminContribution(id);
  } catch (error) {
    if (error instanceof ApiError && (error.status === 404 || error.status === 400)) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const contribution = await load(id);
  return { title: contribution.title };
}

export default async function EditContributionPage({ params }: PageProps) {
  const { id } = await params;
  const [contribution, technologies] = await Promise.all([load(id), getAdminTechStack()]);
  return (
    <ContributionForm
      key={contribution.id}
      contribution={contribution}
      technologies={technologies}
    />
  );
}
