import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL environment variable is required.");
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1,
});

const db = drizzle(pool);

try {
  console.log("Running migrations...");
  await migrate(db, { migrationsFolder: "src/db/migrations" });
  console.log("Migrations applied successfully.");
} catch (err) {
  console.error("Migration failed!");
  console.error(err);
  process.exit(1);
} finally {
  await pool.end();
}
