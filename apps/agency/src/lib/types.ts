import * as z from 'zod';

export const UserFeatureHistorySchema = z.array(
  z.object({
    app: z.object({
      name: z.string(),
      id: z.uuid(),
    }),
    body: z.string(),
    createdAt: z.date(),
    status: z.enum([
      'under_review',
      'new',
      'planned',
      'beta_testing',
      'in_progress',
      'declined',
    ]),
  }),
);
export type UserFeatureHistoryType = z.infer<typeof UserFeatureHistorySchema>;

export const GetMeSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  companyName: z.string().optional(),
  position: z.string().optional(),
  address: z.object({
    id: z.uuid(),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.uuid(),
    address1: z.string().optional(),
    address2: z.string().optional(),
    city: z.string().optional(),
    zip: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
  }),
});
export type GetMeProps = z.infer<typeof GetMeSchema>;
