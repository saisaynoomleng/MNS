import * as t from 'drizzle-orm/pg-core';

export const timestamps = {
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: t
    .timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const userRole = t.pgEnum('userRole', ['user', 'admin', 'superadmin']);

export const paymentProviders = t.pgEnum('paymentProviders', [
  'stripe',
  'manual',
]);

export const userSubscriptionStatus = t.pgEnum('userSubscriptionStatus', [
  'active',
  'incomplete',
  'incomplete_expired',
  'trialing',
  'past_due',
  'canceled',
  'paused',
  'unpaid',
]);

export const workspaceStatus = t.pgEnum('workspaceStatus', [
  'active',
  'subscription_ends',
]);

export const invoiceSource = t.pgEnum('invoiceSource', [
  'subscription',
  'project_deposit',
  'project_balance',
  'one_off',
]);

export const currency = t.pgEnum('currency', ['usd', 'mmk']);

export const invoiceStatus = t.pgEnum('invoiceStatus', [
  'draft',
  'open',
  'paid',
  'void',
  'uncollectible',
  'refunded',
]);

export const contactStatus = t.pgEnum('contactStatus', [
  'new',
  'in_progress',
  'resolved',
  'spam',
]);

export const contactDirection = t.pgEnum('contactDirection', [
  'inbound',
  'outbound',
]);

export const reportIssueStatus = t.pgEnum('reportIssue', [
  'critical',
  'reopen',
  'in_progress',
  'resolved',
  'awaiting_approval',
  'new',
]);

export const featureRequestStatus = t.pgEnum('featureRequest', [
  'under_review',
  'new',
  'planned',
  'beta_testing',
  'in_progress',
  'declined',
]);
