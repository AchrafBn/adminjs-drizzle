import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema/user.js';

const pool = new Pool({
  connectionString: 'postgres://postgres:root@localhost:5432/expo',
});

export const db = drizzle(pool, {
  schema,
});
