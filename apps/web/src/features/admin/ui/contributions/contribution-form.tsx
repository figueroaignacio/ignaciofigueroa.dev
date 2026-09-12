'use client';

import { Frame } from '@/shared/components/ui/frame';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { useToast } from '@/shared/components/ui/toast';
import type { ContributionDto, CreateContributionInput, TechStackDto } from '@repo/contracts';
import { useCallback, useState } from 'react';
import { contributionsApi } from '../../api/admin.client';
import { useEntityForm } from '../../lib/use-entity-form';
import { useSaveShortcut } from '../../lib/use-save-shortcut';
import { ContentMetaFields } from '../content-meta-fields';
import { DeleteDialog } from '../delete-dialog';
import { RelationPicker } from '../relation-picker';
import { SaveBar } from '../save-bar';

interface ContributionFormProps {
  contribution?: ContributionDto;
  technologies: TechStackDto[];
}

export function ContributionForm({ contribution, technologies }: ContributionFormProps) {
  const { toast } = useToast();
  const [fields, setFields] = useState<CreateContributionInput>({
    locale: contribution?.locale ?? 'en',
    status: contribution?.status ?? 'draft',
    title: contribution?.title ?? '',
    description: contribution?.description ?? '',
    repository: contribution?.repository ?? '',
    fork: contribution?.fork ?? '',
    pullRequests: contribution?.pullRequests ?? [],
    syncPullRequests: true,
    order: contribution?.order ?? 0,
    technologyIds: contribution?.technologies.map((tech) => tech.id) ?? [],
  });

  const patch = (next: Partial<CreateContributionInput>) =>
    setFields((current) => ({ ...current, ...next }));

  const { save, saving, savedAt } = useEntityForm({
    tag: 'contributions',
    isNew: !contribution,
    create: (input: CreateContributionInput) => contributionsApi.create(input),
    update: (input: CreateContributionInput) => contributionsApi.update(contribution!.id, input),
    redirectTo: (result) => (contribution ? null : `/admin/contributions/${result.id}`),
  });

  const handleSave = useCallback(() => {
    if (!fields.title.trim() || !fields.repository.trim()) {
      toast({ title: 'title and repository are required', variant: 'warning' });
      return;
    }
    void save({ ...fields, fork: fields.fork || null });
  }, [fields, save, toast]);

  useSaveShortcut(handleSave);

  return (
    <div className="flex flex-col gap-6">
      <SaveBar
        backHref="/admin/contributions"
        backLabel="back to contributions"
        savedAt={savedAt ?? (contribution ? new Date(contribution.updatedAt) : null)}
        saving={saving}
        onSave={handleSave}
      />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Frame>
          <Frame.Header className="px-2.5 py-2">
            <Frame.Title>contribution</Frame.Title>
          </Frame.Header>
          <Frame.Panel className="bg-background flex flex-col gap-4">
            <Input
              label="title"
              value={fields.title}
              onChange={(event) => patch({ title: event.target.value })}
            />
            <Textarea
              label="description"
              value={fields.description}
              onChange={(event) => patch({ description: event.target.value })}
              autoResize
            />
            <Input
              label="repository"
              placeholder="https://github.com/owner/repo"
              value={fields.repository}
              onChange={(event) => patch({ repository: event.target.value })}
            />
            <Input
              label="fork"
              placeholder="https://github.com/you/repo"
              value={fields.fork ?? ''}
              onChange={(event) => patch({ fork: event.target.value })}
            />
            <RelationPicker
              label="technologies"
              searchable
              options={technologies.map((tech) => ({ id: tech.id, label: tech.name }))}
              value={fields.technologyIds ?? []}
              onChange={(value) => patch({ technologyIds: value })}
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
                label="order"
                type="number"
                value={String(fields.order)}
                onChange={(event) => patch({ order: Number(event.target.value) || 0 })}
              />
              <label className="flex items-center gap-2 text-[13px]">
                <input
                  type="checkbox"
                  checked={fields.syncPullRequests}
                  onChange={(event) => patch({ syncPullRequests: event.target.checked })}
                />
                pull the merged and open PRs from GitHub on save
              </label>
              {contribution && contribution.pullRequests.length > 0 ? (
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground font-mono text-xs">
                    {contribution.pullRequests.length} pull requests synced
                  </span>
                  {contribution.pullRequests.slice(0, 5).map((pr) => (
                    <a
                      key={pr.url}
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground truncate font-mono text-xs"
                    >
                      {pr.label ?? pr.url}
                    </a>
                  ))}
                </div>
              ) : null}
            </Frame.Panel>
          </Frame>
          {contribution ? (
            <DeleteDialog
              name={contribution.title}
              variant="button"
              redirectTo="/admin/contributions"
              onConfirm={() => contributionsApi.remove(contribution.id)}
            />
          ) : null}
        </aside>
      </div>
    </div>
  );
}
