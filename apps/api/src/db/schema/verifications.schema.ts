import * as t from 'drizzle-orm/pg-core';
import { timestamps } from './schema-helper.js';

export const VerificationsTable = t.pgTable(
  'verifications',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    identifier: t.text('identifier').notNull(),
    value: t.text('value').notNull(),
    expiresAt: t.timestamp('expiresAt').notNull(),
    ...timestamps,
  },
  (table) => [t.index('verification_identifier_idx').on(table.identifier)],
);
