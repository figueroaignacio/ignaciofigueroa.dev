'use client';

import { educationApi } from '../../api/admin.client';
import { DeleteDialog } from '../delete-dialog';

export function DeleteEducationButton({ id, title }: { id: string; title: string }) {
  return <DeleteDialog name={title} onConfirm={() => educationApi.remove(id)} />;
}
