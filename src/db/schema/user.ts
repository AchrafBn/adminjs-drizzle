import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
  id: text('id').primaryKey(),
  email: text('email').unique(),
  username: text('username'),
  // isAdmin: boolean("is_admin").notNull().default(false),

});
