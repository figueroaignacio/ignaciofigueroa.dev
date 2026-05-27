import { CollectionConfig } from 'payload';

export const TechStack: CollectionConfig = {
  slug: 'tech-stack',
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Technology',
    plural: 'Tech Stack',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: 'Technology Name',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
};
