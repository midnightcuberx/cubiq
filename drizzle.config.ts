import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './src/data-layer/adapters/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})