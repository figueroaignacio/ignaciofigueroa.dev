'use client';

import { Button } from '@/shared/components/ui/button';
import { Frame } from '@/shared/components/ui/frame';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { useToast } from '@/shared/components/ui/toast';
import { slugify } from '@/shared/lib/slugify';
import type {
  ContentStatus,
  CreateProjectInput,
  Locale,
  MediaDto,
  ProjectCategoryDto,
  ProjectDto,
  ProjectLabelDto,
  TechStackDto,
} from '@repo/contracts';
import { useCallback, useRef, useState } from 'react';
import { projectsApi } from '../../api/admin.client';
import { useEntityForm } from '../../lib/use-entity-form';
import { useSaveShortcut } from '../../lib/use-save-shortcut';
import { ContentMetaFields } from '../content-meta-fields';
import { DeleteDialog } from '../delete-dialog';
import { TiptapEditor } from '../editor/tiptap-editor';
import { MediaPicker } from '../media-picker';
import { RelationPicker } from '../relation-picker';
import { SaveBar } from '../save-bar';

interface ProjectEditorProps {
  project?: ProjectDto;
  technologies: TechStackDto[];
  categories: ProjectCategoryDto[];
  labels: ProjectLabelDto[];
  media: MediaDto[];
}

type Fields = Omit<CreateProjectInput, 'body'>;

