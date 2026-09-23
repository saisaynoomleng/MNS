import { formatPriceInUSD, toTitleCase } from '@mns/utils';
import { FaMoneyCheckDollar } from 'react-icons/fa6';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const subscriptionType = defineType({
  name: 'subscription',
  type: 'document',
  icon: FaMoneyCheckDollar,
  fields: [
    defineField({
      name: 'name',
      title: 'Subscription Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) =>
        rule.required().info(`Required to generate a page on the website`),
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'pricePerMonth',
      title: 'Price Per Month',
      type: 'number',
      initialValue: 49.99,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Subscription Type',
      type: 'reference',
      to: [{ type: 'service' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Subscription summary',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'inclusives',
      title: 'Inclusive Features',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'feature',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'body',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'exclusives',
      title: 'Exclusive Features',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'feature',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'body',
              type: 'text',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      price: 'pricePerMonth',
      type: 'type.name',
    },
    prepare({ name, price, type }) {
      const formatName = name ? toTitleCase(name) : 'Name not provided';
      const formatType = type ? toTitleCase(type) : 'Service Type not provided';
      const formatPrice = price
        ? formatPriceInUSD(price)
        : 'Price not provided';

      return {
        title: formatName,
        subtitle: `Price: ${formatPrice} | Type: ${formatType}`,
        media: FaMoneyCheckDollar,
      };
    },
  },
});
