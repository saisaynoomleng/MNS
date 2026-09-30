import * as t from 'drizzle-orm/pg-core';
import { timestamps } from './schema-helper.js';
import type { InferInsertModel } from 'drizzle-orm';

export const NewslettersTable = t.pgTable('newsletters', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  email: t.varchar('email', { length: 255 }).notNull().unique(),
  ...timestamps,
});

export type InsertNewsletterTable = InferInsertModel<typeof NewslettersTable>;
