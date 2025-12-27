import Image from "next/image";
import TicketCover from "../public/TicketCover.svg";
import Barcode from "../public/Barcode.svg";

export function Ticket() {
	return (
		<div className="grid grid-cols-6 bg-[#DCD9D2] text-[18px] max-w-6xl">
			<span className="bg-[#FFE484] p-7.5 rounded-full font-[Anton] text-[40px] absolute transform -translate-x-1/2 -translate-y-1/2">
				25$
			</span>
			<div className="col-span-5">
				<Image src={TicketCover} alt="!" width={1098} height={200} />
				<div className="flex justify-between px-15 py-8">
					<div className="space-y-2">
						<h2 className="text-[32px]">AM - Arctic Monkey</h2>
						<p className="">Adult Ticket</p>
					</div>
					<div className="space-y-2">
						<h4>9.09.2013</h4>
						<p>Saturday 11am - 6pm</p>
					</div>
					<div className="space-y-2 leading-none">
						<p>Tabe Britian</p>
						<p>Milbank St. 13B</p>
						<p>London, UK</p>
					</div>
				</div>
			</div>
			<div className="px-10 py-5">
				<div>
					<p>1 Day Pass</p>
					<p>9.09.2013</p>
					<p>K3-8693-111</p>
				</div>
				<div className="flex-1 flex items-center justify-center pt-8 pr-4">
					<div className="flex flex-col items-center gap-2 transform -rotate-90">
						<Image
							className="select-none pointer-events-none"
							src={Barcode}
							alt="!"
							width={140}
						/>
						<h4 className="whitespace-nowrap">03 765 960 001 763</h4>
					</div>
				</div>
			</div>
		</div>
	);
}
