import * as t from 'drizzle-orm/pg-core';
import { UsersTable } from './users.schema.js';
import { AppsTable } from './apps.schema.js';
import { reportIssueStatus, timestamps } from './schema-helper.js';

export const ReportIssuesTable = t.pgTable(
  'issues',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UsersTable.id, { onDelete: 'set null' }),
    userNameSnapshot: t.varchar('user_name_snapshot').notNull(),
    appId: t
      .uuid('app_id')
      .references(() => AppsTable.id, { onDelete: 'cascade' })
      .notNull(),
    body: t.text('body').notNull(),
    status: reportIssueStatus('status').default('new').notNull(),
    ...timestamps,
  },
  (table) => [t.index('report_issues_appId_idx').on(table.appId)],
);
