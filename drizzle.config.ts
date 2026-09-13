import { defineConfig } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

// `drizzle-kit generate` only diffs schema.ts against the existing
// migration files, so it works without a database. Everything else
// (push, studio, ...) needs a real connection.
const isGenerate = process.argv.includes("generate");

if (!connectionString && !isGenerate) {
  throw new Error("Set DATABASE_URL (or POSTGRES_URL) in .env.local first.");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: { url: connectionString ?? "" },
});
