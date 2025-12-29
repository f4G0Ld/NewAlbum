"use client";

import { api } from "@/src/api";
import { Header } from "@/src/components/header";
import { SongCard } from "@/src/components/songCard";
import { useQuery } from "@tanstack/react-query";

export default function Album() {
	const { data: songs } = useQuery({
		queryKey: ["songs"],
		queryFn: async () => {
			const { data, error } = await api.files.get();
			if (error) throw new Error(String(error.status));
			return data;
		},
	});

	const songCount = songs?.length || 0;

	return (
		<div>
			<Header />
			<div className="flex flex-col gap-6 my-15 max-w-480 mx-auto">
				<div className="flex justify-between mx-2 md:mx-12 items-end">
					<div className="flex gap-4 items-end">
						<h2 className="text-[32px] text-[Anton]">Song list</h2>
						<p className="text-[18px]">
							{songCount} {songCount === 1 ? "item" : "items"}
						</p>
					</div>
					<p className="text-[18px]">Listen to an excerpt of a song</p>
				</div>
				<div>
					{songCount === 0 ? (
						<p className="mx-2 md:mx-12">No songs avaible yet</p>
					) : (
						songs?.map((s) => <SongCard song={s} key={s.id} />)
					)}
				</div>
			</div>
		</div>
	);
}
