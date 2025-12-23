"use client";

import { api } from "../api";

type songs = {
id: string;
duration: number;
filename: string;
fileSize: number;
contentType: string;
createdAt: Date;
}

export function SongCart({ song }: { song: songs }) {

	return (
		<div>
			<div>{song.filename.replace('_', '').replace('.mp3', '')}</div>
		</div>
	);
}
