"use client";

type songs = {
	id: string;
	duration: number;
	filename: string;
	fileSize: number;
	contentType: string;
	createdAt: Date;
};

export function SongCart({ song }: { song: songs }) {
	return (
		<div className="w-full">
			<div className="flex justify-between items-center py-4 px-6 outline">
				<p className="font-[Anton] text-[20px]">{song.filename.replace("_", "").replace(".mp3", "")}</p>
				<p>{song.duration}</p>
			</div>
		</div>
	);
}
