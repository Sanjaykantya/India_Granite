import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@shared/schema";

let dbInstance: ReturnType<typeof drizzle> | null = null;
let pool: Pool | null = null;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  dbInstance = drizzle(pool, { schema });
} else {
  console.warn("DATABASE_URL environment variable is not set. Database features will be unavailable.");
}

export const db = dbInstance;

export async function closeDatabase() {
  if (pool) {
    await pool.end();
  }
}
