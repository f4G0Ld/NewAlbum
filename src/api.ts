import { app } from "@/server/app";
import { treaty } from "@elysiajs/eden";

export const { api } = treaty<typeof app>("localhost:3000", {
	fetch: { credentials: "include" },
});

export async function UploadFiles(files: File[]) {
	const form = new FormData();

	files.forEach((f) => form.append("files", f));

	const res = await fetch("/api/files", {
		method: "POST",
		body: form,
		credentials: "include",
	});

	return res;
}
