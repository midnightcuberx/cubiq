import {drizzle} from 'drizzle-orm/postgres-js';

console.log(process.env.DATABASE_URL);
export const db = drizzle(process.env.DATABASE_URL || "");