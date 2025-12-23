'use client'

import { api } from "@/src/api";
import { Header } from "@/src/components/header";
import { SongCart } from "@/src/components/songCard";
import { useQuery } from "@tanstack/react-query";

export default function Album() {
	const {data: songs} = useQuery({
		queryKey:['songs'],
		queryFn: async () => {
			const {data, error} = await api.files.get()
			if (error) 
				throw new Error(String(error.status))
			return data
		}

	})
	return (
		<div>
			<Header />
			<div>
				<div className="flex justify-between mx-12 items-baseline-last">
					<div className="flex gap-4 items-baseline-last">
						<h2 className="text-[32px] text-[Anton]">Song list</h2>
						<p className="text-[20px]">12 items</p>
					</div>
					<p className="text-[20px]">Listen to an excerpt of a song</p>
				</div>
				<div>{songs?.map((s) => (
					<SongCart song={s} key={s.id} />
				))}</div>
			</div>
		</div>
	);

}