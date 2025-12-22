import { Header } from "@/src/components/header";
import { SongCart } from "@/src/components/songCard";
import AdvancedPlayer from "@/src/components/songList";

export default function Album() {
	

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
				<div>
					<SongCart />
				</div>
			</div>
		</div>
	);
}
