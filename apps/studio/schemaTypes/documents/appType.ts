import { replaceDash, toTitleCase } from '@mns/utils';
import { MdPhonelink } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const appType = defineType({
  name: 'app',
  type: 'document',
  icon: MdPhonelink,
  fields: [
    defineField({
      name: 'name',
      title: 'App Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) =>
        rule.required().info(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'url',
      type: 'url',
      title: 'App URL',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'demoUrl',
      type: 'url',
      title: 'Demo App URL',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'App Preview Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'stage',
      title: 'App Stage',
      type: 'string',
      options: {
        list: [
          { title: 'Development', value: 'development' },
          { title: 'Testing', value: 'testing' },
          { title: 'Production', value: 'production' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'myanmarOnly',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'App Summary',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'App Detail',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
    defineField({
      name: 'mainImage',
      type: 'imageWithAlt',
      title: 'App Logo',
    }),
    defineField({
      name: 'type',
      title: 'App Type',
      type: 'string',
      options: {
        list: [
          { title: 'Health Care', value: 'health-care' },
          { title: 'Creative & Media', value: 'creative-and-media' },
          { title: 'Food & Hospitality', value: 'food-and-hospitality' },
          { title: 'Retail & Commerce', value: 'retail-and-commerce' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      name: 'name',
      logo: 'mainImage',
      type: 'type',
    },
    prepare({ name, logo, type }) {
      const formatName = name ? toTitleCase(name) : 'Name not provided';
      const formatType = type
        ? replaceDash(toTitleCase(type))
        : 'Type not provided';

      return {
        title: formatName,
        subtitle: `Type: ${formatType}`,
        media: logo ?? MdPhonelink,
      };
    },
  },
});
