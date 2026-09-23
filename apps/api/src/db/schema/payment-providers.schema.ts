import * as t from 'drizzle-orm/pg-core';
import { paymentProviders, timestamps } from './schema-helper.js';

export const PaymentProvidersTable = t.pgTable('payment_providers', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: paymentProviders('name').notNull().default('stripe'),
  ...timestamps,
});
