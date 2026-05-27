import { CollectionConfig } from 'payload';

export const Education: CollectionConfig = {
  slug: 'education',
  admin: {
    useAsTitle: 'title',
  },
  labels: {
    singular: 'Education',
    plural: 'Education',
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
      label: 'Degree / Certification Title',
      type: 'text',
      required: true,
    },
    {
      name: 'institution',
      label: 'Institution',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      label: 'Location',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
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
        description: 'Leave empty if still in progress',
      },
    },
    {
      name: 'isCurrent',
      label: 'Currently Studying',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'certificateUrl',
      label: 'Certificate URL',
      type: 'text',
    },
    {
      name: 'highlight',
      label: 'Highlight in portfolio',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'order',
      label: 'Order',
      type: 'number',
      admin: {
        description: 'Use to manually sort education entries',
      },
    },
  ],
};
