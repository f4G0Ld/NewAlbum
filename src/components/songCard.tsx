"use client";

import { Pause, Play } from "lucide-react";
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

export function SongCart({ song }: { song: songs }) {
	const [isPlaying, setIsPlaying] = useState(false)
	const formatDuration = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? 0 : ""}${remainingSeconds === 0 ? "00" : ""}${remainingSeconds}`;
	};

	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		if (!audioRef.current) return
		
		const audio = audioRef.current
		const handlePlay = () => setIsPlaying(true)
		const handlePause = () => setIsPlaying(false)

		audio.addEventListener('play', handlePlay)
		audio.addEventListener('pause', handlePause)
		
		return () => {
			audio.removeEventListener('play', handlePlay)
			audio.removeEventListener('pause', handlePause)
		}

	}, [])
	

	const playAudio = () => {
		if (!audioRef.current) return;
		if (audioRef.current.paused) {
			const audios = document.querySelectorAll("audio");
			audios.forEach((audio) => {
				if (audio !== audioRef.current) {
					audio.pause();
				}
			});
			audioRef.current.play()
		} else {
			audioRef.current.pause();
		}
	};

	return (
		<div className="w-full">
			<div className="flex justify-between items-center py-4 px-6 mx-12 outline">
				<p className="font-[Anton] text-[20px]">
					«{song.filename.replace(".mp3", "")}»
				</p>
				<div className="flex items-center gap-5">
					<p>{formatDuration(song.duration)}</p>
					<button onClick={playAudio} className="bg-[#161A1B] text-[#DCD9D2] p-3 rounded-full">
						{!isPlaying ? <FaPlay size={12}/> : <FaPause size={12}/>}
					</button>
					<audio ref={audioRef}>
						<source
							src={`http://localhost:3000/api/files/${song.id}/stream`}
							type={song.contentType}
						/>
					</audio>
				</div>
			</div>
		</div>
	);
}
