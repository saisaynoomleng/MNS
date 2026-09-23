import { formatDateUS, toTitleCase } from '@mns/utils';
import { RiSuitcaseLine } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

export const caseStudyType = defineType({
  name: 'caseStudy',
  icon: RiSuitcaseLine,
  title: 'Case Studies',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Case Study Name',
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
      name: 'type',
      title: 'Case Study Type',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      type: 'imageWithAlt',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startedAt',
      title: 'Started Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endedAt',
      title: 'Finished Date',
      type: 'date',
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
    defineField({
      name: 'previewUrl',
      title: 'Live URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      type: 'type',
      image: 'mainImage',
      date: 'startedAt',
    },
    prepare({ name, type, image, date }) {
      const formatName = name ? toTitleCase(name) : 'Name not provided';
      const formatDate = date
        ? formatDateUS(date)
        : 'Started Date not specified';
      const formatType = type ? toTitleCase(type) : 'Type not provided';

      return {
        title: formatName,
        subtitle: `Type: ${formatType} | Date: ${formatDate}`,
        media: image ?? RiSuitcaseLine,
      };
    },
  },
});
