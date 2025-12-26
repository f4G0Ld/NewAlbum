import { fileRouter } from "@/server/files/fileServices";
import { userRouter } from "@/server/files/userServices";
import Elysia from "elysia";
import { auth } from "./files/auth";

export const app = new Elysia({
	name: "app",
	prefix: "/api",
})

	.use(fileRouter)
	.use(userRouter)
	.mount(auth.handler);
