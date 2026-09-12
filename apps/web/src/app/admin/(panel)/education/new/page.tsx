import { EducationForm } from '@/features/admin/ui/education/education-form';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'new entry' };

export default function NewEducationPage() {
  return <EducationForm />;
}
