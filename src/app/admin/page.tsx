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
import { use, useState } from "react";
import { files } from "@/server/db/filesSchema";
import { SongCart } from "@/src/components/songCard";

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
	const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

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
						}

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
			queryClient.invalidateQueries({ queryKey: ["files"] });
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async (songId: string) => {
			const {error} = await api.files.delete({id: songId})
			if (error) throw new Error(String(error.status))
			return songId
		},
		onSuccess: (deletedId) => {
			queryClient.invalidateQueries({queryKey: ['songs']})
			setDeleteConfirm(null)
		},
		onError: (error) => {
			alert(`Delete Error: ${error.message}`)
		}
	})

	const handleDelete = (id: string) => {
		if (deleteConfirm !== id) {
			setDeleteConfirm(id)
			return
		}
		deleteMutation.mutate(id)
	}

	const cancelDelete = () => {
		setDeleteConfirm(null)
	}

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

	return (
		<div className="flex flex-col gap-20 mb-15">
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
				<h2 className="ml-12">Uploaded Songs</h2>
				{songs?.map((s) => (
					<SongCart song={s} key={s.id} />
				))}
			</div>
		</div>
	);
}
