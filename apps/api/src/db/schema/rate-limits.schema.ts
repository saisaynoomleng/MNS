import * as t from 'drizzle-orm/pg-core';

export const RateLimitsTable = t.pgTable('rate_limits', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  key: t.text('key').notNull().unique(),
  count: t.integer('count').notNull(),
  lastRequest: t.bigint('lastRequest', { mode: 'number' }).notNull(),
});
