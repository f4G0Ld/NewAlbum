import { App } from "@/server/app";
import { treaty } from "@elysiajs/eden";

let origin = "";
if (typeof window !== "undefined") {
  origin = window.location.origin;
}
export const api = treaty<App>(`${origin}`).api;

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
