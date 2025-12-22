import * as pg from "drizzle-orm/pg-core";
export * from './filesSchema'

export const songs = pg.pgTable("songs", {
	id: pg
		.varchar({ length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => Bun.randomUUIDv7()),

	title: pg.varchar({ length: 255 }).notNull(),

});
