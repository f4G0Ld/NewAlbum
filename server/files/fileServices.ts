import Elysia from "elysia";
import { DeleteFile, GetFileMetadata, uploadFile, s3 } from "./s3";
import { db } from "../db/database";
import { userRouter } from "./userServices";
import { files } from "../db/schema";
import z from "zod/v4";
import { eq } from "drizzle-orm";

export const fileRouter = new Elysia({
	prefix: "/files",
})

	.use(userRouter)

	.get("/:id/stream", async ({ params, request, set }) => {
		try {  // старт try
			const meta = await GetFileMetadata(params.id);
			if (!meta) {
				set.status = 404;
				return { error: "File not found" };
			}

			const s3File = s3.file(meta.id);
			const fileStat = await s3File.stat();

			set.headers["Content-Type"] = meta.contentType;
			set.headers["Accept-Ranges"] = "bytes";
			set.headers["Content-Length"] = String(fileStat.size);

			const range = request.headers.get("range");
			if (range) {
				const [start, end] = range
					.replace(/bytes=/, "")
					.split("-")
					.map(Number);
				const finalStart = start;
				const finalEnd = end || fileStat.size - 1;

				set.status = 206;
				set.headers["Content-Range"] =
					`bytes ${finalStart}-${finalEnd}/${fileStat.size}`;
				set.headers["Content-Length"] = String(finalEnd - finalStart + 1);

				return new Response(s3File.stream(), {
					headers: {
						["Content-Type"]: meta.contentType,
						["Accept-Ranges"]: "bytes",
						["Content-Length"]: String(fileStat.size),
					},
				});
			}

			return new Response(s3File.stream(), {
				headers: {
					["Content-Type"]: meta.contentType,
					["Accept-Ranges"]: "bytes",
					["Content-Length"]: String(fileStat.size),
				},
			});
		} catch (error) throw new Error(String(Error))
	})

	.get("/", async () => {
		return await db.query.files.findMany();
	})

	.get("/:id", async ({ params, set }) => {
		const meta = await GetFileMetadata(params.id);

		if (!meta) {
			set.status = 404;
			return { error: "File not found" };
		}

		set.headers["Content-Type"] = meta.contentType;
		set.headers["Content-Disposition"] =
			`attachment; filename="${encodeURIComponent(meta.filename)}"`;

		const s3File = s3.file(meta.id);

		return new Response(s3File.stream(), {
			headers: {
				"Content-Type": meta.contentType,
				"Content-Disposition": `attachment; filename="${encodeURIComponent(meta.filename)}"`,
			},
		});
	})

	.get("/:id/data", async ({ params, set }) => {
		const meta = await GetFileMetadata(params.id);

		if (!meta) {
			set.status = 404;
			return {
				error: "File not found",
			};
		}

		const s3File = s3.file(meta.id);

		return {
			contentType: meta.contentType,
			fileName: meta.filename,
			size: (await s3File.stat()).size,
			duration: meta.duration,
		};
	})

	.post(
		"/",
		async ({ request }) => {
			try {
				const form = await request.formData();
				const files = form.getAll("files") as File[];

				const ids = await Promise.all(
					files.map((f, i) => {
						const duration =
							parseFloat(form.get(`duration_${i}`) as string) || 0;
						return uploadFile({ file: f, duration });
					}),
				);
				return { ids };
			} catch (error) {
				console.error(error);
			}
		},
		// {
		// 	auth: true,
		// },
	)

	.put(
		"/:id",
		async ({ params, body }) => {
			await db
				.update(files)
				.set({ filename: body.filename + ".mp3" })
				.where(eq(files.id, params.id));
		},
		{ body: z.object({ filename: z.string() }) },
	)

	.delete(
		"/:id",
		async ({ params }) => {
			await DeleteFile(params.id);
		},
		// {
		// 	auth: true,
		// },
	);
