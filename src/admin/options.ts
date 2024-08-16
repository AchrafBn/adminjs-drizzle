import { AdminJSOptions } from 'adminjs';
import { userTable } from 'src/db/schema/user.js';
import { db } from 'src/db/drizzle.js';

import componentLoader from './component-loader.js';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [userTable],
  databases: [db],
};

export default options;
