import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/database";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	emailAndPassword: { enabled: true },
	appName: "arctic-monkeys",
	plugins: [
		nextCookies(),
		admin({
			defaultRole: "user",
		}),
	],
});
