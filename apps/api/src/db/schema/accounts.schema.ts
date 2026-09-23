import * as t from 'drizzle-orm/pg-core';
import { UsersTable } from './users.schema.js';
import { timestamps } from './schema-helper.js';

export const AccountsTable = t.pgTable(
  'accounts',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    accountId: t.text('accountId').notNull(),
    providerId: t.text('providerId').notNull(),
    userId: t
      .uuid('userId')
      .notNull()
      .references(() => UsersTable.id, { onDelete: 'cascade' }),
    accessToken: t.text('accessToken'),
    refreshToken: t.text('refreshToken'),
    idToken: t.text('idToken'),
    accessTokenExpiresAt: t.timestamp('accessTokenExpiresAt'),
    refreshTokenExpiresAt: t.timestamp('refreshTokenExpiresAt'),
    scope: t.text('scope'),
    password: t.text('password'),
    ...timestamps,
  },
  (table) => [t.index('accounts_userId_idx').on(table.userId)],
);
