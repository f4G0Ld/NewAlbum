import { fileRouter } from "@/server/files/fileServices";
import { userRouter } from "@/server/files/userServices";
import Elysia from "elysia";

export const app = new Elysia({
	name: "app",
	prefix: "/api",
})

	.use(fileRouter)
	.use(userRouter);
