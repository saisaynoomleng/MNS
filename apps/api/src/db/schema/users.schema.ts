import * as t from 'drizzle-orm/pg-core';
import { timestamps, userRole } from './schema-helper.js';
import type { InferSelectModel } from 'drizzle-orm';

export const UsersTable = t.pgTable('users', {
  id: t.uuid('id').defaultRandom().primaryKey(),
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull(),
  companyName: t.varchar('companyName', { length: 255 }),
  position: t.varchar('position', { length: 255 }),
  emailVerified: t.boolean('emailVerified').default(false).notNull(),
  imageUrl: t.text('image'),
  role: userRole('role').notNull().default('user'),
  banned: t.boolean('banned').default(false),
  banReason: t.text('banReason'),
  banExpires: t.timestamp('banExpires'),
  ...timestamps,
});

export type SelectUserTable = InferSelectModel<typeof UsersTable>;
