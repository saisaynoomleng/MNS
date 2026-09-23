import * as t from 'drizzle-orm/pg-core';
import { timestamps } from './schema-helper.js';
import { sql } from 'drizzle-orm';

export const ServicesTable = t.pgTable(
  'services',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    name: t.varchar('name').notNull(),
    priceInCents: t.integer('price_in_cents').notNull(),
    ...timestamps,
  },
  (table) => [t.check('price_check', sql`${table.priceInCents} > 0`)],
);
