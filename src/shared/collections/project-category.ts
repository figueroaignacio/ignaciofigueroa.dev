import { CollectionConfig } from 'payload';

export const ProjectCategory: CollectionConfig = {
  slug: 'project-category',
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true,
    },
  ],
};
