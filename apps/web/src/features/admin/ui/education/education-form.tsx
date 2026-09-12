'use client';

import { Frame } from '@/shared/components/ui/frame';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { useToast } from '@/shared/components/ui/toast';
import type { CreateEducationInput, EducationDto } from '@repo/contracts';
import { useCallback, useState } from 'react';
import { educationApi } from '../../api/admin.client';
import { useEntityForm } from '../../lib/use-entity-form';
import { useSaveShortcut } from '../../lib/use-save-shortcut';
import { ContentMetaFields } from '../content-meta-fields';
import { DeleteDialog } from '../delete-dialog';
import { SaveBar } from '../save-bar';

const today = () => new Date().toISOString().slice(0, 10);

export function EducationForm({ entry }: { entry?: EducationDto }) {
  const { toast } = useToast();
  const [fields, setFields] = useState<CreateEducationInput>({
    locale: entry?.locale ?? 'en',
    status: entry?.status ?? 'draft',
    title: entry?.title ?? '',
    institution: entry?.institution ?? '',
    location: entry?.location ?? '',
    description: entry?.description ?? '',
    startDate: entry?.startDate ?? today(),
    endDate: entry?.endDate ?? '',
    isCurrent: entry?.isCurrent ?? false,
    certificateUrl: entry?.certificateUrl ?? '',
    highlight: entry?.highlight ?? false,
    order: entry?.order ?? 0,
  });

  const patch = (next: Partial<CreateEducationInput>) =>
    setFields((current) => ({ ...current, ...next }));

  const { save, saving, savedAt } = useEntityForm({
    tag: 'education',
    isNew: !entry,
    create: (input: CreateEducationInput) => educationApi.create(input),
    update: (input: CreateEducationInput) => educationApi.update(entry!.id, input),
    redirectTo: (result) => (entry ? null : `/admin/education/${result.id}`),
  });

  const handleSave = useCallback(() => {
    if (!fields.title.trim() || !fields.institution.trim()) {
      toast({ title: 'title and institution are required', variant: 'warning' });
      return;
    }
    void save({
      ...fields,
      location: fields.location || null,
      description: fields.description || null,
      certificateUrl: fields.certificateUrl || null,
      endDate: fields.endDate || null,
    });
  }, [fields, save, toast]);

  useSaveShortcut(handleSave);

  return (
    <div className="flex flex-col gap-6">
      <SaveBar
        backHref="/admin/education"
        backLabel="back to education"
        savedAt={savedAt ?? (entry ? new Date(entry.updatedAt) : null)}
        saving={saving}
        onSave={handleSave}
      />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Frame>
          <Frame.Header className="px-2.5 py-2">
            <Frame.Title>entry</Frame.Title>
          </Frame.Header>
          <Frame.Panel className="bg-background flex flex-col gap-4">
            <Input
              label="title"
              description="degree or certification."
              value={fields.title}
              onChange={(event) => patch({ title: event.target.value })}
            />
            <Input
              label="institution"
              value={fields.institution}
              onChange={(event) => patch({ institution: event.target.value })}
            />
            <Input
              label="location"
              value={fields.location ?? ''}
              onChange={(event) => patch({ location: event.target.value })}
            />
            <Textarea
              label="description"
              value={fields.description ?? ''}
              onChange={(event) => patch({ description: event.target.value })}
              autoResize
            />
            <Input
              label="certificate url"
              placeholder="https://"
              value={fields.certificateUrl ?? ''}
              onChange={(event) => patch({ certificateUrl: event.target.value })}
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
                label="start date"
                type="date"
                value={fields.startDate}
                onChange={(event) => patch({ startDate: event.target.value })}
              />
              <Input
                label="end date"
                type="date"
                description="leave empty if still in progress."
                value={fields.endDate ?? ''}
                onChange={(event) =>
                  patch({ endDate: event.target.value, isCurrent: !event.target.value })
                }
              />
              <Input
                label="order"
                type="number"
                value={String(fields.order)}
                onChange={(event) => patch({ order: Number(event.target.value) || 0 })}
              />
              <label className="flex items-center gap-2 text-[13px]">
                <input
                  type="checkbox"
                  checked={fields.highlight}
                  onChange={(event) => patch({ highlight: event.target.checked })}
                />
                highlight in the portfolio
              </label>
            </Frame.Panel>
          </Frame>
          {entry ? (
            <DeleteDialog
              name={entry.title}
              variant="button"
              redirectTo="/admin/education"
              onConfirm={() => educationApi.remove(entry.id)}
            />
          ) : null}
        </aside>
      </div>
    </div>
  );
}
