import { CollectionConfig } from 'payload';
import slugify from 'slugify';

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  labels: {
    singular: 'Project',
    plural: 'Projects',
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data?.slug) {
          data.slug = slugify(data.title, {
            lower: true,
            strict: true,
          });
        }
        return data;
      },
    ],
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
      name: 'projectImage',
      label: 'Project Image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'videoUrl',
      label: 'Video URL',
      type: 'text',
      required: false,
      admin: {
        description: 'Cloudinary video URL for project demo',
      },
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      label: 'Project Icon (SVG)',
      type: 'textarea',
      admin: {
        description: 'Paste your SVG code here. It should be a valid <svg> tag.',
      },
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'body',
      label: 'Body',
      type: 'richText',
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
      name: 'labels',
      label: 'Labels',
      type: 'relationship',
      relationTo: 'project-labels',
      hasMany: true,
      required: false,
    },
    {
      name: 'repository',
      label: 'GitHub Repository',
      type: 'text',
    },
    {
      name: 'demo',
      label: 'Live Demo URL',
      type: 'text',
    },
    {
      name: 'isCommercialProject',
      label: 'Is a Commercial Project',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Used to differentiate between personal and commercial projects',
      },
    },
    {
      name: 'order',
      label: 'Order',
      type: 'number',
      admin: {
        description: 'Used for custom sorting',
      },
    },
  ],
};
