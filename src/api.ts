import { app } from "@/server/app";
import { treaty } from "@elysiajs/eden";

export const {api} = treaty<typeof app> ('localhost:3000', {fetch:{credentials:'include'}})