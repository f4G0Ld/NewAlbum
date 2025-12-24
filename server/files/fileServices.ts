import Elysia from "elysia";
import { DeleteFile, GetFileMetadata, uploadFile, s3 } from "./s3";
import { db } from "../db/database";
import { userRouter } from "./userServices";

export const fileRouter = new Elysia({
	prefix: "/files",
})

	.use(userRouter)

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

	.delete(
		"/:id",
		async ({ params }) => {
			await DeleteFile(params.id);
		},
		{
			auth: true,
		},
	);
