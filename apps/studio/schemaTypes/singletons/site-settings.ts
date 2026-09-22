import { IoSettingsOutline } from 'react-icons/io5';
import { defineArrayMember, defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  type: 'document',
  icon: IoSettingsOutline,
  groups: [
    { title: 'Branding', name: 'branding' },
    { title: 'Navigation', name: 'navigation' },
    { title: 'Footer', name: 'footer' },
  ],
  fields: [
    // branding
    defineField({
      name: 'siteName',
      type: 'string',
      validation: (rule) => rule.required(),
      group: 'branding',
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      of: [{ type: 'socialLink' }],
      validation: (rule) => rule.required(),
      group: 'branding',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      validation: (rule) => rule.required(),
      group: 'branding',
    }),

    // navigation
    defineField({
      name: 'navLinks',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'navLink',
        }),
        defineArrayMember({
          type: 'navDropdown',
        }),
      ],
      group: 'navigation',
    }),

    // footer
    defineField({
      name: 'footerColumns',
      type: 'array',
      of: [defineArrayMember({ type: 'footerColumn' })],
      group: 'footer',
    }),
    defineField({
      name: 'footerText',
      type: 'text',
      group: 'footer',
    }),
    defineField({
      name: 'contactInfo',
      type: 'object',
      fields: [
        defineField({
          name: 'street',
          type: 'string',
        }),
        defineField({
          name: 'zip',
          type: 'string',
        }),
        defineField({
          name: 'city',
          type: 'string',
        }),
        defineField({
          name: 'state',
          type: 'string',
        }),
        defineField({
          name: 'email',
          type: 'email',
        }),
        defineField({
          name: 'country',
          type: 'string',
        }),
      ],
      group: 'footer',
    }),
  ],
});
