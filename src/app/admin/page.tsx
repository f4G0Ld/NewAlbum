"use client";

import Image from "next/image";
import GroupLogoIcon from "../../public/GroupLogoIcon.svg";
import Link from "next/link";
import { PiSignOutBold } from "react-icons/pi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { api, UploadFiles } from "@/src/api";
import { queryClient } from "@/src/queryClient";
import { useEffect, useState } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { songs } from "@/src/components/songCard";
import { useRouter } from "next/navigation";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const getAudioDuration = (file: File): Promise<number> => {
	return new Promise((resolve, reject) => {
		const audio = new Audio();
		audio.src = URL.createObjectURL(file);
		audio.onloadedmetadata = () => {
			URL.revokeObjectURL(audio.src);
			resolve(Math.floor(audio.duration));
		};

		audio.onerror = () => {
			URL.revokeObjectURL(audio.src);
			reject(new Error("Не удалось загрузить аудио"));
		};
	});
};

export default function Admin() {
	const [isCalculating, setIsCalculating] = useState(false);

	const { data: me, isLoading } = useQuery({
		queryKey: ["/me"],
		queryFn: async () => {
			const { data, error } = await api.user.me.get();
			if (error) throw new Error(String(error.status));
			return data;
		},
	});

	const rt = useRouter();

	useEffect(() => {
		if (me?.user?.role !== "admin" && !isLoading) {
			toast.error("User have not enough rights");
			rt.push("/");
		}
	});

	const loadFilesMutation = useMutation({
		mutationFn: async (files: File[]) => {
			setIsCalculating(true);
			try {
				const filesWithDuration = await Promise.all(
					files.map(async (file) => {
						let duration = 0;

						if (file.type.startsWith("audio/")) {
							try {
								duration = await getAudioDuration(file);
								console.log(`File: ${file.name}; Duration: ${duration} sec`);
							} catch (error) {
								console.error(`Bug for ${file.name}:`, error);
							}
						} else throw new Error(`Attempt To Upload Incorrect File`);

						return { file, duration };
					}),
				);

				const res = await UploadFiles(filesWithDuration);
				if (!res.ok) {
					console.log(res);
					throw new Error(String(res.status));
				}
				form.reset();

				return res;
			} finally {
				setIsCalculating(false);
			}
		},
		onSuccess: async () => {
			queryClient.invalidateQueries({ queryKey: ["songs"] });
			toast.success("Song uploaded successfully");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async (songId: string) => {
			const { error } = await api.files({ id: songId }).delete();
			if (error) throw new Error(String(error.status));
			return songId;
		},
		onSuccess: async (deletedId) => {
			await queryClient.invalidateQueries({ queryKey: ["songs"] });
		},
		onError: (error) => {
			alert(`Delete Error: ${error.message}`);
		},
	});

	const handleDelete = (id: string) => {
		deleteMutation.mutate(id);
	};

	const form = useForm({
		defaultValues: {
			file: null as File[] | null,
		},
		onSubmit: async ({ value }) => {
			if (value.file === null) {
				console.log("Uploading Is Empty");
			} else {
				await loadFilesMutation.mutateAsync(value.file);
			}
		},
	});

	const Field = form.Field;

	const { data: songs } = useQuery({
		queryKey: ["songs"],
		queryFn: async () => {
			const { data, error } = await api.files.get();
			if (error) throw new Error(String(error.status));
			return data;
		},
	});

	const formatDuration = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds < 10 ? 0 : ""}${remainingSeconds === 0 ? "00" : ""}${remainingSeconds}`;
	};

	if (isLoading) {
		return <p className="text-2xl">Loading...</p>;
	}
	if (me?.user?.role !=='admin') {
		return (<p className="text-2xl">Redirecting</p>)
	}

	return (
		<div className="flex flex-col gap-20 mb-15 max-w-480 mx-auto">
			<div className="flex justify-between px-12 py-10">
				<Link href="/">
					<Image src={GroupLogoIcon} alt="!" width={124} height={60} />
				</Link>
				<Link href="/sign-out" className="flex gap-3 items-center">
					<p className="text-[24px]">Sign Out</p>
					<PiSignOutBold size={24} />
				</Link>
			</div>
			<h1 className="text-[32px] leading-none mx-12">Admin Panel</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<Field name="file">
					{(f) => (
						<div className="space-y-3 bg-[#B8B2A5] w-fit p-4 rounded-lg mx-12">
							<h2 className="text-[20px]">Click Below For Song Upload</h2>
							<input
								className="cursor-pointer"
								type="file"
								multiple
								accept="audio/"
								onChange={(e) => {
									const files = e.target.files;
									if (files !== null) f.handleChange(Array.from(files));
								}}
							/>
							<Button
								type="submit"
								disabled={loadFilesMutation.isPending || isCalculating}
							>
								{isCalculating
									? "Duration Calculating..."
									: loadFilesMutation.isPending
										? "Uploading..."
										: "Upload Audio"}
							</Button>
						</div>
					)}
				</Field>
			</form>
			<div className="flex flex-col gap-5">
				<h2 className="ml-12 text-[20px]">Uploaded Songs</h2>
				<div>
					{songs?.map((song) => (
						<div key={song.id}>
							<div className="flex justify-between items-center py-4 px-6 mx-12 outline">
								<p className="font-[Anton] text-[20px]">
									«{song.filename.replace(".mp3", "")}»
								</p>
								<div className="flex gap-5">
									<p>{formatDuration(song.duration)}</p>
									<button
										type="button"
										onClick={() => {
											if (
												confirm(
													`Delete song: "${song.filename.replace(".mp3", "")}"?`,
												)
											)
												handleDelete(song.id);
										}}
										disabled={deleteMutation.isPending}
									>
										<FaTrashAlt
											size={20}
											className="hover:text-red-500 transition-colors cursor-pointer"
										/>
									</button>
									<UpdateSong song={song} />
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

function UpdateSong({ song }: { song: songs }) {
	const updateMutation = useMutation({
		mutationFn: async ({
			songId,
			filename,
		}: {
			songId: string;
			filename: string;
		}) => {
			const { error } = await api.files({ id: songId }).put({ filename });
			if (error) throw new Error(String(error.status));
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["songs"] });
		},
		onError: (error) => {
			alert(`Update Error: ${error.message}`);
		},
	});

	const form = useForm({
		defaultValues: {
			filename: song.filename.replace(".mp3", ""),
		},
		onSubmit: async ({ value }) => {
			await updateMutation.mutateAsync({
				filename: value.filename,
				songId: song.id,
			});
		},
	});

	const Field = form.Field;

	return (
		<Dialog>
			<DialogTrigger>
				<FaPen />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="font-light">Update Song Title</DialogTitle>
				</DialogHeader>
				<form
					className="flex flex-col gap-5"
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<Field name="filename">
						{(f) => (
							<div className="flex flex-col gap-3">
								<p className="text-[20px]">Audio Title</p>
								<input
									type="text"
									value={f.state.value}
									onChange={(e) => f.handleChange(e.target.value)}
									className="text-[18px] bg-black/10 rounded-md px-3 py-2"
								/>
							</div>
						)}
					</Field>
					<DialogClose
						type={"submit"}
						className="bg-[#B8B2A5] w-full py-2 rounded-md"
					>
						Save
					</DialogClose>
				</form>
			</DialogContent>
		</Dialog>
	);
}
