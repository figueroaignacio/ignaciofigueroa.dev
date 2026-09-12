import { ExperienceForm } from '@/features/admin/ui/experiences/experience-form';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'new role' };

export default function NewExperiencePage() {
  return <ExperienceForm />;
}
