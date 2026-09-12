'use client';

import { projectsApi } from '../../api/admin.client';
import { DeleteDialog } from '../delete-dialog';

export function DeleteProjectButton({ id, title }: { id: string; title: string }) {
  return <DeleteDialog name={title} onConfirm={() => projectsApi.remove(id)} />;
}
