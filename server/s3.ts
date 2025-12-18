import mime from "mime-types";

export const s3 = new Bun.S3Client({
	region: process.env.S3_REGION,
	endpoint: process.env.S3_ENDPOINT,
	accessKeyId: process.env.S3_ACCESS_KEY,
	secretAccessKey: process.env.S3_SECRET_KEY,
});

export async function uploadFile({ file }: { file: File }) {
	const byte = await file.arrayBuffer();
	let buf: Buffer<ArrayBufferLike> = Buffer.from(byte);

	const mimeType = mime.lookup(file.name);
	const resolvedMimeType = mimeType ? mimeType : "application/octet-stream";
}
