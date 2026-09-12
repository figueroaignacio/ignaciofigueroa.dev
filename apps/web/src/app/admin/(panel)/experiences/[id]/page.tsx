import { getAdminExperience } from '@/features/admin/api/admin.server';
import { ExperienceForm } from '@/features/admin/ui/experiences/experience-form';
import { ApiError } from '@/shared/lib/api-error';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function load(id: string) {
  try {
    return await getAdminExperience(id);
  } catch (error) {
    if (error instanceof ApiError && (error.status === 404 || error.status === 400)) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const experience = await load(id);
  return { title: experience.title };
}

export default async function EditExperiencePage({ params }: PageProps) {
  const { id } = await params;
  const experience = await load(id);
  return <ExperienceForm key={experience.id} experience={experience} />;
}
