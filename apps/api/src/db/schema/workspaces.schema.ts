import * as t from 'drizzle-orm/pg-core';
import { UsersTable } from './users.schema.js';
import { AppsTable } from './apps.schema.js';
import { UserSubscriptionsTable } from './user-subscriptions.schema.js';
import { timestamps, workspaceStatus } from './schema-helper.js';

export const WorkspacesTable = t.pgTable(
  'workspaces',
  {
    id: t.uuid('id').primaryKey().notNull(),
    name: t.varchar('name', { length: 255 }),
    userId: t
      .uuid('user_id')
      .references(() => UsersTable.id, { onDelete: 'cascade' })
      .notNull(),
    appId: t
      .uuid('app_id')
      .references(() => AppsTable.id, { onDelete: 'cascade' })
      .notNull(),
    userSubscriptionId: t
      .uuid('user_subscription_id')
      .references(() => UserSubscriptionsTable.id, { onDelete: 'cascade' })
      .notNull(),
    status: workspaceStatus('status').notNull().default('active'),
    ...timestamps,
  },
  (table) => [
    t.index('workspace_userId_idx').on(table.userId),
    t.index('workspace_appId_idx').on(table.appId),
    t.index('workspace_userSubscriptionId_idx').on(table.userSubscriptionId),
  ],
);
