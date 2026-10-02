import * as z from 'zod';

/**
 * Contacts
 */
export const ContactSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email({ error: 'Must be a valid email address' }),
  message: z.string(),
  companyName: z.string().optional(),
  minBudget: z.coerce.number(),
  maxBudget: z.coerce.number(),
  status: z.enum(['new', 'in_progress', 'resolved', 'spam']),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const AllContactsSchema = z.array(
  ContactSchema.pick({
    name: true,
    email: true,
    createdAt: true,
    id: true,
    status: true,
  }),
);

export type ContactType = z.infer<typeof ContactSchema>;
export type AllContactType = z.infer<typeof AllContactsSchema>;

/**
 * Reply to customer's email from contact form's schema
 */
export const ContactReplyFormSchema = z.object({
  id: z.uuid().min(1, { error: 'Id is required' }),
  message: z
    .string()
    .min(10, { error: 'Message must have at least 10 characters' })
    .max(5000, { error: 'Message cannot exceeds 5000 characters' }),
});
export type ContactReplyFormInput = z.input<typeof ContactReplyFormSchema>;
