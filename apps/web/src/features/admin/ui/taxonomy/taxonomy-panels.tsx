'use client';

import type {
  ProjectCategoryDto,
  ProjectLabelDto,
  TechIconDto,
  TechStackDto,
} from '@repo/contracts';
import { categoriesApi, labelsApi, techIconsApi, techStackApi } from '../../api/admin.client';
import { SimpleEntityPanel } from './simple-entity-panel';
import { TechIconPanel } from './tech-icon-panel';

interface TaxonomyPanelsProps {
  categories: ProjectCategoryDto[];
  labels: ProjectLabelDto[];
  technologies: TechStackDto[];
  icons: TechIconDto[];
}

export function TaxonomyPanels({ categories, labels, technologies, icons }: TaxonomyPanelsProps) {
  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
      <SimpleEntityPanel
        title="project categories"
        description="the tabs on the projects section."
        inputLabel="category"
        items={categories.map((category) => ({
          id: category.id,
          label: category.label,
          meta: `/${category.slug}`,
        }))}
        onCreate={(label) => categoriesApi.create({ label })}
        onRename={(id, label) => categoriesApi.update(id, { label })}
        onDelete={(id) => categoriesApi.remove(id)}
      />
      <SimpleEntityPanel
        title="project labels"
        description="the small chips on project cards."
        inputLabel="label"
        items={labels.map((label) => ({ id: label.id, label: label.label }))}
        onCreate={(label) => labelsApi.create({ label })}
        onRename={(id, label) => labelsApi.update(id, { label })}
        onDelete={(id) => labelsApi.remove(id)}
      />
      <SimpleEntityPanel
        title="technologies"
        description="shared by projects and contributions."
        inputLabel="technology"
        items={technologies.map((tech) => ({
          id: tech.id,
          label: tech.name,
          meta: tech.icon?.name ?? 'no icon',
        }))}
        onCreate={(name) => techStackApi.create({ name })}
        onRename={(id, name) => techStackApi.update(id, { name })}
        onDelete={(id) => techStackApi.remove(id)}
      />
      <TechIconPanel icons={icons} technologies={technologies} />
    </div>
  );
}
