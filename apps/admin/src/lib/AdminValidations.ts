import * as z from 'zod';

export const ContactSchema = z
  .object({
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
  })
  .refine((data) => data.maxBudget > data.minBudget, {
    error: 'Maximum budget is lower than the minimum budget',
    path: ['maxBudget'],
  });

export const AllContactsSchema = z.array(ContactSchema);

export type ContactType = z.infer<typeof ContactSchema>;