export function ProjectEditor({
  project,
  technologies,
  categories,
  labels,
  media,
}: ProjectEditorProps) {
  const { toast } = useToast();
  const bodyRef = useRef(project?.body ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(project));
  const [fields, setFields] = useState<Fields>({
    locale: project?.locale ?? 'en',
    status: project?.status ?? 'draft',
    title: project?.title ?? '',
    subtitle: project?.subtitle ?? '',
    slug: project?.slug ?? '',
    description: project?.description ?? '',
    icon: project?.icon ?? '',
    imageId: project?.imageId ?? null,
    videoUrl: project?.videoUrl ?? '',
    repository: project?.repository ?? '',
    demo: project?.demo ?? '',
    isCommercial: project?.isCommercial ?? false,
    order: project?.order ?? 0,
    technologyIds: project?.technologies.map((tech) => tech.id) ?? [],
    categoryIds: project?.categories.map((category) => category.id) ?? [],
    labelIds: project?.labels.map((label) => label.id) ?? [],
  });

  const patch = (next: Partial<Fields>) => setFields((current) => ({ ...current, ...next }));

  const { save, saving, savedAt } = useEntityForm({
    tag: 'projects',
    isNew: !project,
    create: (input: CreateProjectInput) => projectsApi.create(input),
    update: (input: CreateProjectInput) => projectsApi.update(project!.id, input),
    redirectTo: (result) => (project ? null : `/admin/projects/${result.id}`),
  });

  const handleSave = useCallback(() => {
    if (!fields.title.trim()) {
      toast({ title: 'the project needs a title', variant: 'warning' });
      return;
    }
    void save({
      ...fields,
      slug: fields.slug || slugify(fields.title),
      icon: fields.icon || null,
      videoUrl: fields.videoUrl || null,
      repository: fields.repository || null,
      demo: fields.demo || null,
      body: bodyRef.current,
    });
  }, [fields, save, toast]);

  useSaveShortcut(handleSave);

  return (
    <div className="flex flex-col gap-6">
      <SaveBar
        backHref="/admin"
        backLabel="back to projects"
        savedAt={savedAt ?? (project ? new Date(project.updatedAt) : null)}
        saving={saving}
        onSave={handleSave}
      />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex flex-col">
          <input
            type="text"
            value={fields.title}
            placeholder="title"
            onChange={(event) => {
              const title = event.target.value;
              patch({ title, ...(slugTouched ? {} : { slug: slugify(title) }) });
            }}
            className="placeholder:text-muted-foreground type-display mb-2 w-full bg-transparent outline-none"
          />
          <input
            type="text"
            value={fields.subtitle}
            placeholder="subtitle"
            onChange={(event) => patch({ subtitle: event.target.value })}
            className="placeholder:text-muted-foreground text-muted-strong mb-5 w-full bg-transparent text-[15px] outline-none"
          />
          <TiptapEditor
            initialContent={project?.body ?? ''}
            placeholder="describe the project, or type / for blocks."
            onChange={(markdown) => {
              bodyRef.current = markdown;
            }}
          />
        </div>

        <aside className="flex flex-col gap-4">
          <Frame>
            <Frame.Header className="px-2.5 py-2">
              <Frame.Title>publishing</Frame.Title>
            </Frame.Header>
            <Frame.Panel className="bg-background flex flex-col gap-4">
              <ContentMetaFields
                locale={fields.locale}
                status={fields.status}
                onChange={(next) => patch(next as { locale?: Locale; status?: ContentStatus })}
              />
              <Input
                label="slug"
                className="font-mono text-[13px]"
                value={fields.slug ?? ''}
                onChange={(event) => {
                  setSlugTouched(true);
                  patch({ slug: event.target.value });
                }}
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
                  checked={fields.isCommercial}
                  onChange={(event) => patch({ isCommercial: event.target.checked })}
                />
                commercial project
              </label>
            </Frame.Panel>
          </Frame>

          <Frame>
            <Frame.Header className="px-2.5 py-2">
              <Frame.Title>metadata</Frame.Title>
            </Frame.Header>
            <Frame.Panel className="bg-background flex flex-col gap-4">
              <Textarea
                label="description"
                description="shown in cards, search results and metadata."
                value={fields.description}
                onChange={(event) => patch({ description: event.target.value })}
                maxLength={300}
                showCount
                autoResize
              />
              <Input
                label="repository"
                placeholder="https://github.com/..."
                value={fields.repository ?? ''}
                onChange={(event) => patch({ repository: event.target.value })}
              />
              <Input
                label="demo"
                placeholder="https://"
                value={fields.demo ?? ''}
                onChange={(event) => patch({ demo: event.target.value })}
              />
              <Input
                label="video url"
                placeholder="https://"
                value={fields.videoUrl ?? ''}
                onChange={(event) => patch({ videoUrl: event.target.value })}
              />
              <Textarea
                label="icon (svg)"
                description="paste a full <svg> tag."
                value={fields.icon ?? ''}
                onChange={(event) => patch({ icon: event.target.value })}
                className="font-mono text-xs"
              />
            </Frame.Panel>
          </Frame>

          <Frame>
            <Frame.Header className="px-2.5 py-2">
              <Frame.Title>relations</Frame.Title>
            </Frame.Header>
            <Frame.Panel className="bg-background flex flex-col gap-4">
              <MediaPicker
                label="cover"
                media={media}
                value={fields.imageId ?? null}
                onChange={(id) => patch({ imageId: id })}
              />
              <RelationPicker
                label="technologies"
                searchable
                options={technologies.map((tech) => ({ id: tech.id, label: tech.name }))}
                value={fields.technologyIds ?? []}
                onChange={(value) => patch({ technologyIds: value })}
              />
              <RelationPicker
                label="categories"
                options={categories.map((category) => ({
                  id: category.id,
                  label: category.label,
                }))}
                value={fields.categoryIds ?? []}
                onChange={(value) => patch({ categoryIds: value })}
              />
              <RelationPicker
                label="labels"
                options={labels.map((label) => ({ id: label.id, label: label.label }))}
                value={fields.labelIds ?? []}
                onChange={(value) => patch({ labelIds: value })}
              />
            </Frame.Panel>
          </Frame>

          {project ? (
            <DeleteDialog
              name={project.title}
              variant="button"
              redirectTo="/admin"
              onConfirm={() => projectsApi.remove(project.id)}
            />
          ) : null}
        </aside>
      </div>
    </div>
  );
}
