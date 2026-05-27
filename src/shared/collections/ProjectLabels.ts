import { CollectionConfig } from 'payload';

export const ProjectLabels: CollectionConfig = {
  slug: 'project-labels',
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
