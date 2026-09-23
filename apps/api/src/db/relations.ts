import { defineRelations } from 'drizzle-orm';
import * as schema from './schema/index.js';

export const relations = defineRelations(schema, (r) => ({
  // users
  UsersTable: {
    sessions: r.many.SessionsTable({
      from: r.UsersTable.id,
      to: r.SessionsTable.userId,
    }),
    accounts: r.many.AccountsTable({
      from: r.UsersTable.id,
      to: r.AccountsTable.userId,
    }),
    subscriptions: r.many.SubscriptionsTable({
      from: r.UsersTable.id.through(r.UserSubscriptionsTable.userId),
      to: r.SubscriptionsTable.id.through(
        r.UserSubscriptionsTable.subscriptionId,
      ),
    }),
    apps: r.many.AppsTable({
      from: r.UsersTable.id.through(r.WorkspacesTable.userId),
      to: r.AppsTable.id.through(r.WorkspacesTable.appId),
    }),
    workspaces: r.many.WorkspacesTable({
      from: r.UsersTable.id,
      to: r.WorkspacesTable.userId,
    }),
    testimonials: r.many.TestimonialsTable({
      from: r.UsersTable.id,
      to: r.TestimonialsTable.userId,
    }),
    reports: r.many.ReportIssuesTable({
      from: r.UsersTable.id,
      to: r.ReportIssuesTable.userId,
    }),
    featureRequests: r.many.FeatureRequestsTable({
      from: r.UsersTable.id,
      to: r.FeatureRequestsTable.userId,
    }),
    invoices: r.many.InvoicesTable({
      from: r.UsersTable.id,
      to: r.InvoicesTable.userId,
    }),
  },

  //   sessions
  SessionsTable: {
    user: r.one.UsersTable({
      from: r.SessionsTable.userId,
      to: r.UsersTable.id,
    }),
  },

  //   accounts
  AccountsTable: {
    user: r.one.UsersTable({
      from: r.AccountsTable.userId,
      to: r.UsersTable.id,
    }),
  },

  //   subscriptions
  SubscriptionsTable: {
    users: r.many.UsersTable({
      from: r.SubscriptionsTable.id.through(
        r.UserSubscriptionsTable.subscriptionId,
      ),
      to: r.UsersTable.id.through(r.UserSubscriptionsTable.userId),
    }),

    apps: r.many.AppsTable({
      from: r.SubscriptionsTable.id.through(
        r.UserSubscriptionsTable.subscriptionId,
      ),
      to: r.AppsTable.id.through(r.UserSubscriptionsTable.appId),
    }),
  },

  //   contacts
  ContactsTable: {
    messages: r.many.ContactMessagesTable({
      from: r.ContactsTable.id,
      to: r.ContactMessagesTable.contactId,
    }),
  },

  //   contact messages
  ContactMessagesTable: {
    contact: r.one.ContactsTable({
      from: r.ContactMessagesTable.contactId,
      to: r.ContactsTable.id,
    }),
  },

  // apps
  AppsTable: {
    featureRequests: r.many.FeatureRequestsTable({
      from: r.AppsTable.id,
      to: r.FeatureRequestsTable.appId,
    }),

    issues: r.many.ReportIssuesTable({
      from: r.AppsTable.id,
      to: r.ReportIssuesTable.appId,
    }),
  },

  //   report issues
  ReportIssuesTable: {
    app: r.one.AppsTable({
      from: r.ReportIssuesTable.appId,
      to: r.AppsTable.id,
    }),
  },

  //   feature requests
  FeatureRequestsTable: {
    app: r.one.AppsTable({
      from: r.FeatureRequestsTable.appId,
      to: r.AppsTable.id,
    }),
  },

  //   invoices
  InvoicesTable: {
    user: r.one.UsersTable({
      from: r.InvoicesTable.userId,
      to: r.UsersTable.id,
    }),

    provider: r.one.PaymentProvidersTable({
      from: r.InvoicesTable.paymentProviderId,
      to: r.PaymentProvidersTable.id,
    }),
  },

  //   payment provider
  PaymentProvidersTable: {
    invoices: r.many.InvoicesTable({
      from: r.PaymentProvidersTable.id,
      to: r.InvoicesTable.paymentProviderId,
    }),
  },
}));
