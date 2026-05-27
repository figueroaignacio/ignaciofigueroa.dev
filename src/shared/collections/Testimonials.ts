import type { CollectionConfig } from 'payload';

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
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
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Role / Position',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
    },
    {
      name: 'avatar',
      label: 'Avatar URL',
      type: 'text',
      required: false,
      admin: {
        description: 'Insert an image URL (e.g. from GitHub, LinkedIn, etc.)',
      },
    },
    {
      name: 'testimonial',
      label: 'Testimonial',
      type: 'textarea',
      required: true,
    },
    {
      name: 'date',
      label: 'Date',
      type: 'date',
    },
    {
      name: 'order',
      label: 'Order',
      type: 'number',
      admin: {
        description: 'Used to manually sort testimonials',
      },
    },
  ],
};
