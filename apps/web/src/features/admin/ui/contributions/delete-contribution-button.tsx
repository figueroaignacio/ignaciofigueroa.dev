'use client';

import { contributionsApi } from '../../api/admin.client';
import { DeleteDialog } from '../delete-dialog';

export function DeleteContributionButton({ id, title }: { id: string; title: string }) {
  return <DeleteDialog name={title} onConfirm={() => contributionsApi.remove(id)} />;
}
