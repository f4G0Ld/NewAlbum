import mime from "mime-types";
import { db } from "../db/database";
import { files } from "../db/filesSchema";
import { redis } from "bun";
import { eq } from "drizzle-orm";

export const s3 = new Bun.S3Client({
	region: process.env.S3_REGION,
	endpoint: process.env.S3_ENDPOINT,
	accessKeyId: process.env.S3_ACCESS_KEY,
	secretAccessKey: process.env.S3_SECRET_KEY,
});

export async function uploadFile({ file }: { file: File }) {
	const byte = await file.arrayBuffer();
	const buf: Buffer<ArrayBufferLike> = Buffer.from(byte);

	const mimeType = mime.lookup(file.name);
	const resolvedMimeType = mimeType ? mimeType : "application/octet-stream";

	let id: string | undefined;
	await db.transaction(async (trx) => {
		const [f] = await trx
			.insert(files)
			.values({
				filename: file.name,
				fileSize: file.size,
				contentType: resolvedMimeType,
			})
			.returning();

		id = f.id;

		const metadata = s3.file(id);

		console.log(`song upload with id: ${id}`);

		console.log({
			res: await metadata.write(buf, {
				type: resolvedMimeType,
			}),
		});
	});

	return id;
}

export type FileMetadata = {
	id: string;
	filename: string;
	contentType: string;
	fileSize: number;
};

export async function GetFileMetadata(id: string): Promise<FileMetadata> {
	const cachedMetadata = await redis.get(id);

	if (cachedMetadata) {
		return JSON.parse(cachedMetadata) as FileMetadata;
	}

	const metadata = await db.query.files.findFirst({
		where: eq(files.id, id),
	});

	if (!metadata) {
		throw new Error("file not found");
	}

	await redis.set(id, JSON.stringify(metadata), "EX", 24 * 60 * 60);

	return metadata as FileMetadata;
}

export async function DeleteFile(id: string) {
	await db.transaction(async (trx) => {
		await trx.delete(files).where(eq(files.id, id));
		await s3.file(id).delete();
	});
}
