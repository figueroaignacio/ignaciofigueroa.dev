'use client';

import { experiencesApi } from '../../api/admin.client';
import { DeleteDialog } from '../delete-dialog';

export function DeleteExperienceButton({ id, title }: { id: string; title: string }) {
  return <DeleteDialog name={title} onConfirm={() => experiencesApi.remove(id)} />;
}
