import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "../db/schema";
import { db } from "../db/database";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: schema,
	}),
	emailAndPassword: {
		enabled: true,
	},
	user: {
		additionalFields: {
			role: {
				type: "string",
				required: true,
				defaultValue: "user",
			},
		},
	},
	databaseHooks: {
		user: {
			create: {
				before: async (user) => {
					return {
						data: {
							...user,
							role:
								user.email === process.env.MAIN_ADMIN_EMAIL ? "admin" : "user",
						},
					};
				},
			},
		},
	},
});
