// prisma.config.ts
import { defineConfig } from '@prisma/config';

export default defineConfig({
  // Path to your main Prisma schema file
  schema: 'prisma/schema.prisma',

  // Enables experimental features you may use
  experimental: {
    adapter: true,
    externalTables: true,
    studio: true,
  },

  // Migration configuration
  migrations: {
    // Where migration files are stored
    path: 'prisma/migrations',

    // Command to run seeds
    seed: 'bun run db:seed',

    // Optional: custom shadow DB name for migrations (can be blank if not used)
    initShadowDb: 'shadow_db'
  },

  // (Optional) Path to store generated SQL views if using `views` feature
  views: {
    path: 'prisma/views',
  },

  // (Optional) For typed SQL preview feature
  typedSql: {
    path: 'prisma/typed-sql',
  }
});
