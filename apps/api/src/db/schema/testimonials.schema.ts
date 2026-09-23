import * as t from 'drizzle-orm/pg-core';
import { UsersTable } from './users.schema.js';
import { timestamps } from './schema-helper.js';
import { sql } from 'drizzle-orm';

export const TestimonialsTable = t.pgTable(
  'testimonials',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UsersTable.id, { onDelete: 'set null' }),
    userNameSnapshot: t
      .varchar('user_name_snapshot', { length: 255 })
      .notNull(),
    title: t.text('title').notNull(),
    rating: t.integer('rating').notNull(),
    imageUrl: t.varchar('image_url'),
    body: t.text('body'),
    ...timestamps,
  },
  (table) => [t.check('rating_check', sql`${table.rating} BETWEEN 1 AND 5`)],
);
