import * as t from 'drizzle-orm/pg-core';
import { timestamps } from './schema-helper.js';

export const AppsTable = t.pgTable('apps', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  sanityId: t.varchar('sanity_id', { length: 255 }).notNull().unique(),
  name: t.varchar('name', { length: 255 }).notNull(),
  ...timestamps,
});
