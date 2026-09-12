'use client';

import { testimonialsApi } from '../../api/admin.client';
import { DeleteDialog } from '../delete-dialog';

export function DeleteTestimonialButton({ id, name }: { id: string; name: string }) {
  return <DeleteDialog name={name} onConfirm={() => testimonialsApi.remove(id)} />;
}
