import * as t from 'drizzle-orm/pg-core';
import { UsersTable } from './users.schema.js';
import { timestamps } from './schema-helper.js';

export const AddressesTable = t.pgTable(
  'addresses',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UsersTable.id, { onDelete: 'cascade' })
      .notNull(),
    address1: t.text('street'),
    address2: t.text('address2'),
    city: t.varchar('city'),
    zip: t.varchar('zip'),
    state: t.varchar('state'),
    country: t.varchar('country'),
    ...timestamps,
  },
  (table) => [t.uniqueIndex('addresses_userId_idx').on(table.userId)],
);
