import { toTitleCase } from '@mns/utils';
import { MdOutlineQuestionAnswer } from 'react-icons/md';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const faqsType = defineType({
  name: 'faqs',
  icon: MdOutlineQuestionAnswer,
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
        source: (doc) => `${doc.name}-faq`,
      },
    }),
    defineField({
      name: 'contents',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'content',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({ name: 'body', type: 'text' }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      question: 'contents.0.title',
    },
    prepare({ name, question }) {
      const formatName = name ? toTitleCase(name) : 'Name not provided';
      const formatQuestion = question
        ? toTitleCase(question)
        : 'Question not provided';

      return {
        title: formatName,
        subtitle: formatQuestion,
        media: MdOutlineQuestionAnswer,
      };
    },
  },
});
