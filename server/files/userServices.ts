import Elysia from "elysia";
import { auth } from "../db/auth";

export const userRouter = new Elysia({
	name: "user",
	prefix: "/user",
})

	.mount(auth.handler)
	.derive({ as: "global" }, async ({ request: { headers } }) => {
		return {
			session: auth.api.getSession({ headers }),
		};
	})
	.macro({
		auth: {
			async resolve({ status, request: { headers } }) {
				const session = await auth.api.getSession({ headers });
				if (!session) return status(401);
				return { session };
			},
		},
	})
	.get("/me", async ({ session }) => {
		return session;
	})
