import * as t from 'drizzle-orm/pg-core';
import { ContactsTable } from './contacts.schema.js';
import {
  contactDirection,
  contactMessageStatus,
  timestamps,
} from './schema-helper.js';
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export const ContactMessagesTable = t.pgTable('contact_messages', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  contactId: t
    .uuid('contact_id')
    .references(() => ContactsTable.id, { onDelete: 'cascade' })
    .notNull(),
  direction: contactDirection('direction').default('outbound').notNull(),
  status: contactMessageStatus('status').default('pending'),
  message: t.text('message').notNull(),
  ...timestamps,
});

export type InferInsertContactMessageTable = InferInsertModel<
  typeof ContactMessagesTable
>;

export type InferSelectContactMessageTable = InferSelectModel<
  typeof ContactMessagesTable
>;
