import * as t from 'drizzle-orm/pg-core';
import { UsersTable } from './users.schema.js';
import { AppsTable } from './apps.schema.js';
import { featureRequestStatus, timestamps } from './schema-helper.js';

export const FeatureRequestsTable = t.pgTable(
  'feature_requests',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UsersTable.id, { onDelete: 'cascade' })
      .notNull(),
    appId: t
      .uuid('app_id')
      .references(() => AppsTable.id, { onDelete: 'cascade' })
      .notNull(),
    body: t.text('body'),
    status: featureRequestStatus('status').notNull().default('new'),
    ...timestamps,
  },
  (table) => [t.index('featureRequest_appId_idx').on(table.appId)],
);
