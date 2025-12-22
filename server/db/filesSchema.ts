import * as pg from "drizzle-orm/pg-core";
export * from "./auth-schema";

export const files = pg.pgTable("files", {
	id: pg
		.varchar("id", { length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => Bun.randomUUIDv7()),

	filename: pg.varchar("filename", { length: 255 }).notNull(),

	fileSize: pg.integer("file_size").notNull(),

	contentType: pg.varchar("content_type", { length: 255 }).notNull(),

	createdAt: pg.timestamp("created_at").notNull().defaultNow(),
});
