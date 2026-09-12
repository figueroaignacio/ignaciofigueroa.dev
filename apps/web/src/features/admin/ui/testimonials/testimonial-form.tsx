'use client';

import { Frame } from '@/shared/components/ui/frame';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { useToast } from '@/shared/components/ui/toast';
import type { CreateTestimonialInput, TestimonialDto } from '@repo/contracts';
import { useCallback, useState } from 'react';
import { testimonialsApi } from '../../api/admin.client';
import { useEntityForm } from '../../lib/use-entity-form';
import { useSaveShortcut } from '../../lib/use-save-shortcut';
import { ContentMetaFields } from '../content-meta-fields';
import { DeleteDialog } from '../delete-dialog';
import { SaveBar } from '../save-bar';

export function TestimonialForm({ testimonial }: { testimonial?: TestimonialDto }) {
  const { toast } = useToast();
  const [fields, setFields] = useState<CreateTestimonialInput>({
    locale: testimonial?.locale ?? 'en',
    status: testimonial?.status ?? 'draft',
    name: testimonial?.name ?? '',
    role: testimonial?.role ?? '',
    company: testimonial?.company ?? '',
    avatar: testimonial?.avatar ?? '',
    testimonial: testimonial?.testimonial ?? '',
    date: testimonial?.date ?? '',
    order: testimonial?.order ?? 0,
  });

  const patch = (next: Partial<CreateTestimonialInput>) =>
    setFields((current) => ({ ...current, ...next }));

  const { save, saving, savedAt } = useEntityForm({
    tag: 'testimonials',
    isNew: !testimonial,
    create: (input: CreateTestimonialInput) => testimonialsApi.create(input),
    update: (input: CreateTestimonialInput) => testimonialsApi.update(testimonial!.id, input),
    redirectTo: (result) => (testimonial ? null : `/admin/testimonials/${result.id}`),
  });

  const handleSave = useCallback(() => {
    if (!fields.name.trim() || !fields.testimonial.trim()) {
      toast({ title: 'name and testimonial are required', variant: 'warning' });
      return;
    }
    void save({
      ...fields,
      company: fields.company || null,
      avatar: fields.avatar || null,
      date: fields.date || null,
    });
  }, [fields, save, toast]);

  useSaveShortcut(handleSave);

  return (
    <div className="flex flex-col gap-6">
      <SaveBar
        backHref="/admin/testimonials"
        backLabel="back to testimonials"
        savedAt={savedAt ?? (testimonial ? new Date(testimonial.updatedAt) : null)}
        saving={saving}
        onSave={handleSave}
      />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Frame>
          <Frame.Header className="px-2.5 py-2">
            <Frame.Title>testimonial</Frame.Title>
          </Frame.Header>
          <Frame.Panel className="bg-background flex flex-col gap-4">
            <Input
              label="name"
              value={fields.name}
              onChange={(event) => patch({ name: event.target.value })}
            />
            <Input
              label="role"
              value={fields.role}
              onChange={(event) => patch({ role: event.target.value })}
            />
            <Input
              label="company"
              value={fields.company ?? ''}
              onChange={(event) => patch({ company: event.target.value })}
            />
            <Input
              label="avatar url"
              placeholder="https://"
              value={fields.avatar ?? ''}
              onChange={(event) => patch({ avatar: event.target.value })}
            />
            <Textarea
              label="quote"
              value={fields.testimonial}
              onChange={(event) => patch({ testimonial: event.target.value })}
              maxLength={1000}
              showCount
              autoResize
            />
          </Frame.Panel>
        </Frame>

        <aside className="flex flex-col gap-4">
          <Frame>
            <Frame.Header className="px-2.5 py-2">
              <Frame.Title>publishing</Frame.Title>
            </Frame.Header>
            <Frame.Panel className="bg-background flex flex-col gap-4">
              <ContentMetaFields locale={fields.locale} status={fields.status} onChange={patch} />
              <Input
                label="date"
                type="date"
                value={fields.date ?? ''}
                onChange={(event) => patch({ date: event.target.value })}
              />
              <Input
                label="order"
                type="number"
                value={String(fields.order)}
                onChange={(event) => patch({ order: Number(event.target.value) || 0 })}
              />
            </Frame.Panel>
          </Frame>
          {testimonial ? (
            <DeleteDialog
              name={testimonial.name}
              variant="button"
              redirectTo="/admin/testimonials"
              onConfirm={() => testimonialsApi.remove(testimonial.id)}
            />
          ) : null}
        </aside>
      </div>
    </div>
  );
}
