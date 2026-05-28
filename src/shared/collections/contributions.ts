import { CollectionConfig } from 'payload';
import { fetchGithubPrs } from './hooks/fetch-github-prs';

export const Contributions: CollectionConfig = {
  slug: 'contributions',
  admin: {
    useAsTitle: 'title',
  },
  labels: {
    singular: 'Contribution',
    plural: 'Contributions',
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeChange: [fetchGithubPrs],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'locale',
      label: 'Locale',
      type: 'select',
      required: true,
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
      ],
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'technologies',
      label: 'Technologies Used',
      type: 'relationship',
      relationTo: 'tech-stack',
      hasMany: true,
      required: false,
    },
    {
      name: 'repository',
      label: 'GitHub Repository',
      type: 'text',
      required: true,
    },
    {
      name: 'fork',
      label: 'GitHub Fork',
      type: 'text',
      required: true,
    },
    {
      name: 'pullRequests',
      label: 'Pull Requests',
      type: 'array',
      fields: [
        {
          name: 'url',
          label: 'PR URL',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: false,
        },
      ],
    },
  ],
};
