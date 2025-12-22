import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./server/db",
	out: "./drizzle/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL || "",
	},
});
