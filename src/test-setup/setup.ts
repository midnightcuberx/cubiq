import { newDb } from 'pg-mem';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const pgMem = newDb();

pgMem.adapters.createPg();

const client = new pg.Client({
});

await client.connect();

const db = drizzle(client);

export { db };