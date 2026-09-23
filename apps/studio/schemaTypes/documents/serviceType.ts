import { toTitleCase } from '@mns/utils';
import { MdOutlineDesignServices } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const serviceType = defineType({
  name: 'service',
  title: 'Services',
  icon: MdOutlineDesignServices,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) =>
        rule.required().info(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Marketing sub title to display on the website',
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      description: 'Service summary text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Service Description',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Service Photo',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'mainImage',
    },
    prepare({ name, image }) {
      const formatName = name ? toTitleCase(name) : 'Service name not provided';

      return {
        title: formatName,
        media: image ?? MdOutlineDesignServices,
      };
    },
  },
});
