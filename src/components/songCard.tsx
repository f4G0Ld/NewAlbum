"use client";

import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

export type songs = {
	id: string;
	duration: number;
	filename: string;
	fileSize: number;
	contentType: string;
	createdAt: Date;
};

export function SongCard({ song }: { song: songs }) {
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const formatDuration = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? 0 : ""}${remainingSeconds === 0 ? "00" : ""}${remainingSeconds}`;
	};

	useEffect(() => {
		if (!audioRef.current) return;

		const audio = audioRef.current;
		const handlePlay = () => setIsPlaying(true);
		const handlePause = () => setIsPlaying(false);

		audio.addEventListener("play", handlePlay);
		audio.addEventListener("pause", handlePause);

		return () => {
			audio.removeEventListener("play", handlePlay);
			audio.removeEventListener("pause", handlePause);
		};
	}, []);

	const playAudio = () => {
		if (!audioRef.current) return;
		if (audioRef.current.paused) {
			const audios = document.querySelectorAll("audio");
			audios.forEach((audio) => {
				if (audio !== audioRef.current) {
					audio.pause();
				}
			});
			audioRef.current.play();
		} else {
			audioRef.current.pause();
		}
	};

	return (
		<div className="w-full">
			<div className="flex justify-between items-center py-4 px-6 mx-2 md:mx-12 outline outline-[#161A1B]">
				<p className="font-[Anton] text-[20px]">
					«{song.filename.replace(".mp3", "")}»
				</p>
				<div className="flex items-center gap-5">
					<p>{formatDuration(song.duration)}</p>
					<button
						type="button"
						onClick={playAudio}
						className="bg-[#161A1B] text-[#DCD9D2] p-3 rounded-full cursor-pointer hover:opacity-90 transition-opacity"
					>
						{!isPlaying ? <FaPlay size={12} /> : <FaPause size={12} />}
					</button>
					{/** biome-ignore lint/a11y/useMediaCaption: <explanation> */}
					<audio ref={audioRef}>
						<source
							src={`/api/files/${song.id}/stream`}
							type={song.contentType}
						/>
					</audio>
				</div>
			</div>
		</div>
	);
}
