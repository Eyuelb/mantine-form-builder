import envConfig from './config/dotenv';
import type { Config } from 'drizzle-kit';

export default {
  dialect:'postgresql',
  schema: "./db/schema/index.ts",
  out: "./db/migrations",
  dbCredentials: {
    url: envConfig.databaseUrl,
  },
  verbose: true
} satisfies Config;
