"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export function SongCart({ id }: { id: string }) {
	const { data: song } = useQuery({
		queryKey: ["song"],
		queryFn: async () => {
			const { data, error } = await api.files({ id }).data.get();
			if (error) {
				throw new Error(String(error.status));
			}
			return data;
		},
	});

	return (
		<div>
			<div>{song?.fileName}</div>
		</div>
	);
}
