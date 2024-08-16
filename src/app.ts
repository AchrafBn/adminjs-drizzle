import express from 'express';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';
import { Database, Resource } from 'adminjs-drizzle/pg';

import * as usersTable from './db/schema/user.js';
import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import { db } from './db/drizzle.js';

const port = process.env.PORT || 3000;
AdminJS.registerAdapter({ Database, Resource });

const start = async () => {
  const app = express();

  const admin = new AdminJS({
    resources: [
      { table: usersTable, db },
    ],
    rootPath: '/admin',
  });
  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider,
    },
    null,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
    },
  );

  app.use(admin.options.rootPath, router);

  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
