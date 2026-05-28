import { CollectionConfig } from 'payload';

export const TechIcon: CollectionConfig = {
  slug: 'tech-icons',
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Tech Icon',
    plural: 'Tech Icons',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Icon Name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'svg',
      label: 'SVG Content',
      type: 'code',
      required: true,
      admin: {
        language: 'html',
        description: 'Paste the full SVG markup here',
      },
    },
  ],
};
