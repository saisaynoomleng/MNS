import { toTitleCase } from '@mns/utils';
import { GiProgression } from 'react-icons/gi';
import { defineField, defineType } from 'sanity';

export const capabilityType = defineType({
  name: 'capability',
  icon: GiProgression,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.name}-capability`,
      },
    }),
    defineField({
      name: 'value',
      description: 'Strength of the particular capability',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      value: 'value',
    },
    prepare({ name, value }) {
      const formatName = name ? toTitleCase(name) : 'Name not provided';

      return {
        title: formatName,
        subtitle: `Value: ${value}`,
        media: GiProgression,
      };
    },
  },
});
