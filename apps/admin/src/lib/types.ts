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
