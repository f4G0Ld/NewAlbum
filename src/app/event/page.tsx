import { Header } from "@/src/components/header";
import { Ticket } from "@/src/components/ticket";
import Image from "next/image";
import EventBackground from "../../public/EventBackground.svg";
import LiveNationLogo from "../../public/LiveNationLogo.svg";
import TicketMasterLogo from "../../public/TicketmasterLogo.svg";
import ConcertUALogo from "../../public/ConcertUALogo.svg";
import { Button } from "@/components/ui/button";

export default function Event() {
	return (
		<div>
			<Header />
			<div className="relative flex flex-col items-center justify-center max-w-480 mx-auto">
				<div className="absolute -z-10 min-h-120 inset-0 mx-12">
					<Image
						className="object-cover select-none hidden xl:flex"
						src={EventBackground}
						alt="!"
						fill={true}
					/>
				</div>
				<div className="h-full xl:flex items-center justify-center my-21 hidden">
					<Ticket />
				</div>
			</div>
			<div className="flex justify-center lg:hidden">
				<h1 className="text-[32px]">Click Below For More Info</h1>
			</div>
			<div className="my-6 space-y-6 max-w-480 mx-auto">
				<div className="font-[Anton] mx-2 md:mx-12">
					<div className="px-12 py-5 flex flex-col sm:flex-row gap-2 sm:justify-between items-center outline outline-[#161A1B] w-full">
						<Image src={LiveNationLogo} alt="Live-Nation-Logo" />
						<Button className="py-5 px-20 sm:px-15 rounded-none cursor-pointer">
							BUY
						</Button>
					</div>
				</div>
				<div className="font-[Anton] mx-2 md:mx-12">
					<div className="px-12 py-5 flex flex-col sm:flex-row gap-2 sm:justify-between items-center outline outline-[#161A1B] w-full">
						<Image src={TicketMasterLogo} alt="Live-Nation-Logo" />
						<Button className="py-5 px-20 sm:px-15 rounded-none cursor-pointer">
							BUY
						</Button>
					</div>
				</div>
				<div className="font-[Anton] mx-2 md:mx-12">
					<div className="px-12 py-5 flex flex-col sm:flex-row gap-2 sm:justify-between items-center outline outline-[#161A1B] w-full">
						<Image src={ConcertUALogo} alt="Live-Nation-Logo" />
						<Button className="py-5 px-20 sm:px-15 rounded-none cursor-pointer">
							BUY
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
