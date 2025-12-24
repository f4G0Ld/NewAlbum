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
	const formatDuration = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? 0 : ""}${remainingSeconds === 0 ? "00" : ""}${remainingSeconds}`;
	};

	return (
		<div className="w-full">
			<div className="flex justify-between items-center py-4 px-6 mx-12 outline">
				<p className="font-[Anton] text-[20px]">
					«{song.filename.replace(".mp3", "")}»
				</p>
				<p>{formatDuration(song.duration)}</p>
			</div>
		</div>
	);
}
