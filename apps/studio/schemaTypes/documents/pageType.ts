import { toTitleCase } from '@mns/utils';
import { LuReceiptText } from 'react-icons/lu';
import { defineField, defineType } from 'sanity';

export const pageType = defineType({
  name: 'page',
  icon: LuReceiptText,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Page Name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-page`,
      },
    }),
    defineField({
      name: 'type',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Main Page', value: 'main' },
          { title: 'Company Page', value: 'company' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
    }),
    defineField({
      name: 'body',
      title: 'Page Content',
      type: 'blockContent',
      hidden: ({ document }) => document?.type === 'main',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      type: 'type',
    },
    prepare({ name, type }) {
      const formatName = name ? toTitleCase(name) : 'Page name not provided';
      const formatType = type ? toTitleCase(type) : 'Page type not specified';

      return {
        title: formatName,
        subtitle: `Type: ${formatType}`,
        media: LuReceiptText,
      };
    },
  },
});
