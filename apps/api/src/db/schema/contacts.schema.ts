import * as t from 'drizzle-orm/pg-core';
import { contactStatus, timestamps } from './schema-helper.js';
import { sql } from 'drizzle-orm';

export const ContactsTable = t.pgTable(
  'contacts',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    name: t.varchar('name', { length: 255 }).notNull(),
    email: t.varchar('email', { length: 255 }).notNull(),
    message: t.text('message').notNull(),
    companyName: t.varchar('company_name', { length: 255 }),
    minBudget: t.integer('min_budget').notNull(),
    maxBudget: t.integer('max_budget').notNull(),
    status: contactStatus('status').notNull().default('new'),
    ...timestamps,
  },
  (table) => [
    t
      .index('contact_new_idx')
      .on(table.status)
      .where(sql`${table.status} = 'new'`),
    t.check('budget_check', sql`${table.maxBudget} > ${table.minBudget}`),
    t.check('min_budget_check', sql`${table.minBudget} >= 0`),
  ],
);
