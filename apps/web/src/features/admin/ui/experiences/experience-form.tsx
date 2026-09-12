'use client';

import { Frame } from '@/shared/components/ui/frame';
import { Input } from '@/shared/components/ui/input';
import { useToast } from '@/shared/components/ui/toast';
import type { CreateExperienceInput, ExperienceDto } from '@repo/contracts';
import { useCallback, useState } from 'react';
import { experiencesApi } from '../../api/admin.client';
import { useEntityForm } from '../../lib/use-entity-form';
import { useSaveShortcut } from '../../lib/use-save-shortcut';
import { ContentMetaFields } from '../content-meta-fields';
import { DeleteDialog } from '../delete-dialog';
import { SaveBar } from '../save-bar';
import { StringListField } from '../string-list-field';

const today = () => new Date().toISOString().slice(0, 10);

export function ExperienceForm({ experience }: { experience?: ExperienceDto }) {
  const { toast } = useToast();
  const [fields, setFields] = useState<CreateExperienceInput>({
    locale: experience?.locale ?? 'en',
    status: experience?.status ?? 'draft',
    title: experience?.title ?? '',
    company: experience?.company ?? '',
    location: experience?.location ?? '',
    tasks: experience?.tasks ?? [],
    technologies: experience?.technologies ?? [],
    startDate: experience?.startDate ?? today(),
    endDate: experience?.endDate ?? '',
    isCurrent: experience?.isCurrent ?? false,
    link: experience?.link ?? '',
    order: experience?.order ?? 0,
  });

  const patch = (next: Partial<CreateExperienceInput>) =>
    setFields((current) => ({ ...current, ...next }));

  const { save, saving, savedAt } = useEntityForm({
    tag: 'experiences',
    isNew: !experience,
    create: (input: CreateExperienceInput) => experiencesApi.create(input),
    update: (input: CreateExperienceInput) => experiencesApi.update(experience!.id, input),
    redirectTo: (result) => (experience ? null : `/admin/experiences/${result.id}`),
  });

  const handleSave = useCallback(() => {
    if (!fields.title.trim() || !fields.company.trim()) {
      toast({ title: 'title and company are required', variant: 'warning' });
      return;
    }
    void save({
      ...fields,
      location: fields.location || null,
      link: fields.link || null,
      endDate: fields.endDate || null,
      tasks: (fields.tasks ?? []).map((task) => task.trim()).filter(Boolean),
      technologies: (fields.technologies ?? []).map((tech) => tech.trim()).filter(Boolean),
    });
  }, [fields, save, toast]);

  useSaveShortcut(handleSave);

  return (
    <div className="flex flex-col gap-6">
      <SaveBar
        backHref="/admin/experiences"
        backLabel="back to experience"
        savedAt={savedAt ?? (experience ? new Date(experience.updatedAt) : null)}
        saving={saving}
        onSave={handleSave}
      />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Frame>
          <Frame.Header className="px-2.5 py-2">
            <Frame.Title>role</Frame.Title>
          </Frame.Header>
          <Frame.Panel className="bg-background flex flex-col gap-4">
            <Input
              label="job title"
              value={fields.title}
              onChange={(event) => patch({ title: event.target.value })}
            />
            <Input
              label="company"
              value={fields.company}
              onChange={(event) => patch({ company: event.target.value })}
            />
            <Input
              label="location"
              value={fields.location ?? ''}
              onChange={(event) => patch({ location: event.target.value })}
            />
            <Input
              label="link"
              placeholder="https://"
              value={fields.link ?? ''}
              onChange={(event) => patch({ link: event.target.value })}
            />
            <StringListField
              label="tasks"
              description="one bullet per responsibility."
              value={fields.tasks ?? []}
              onChange={(tasks) => patch({ tasks })}
            />
            <StringListField
              label="technologies"
              placeholder="react"
              value={fields.technologies ?? []}
              onChange={(technologies) => patch({ technologies })}
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
                description="leave empty if this is the current role."
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
            </Frame.Panel>
          </Frame>
          {experience ? (
            <DeleteDialog
              name={experience.title}
              variant="button"
              redirectTo="/admin/experiences"
              onConfirm={() => experiencesApi.remove(experience.id)}
            />
          ) : null}
        </aside>
      </div>
    </div>
  );
}
