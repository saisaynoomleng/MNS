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
