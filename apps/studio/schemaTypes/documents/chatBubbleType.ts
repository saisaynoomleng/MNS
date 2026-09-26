import { toTitleCase } from '@mns/utils';
import { MdOutlineQuestionAnswer } from 'react-icons/md';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const chatBubbleType = defineType({
  name: 'chatBubble',
  icon: MdOutlineQuestionAnswer,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Chat Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'messages',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'message',
          type: 'object',
          fields: [
            defineField({
              name: 'inbound',
              type: 'string',
            }),
            defineField({
              name: 'outbound',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              inbound: 'inbound',
            },
            prepare({ inbound }) {
              const formatInbound = inbound
                ? toTitleCase(inbound)
                : 'No Inbound message';

              return {
                title: formatInbound,
                media: MdOutlineQuestionAnswer,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare({ name }) {
      const formatName = name ? toTitleCase(name) : 'Name not provided';

      return {
        title: formatName,
        media: MdOutlineQuestionAnswer,
      };
    },
  },
});
