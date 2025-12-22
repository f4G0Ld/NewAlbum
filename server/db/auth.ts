import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./database";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	appName: "artic-monkeys",
	plugins: [nextCookies()],
});
