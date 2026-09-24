import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { relations } from './relations.js';
import env, { isProd, isTest } from '../lib/env.js';
import { remember } from '@epic-web/remember';

const createPool = () => {
  const pool = new Pool({
    connectionString: env.DATABASE_URL,
    max: 20,
  });

  pool.on('error', (err) => {
    console.error('PG Pool error', err);
  });

  return pool;
};

let client: Pool;

if (isProd()) {
  client = createPool();
} else {
  client = remember('db Pool', () => createPool());
}

const db = drizzle({ client, relations, logger: isTest() ? false : true });

export default db;
export * from './schema/index.js';
