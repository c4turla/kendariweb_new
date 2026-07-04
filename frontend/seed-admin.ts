import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { user } from "./src/db/schema";
import { auth } from "./src/lib/auth"; // server auth config
import { eq } from "drizzle-orm";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function createAdmin() {
  console.log("Creating default admin user...");
  try {
    const adminEmail = "admin@kendariweb.com";
    const adminPassword = "password123";

    // Call better-auth API direct method to create user with password
    const response = await auth.api.signUpEmail({
        body: {
            email: adminEmail,
            password: adminPassword,
            name: "Administrator"
        }
    });
    
    console.log("Admin user created successfully!");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
  } catch (err: any) {
    if (err.message?.includes("already exists")) {
       console.log("Admin user already exists.");
    } else {
       console.error("Failed to create admin:", err);
    }
  }
  process.exit(0);
}

createAdmin();
