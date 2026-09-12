import { getAdminEducationEntry } from '@/features/admin/api/admin.server';
import { EducationForm } from '@/features/admin/ui/education/education-form';
import { ApiError } from '@/shared/lib/api-error';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function load(id: string) {
  try {
    return await getAdminEducationEntry(id);
  } catch (error) {
    if (error instanceof ApiError && (error.status === 404 || error.status === 400)) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const entry = await load(id);
  return { title: entry.title };
}

export default async function EditEducationPage({ params }: PageProps) {
  const { id } = await params;
  const entry = await load(id);
  return <EducationForm key={entry.id} entry={entry} />;
}
