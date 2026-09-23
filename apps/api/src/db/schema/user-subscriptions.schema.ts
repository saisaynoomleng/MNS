import * as t from 'drizzle-orm/pg-core';
import { UsersTable } from './users.schema.js';
import { SubscriptionsTable } from './subscriptions.schema.js';
import { AppsTable } from './apps.schema.js';
import { PaymentProvidersTable } from './payment-providers.schema.js';
import { timestamps, userSubscriptionStatus } from './schema-helper.js';
import { sql } from 'drizzle-orm';

export const UserSubscriptionsTable = t.pgTable(
  'user_subscriptions',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UsersTable.id, { onDelete: 'cascade' })
      .notNull(),
    subscriptionId: t
      .uuid('subscription_id')
      .references(() => SubscriptionsTable.id, { onDelete: 'cascade' })
      .notNull(),
    appId: t
      .uuid('app_id')
      .references(() => AppsTable.id, { onDelete: 'cascade' })
      .notNull(),
    paymentProviderId: t
      .uuid('payment_provider_id')
      .references(() => PaymentProvidersTable.id, { onDelete: 'cascade' })
      .notNull(),
    stripeSubscriptionId: t
      .varchar('stripe_subscription_id', { length: 255 })
      .unique(),
    currentPeriodStart: t
      .timestamp('current_period_start', { withTimezone: true })
      .notNull(),
    currentPeriodEnd: t
      .timestamp('current_period_end', { withTimezone: true })
      .notNull(),
    billingIntervalSnapshot: t.varchar('billing_interval_snapshot', {
      length: 255,
    }),
    status: userSubscriptionStatus('status').notNull().default('incomplete'),
    totalSnapshotInCents: t.integer('total_snapshot_in_cents').notNull(),
    ...timestamps,
  },
  (table) => [
    t.index('user_subscriptions_userId_idx').on(table.userId),
    t.index('user_subscriptions_appId_idx').on(table.appId),
    t
      .index('user_subscriptions_paymentProviderId_idx')
      .on(table.paymentProviderId),
    t.check(
      'period_check',
      sql`${table.currentPeriodEnd} > ${table.currentPeriodStart}`,
    ),
    t
      .index('user_subscription_active_idx')
      .on(table.userId)
      .where(sql`${table.status} = 'active'`),
    t.check('total_check', sql`${table.totalSnapshotInCents} > 0`),
  ],
);
