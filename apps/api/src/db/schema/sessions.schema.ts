import * as t from 'drizzle-orm/pg-core';
import { timestamps } from './schema-helper.js';
import { UsersTable } from './users.schema.js';

export const SessionsTable = t.pgTable(
  'sessions',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    expiresAt: t.timestamp('expiresAt').notNull(),
    token: t.text('token').notNull().unique(),
    ipAddress: t.text('ipAddress'),
    userAgent: t.text('userAgent'),
    userId: t
      .uuid('useId')
      .notNull()
      .references(() => UsersTable.id, { onDelete: 'cascade' }),
    impersonatedBy: t.text('impersonatedBy'),
    ...timestamps,
  },
  (table) => [t.index('sessions_userId_idx').on(table.userId)],
);
