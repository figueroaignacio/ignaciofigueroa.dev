import type { CollectionConfig } from 'payload';

export const Experience: CollectionConfig = {
  slug: 'experience',
  admin: {
    useAsTitle: 'title',
  },
  labels: {
    singular: 'Experience',
    plural: 'Experiences',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
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
      label: 'Job Title',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
    },
    {
      name: 'tasks',
      label: 'Tasks / Responsibilities',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Task',
          required: true,
        },
      ],
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      label: 'End Date',
      type: 'date',
      admin: {
        description: 'Leave empty if current',
      },
    },
    {
      name: 'isCurrent',
      label: 'Currently Working Here',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'technologies',
      label: 'Technologies Used',
      type: 'array',
      fields: [
        {
          name: 'name',
          label: 'Technology',
          type: 'text',
        },
      ],
    },
    {
      name: 'link',
      label: 'Company / Project Link',
      type: 'text',
    },
    {
      name: 'order',
      label: 'Order',
      type: 'number',
      admin: {
        description: 'Use to manually sort experiences',
      },
    },
  ],
};
