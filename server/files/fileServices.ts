import Elysia from "elysia";
import { DeleteFile, GetFileMetadata, uploadFile } from "./s3";
import { s3 } from "bun";
import { db } from "../db/database";

export const fileRouter = new Elysia({
	prefix: "/files",
})

.get('/', async () => {
	return await db.query.files.findMany()
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
		};
	})

	.post("/", async ({ request }) => {
		const form = request.formData();
		const files = (await form).getAll("files") as File[];

		await Promise.all(
			files.map(
				async (f) =>
					await uploadFile({
						file: f,
					}),
			),
		);
	})

    .delete('/:id', async ({params}) => {
        await DeleteFile(params.id)
    })
