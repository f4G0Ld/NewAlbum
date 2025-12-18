import { Header } from "@/src/components/header";

export default function Album() {
	return (
		<div>
			<Header />
			<div>
				<div className="flex justify-between mx-12">
					<div className="flex gap-5">
						<h2 className="text-[32px] text-[Anton]">Song list</h2>
						<p>12 items</p>
					</div>
					<p>Listen to an excerpt of a song</p>
				</div>
				<div></div>
			</div>
		</div>
	);
}
