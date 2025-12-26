import { app } from "@/server/app";
import { treaty } from "@elysiajs/eden";

export const { api } = treaty<typeof app>("vasya.lunarweb.ru", {
	fetch: { credentials: "include" },
});

export async function UploadFiles(
	filesWithDuration: Array<{ file: File; duration: number }>,
) {
	const form = new FormData();

	filesWithDuration.forEach((f, i) => {
		form.append("files", f.file);
		form.append(`duration_${i}`, f.duration.toString());
	});

	return fetch("/api/files", {
		method: "POST",
		body: form,
	});
}
