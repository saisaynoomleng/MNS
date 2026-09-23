import * as t from 'drizzle-orm/pg-core';
import { ContactsTable } from './contacts.schema.js';
import { contactDirection, timestamps } from './schema-helper.js';

export const ContactMessagesTable = t.pgTable('contact_messages', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  contactId: t
    .uuid('contact_id')
    .references(() => ContactsTable.id, { onDelete: 'cascade' })
    .notNull(),
  direction: contactDirection('direction').default('outbound').notNull(),
  message: t.text('message').notNull(),
  ...timestamps,
});
